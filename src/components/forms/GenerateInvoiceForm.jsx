// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import InputIcons from '../common/InputIcons'
import { ReactComponent as Edit } from '../../assets/main/icon/edit-2.svg'
import { Formik } from 'formik'
import { CustomSelect } from '../Inputs/Select'
import productSlice from '../../store/productStore'
import { useQuery } from 'react-query'
import { Buttons } from '../buttons/Buttons'
import { ArrowsHorizontal, CurrencyNgn, Textbox } from 'phosphor-react'
import { generateRandomId } from '../../util/util'
import Orderlist from '../Order/Orderlist'
import CreateOrderStep from '../Order/CreateOrderStep'
import PropTypes from 'prop-types'
import GoBack from '../GoBack'
import * as Yup from 'yup'

const GenerateInvoiceForm = () => {
    const [searchPrice, setSearchPrice] = useState()
    const [invoiceArray, setInvoiceArray] = useState([])
    const [step, setStep] = useState(1)
    const getAllProducts = productSlice.getState().getProducts
    const initialValues = {
        name: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        productPrice: searchPrice ?? '',
        list: [],

    }
    const InvoiceSchema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        phone: Yup.string().required(),
        country: Yup.string().required(),
        state: Yup.string().required(),
        city: Yup.string().required(),
        productPrice: Yup.string().required(),
        list: Yup.array()
    })

    const handleFilter = (value) => {
        const productData = allProducts?.filter(product => product.id === value)[0]
        if (productData.currency === 'USD') {
            setSearchPrice(productData.price.converted_price)
        } else {
            setSearchPrice(productData.price.original_price)
        }
    }
    const handleArrayOne = (values, setFieldValue) => {
        const list = {
            productName: values.productName,
            productPrice: values.productPrice,
            productQuantity: values.productQuantity,
            id: generateRandomId()
        }
        setFieldValue('list', [...values.list, list], false);
    }
    const handleStep = (step) => {
        if (step === 'forward') {
            setStep(2)
        } else if (step === 'back') {
            setStep(1)
        }
    }
    const onSubmit = async (values) => {
        console.log('submitForm was clicked another')
        console.log(values)
    }

    const { data: allProducts, isLoading } = useQuery('getAllProducts', () => getAllProducts());

    const renderStep = (values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        invoiceArray,
        setInvoiceArray,
        submitForm,
        handleFilter,
        handleArrayOne,
        allProducts,
        isLoading, handleStep) => {
        switch (step) {
            case 1:
                return <CreateOrderStep
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleStep={handleStep}

                />;
            case 2:
                return <CreateOrderList
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    invoiceArray={invoiceArray}
                    setInvoiceArray={setInvoiceArray}
                    submitForm={submitForm}
                    handleFilter={handleFilter}
                    handleArrayOne={handleArrayOne}
                    allProducts={allProducts}
                    isLoading={isLoading}
                    handleStep={handleStep} />;
            default:
                null
        }
    }
    return (
        <section className='w-full h-full'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={InvoiceSchema}>
                {({ values, touched, errors, handleChange, setFieldValue, submitForm }) => (
                    <form>
                        {
                            renderStep(values, errors, touched, handleChange, setFieldValue, invoiceArray, setInvoiceArray, submitForm, handleFilter, handleArrayOne, allProducts, isLoading, handleStep)
                        }
                    </form>
                )}
            </Formik>
        </section>
    )
}

export default GenerateInvoiceForm


export const CreateOrderList = ({
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    invoiceArray,
    setInvoiceArray,
    submitForm,
    handleFilter,
    handleArrayOne,
    allProducts,
    isLoading,
    handleStep
}) => {
    return (
        <>
            <GoBack onClick={() => handleStep('back')}>Go back</GoBack>
            {values.list.length > 0 &&
                <>
                    <Orderlist
                        setFieldValue={setFieldValue}
                        list={values.list}
                        invoiceArray={invoiceArray}
                        setInvoiceArray={setInvoiceArray}
                    />
                    <div className="my-8 grid grid-cols-3 gap-4 ">
                        <div className="col-span-1">
                            <Buttons
                                color={'primary'}
                                type={'btn'}
                                onClick={(e) => {
                                    console.log('submitForm was clicked')
                                    submitForm();
                                    e.preventDefault();
                                }}>
                                Generate Invoice
                            </Buttons>
                        </div>
                    </div>
                </>
            }
            <div className="my-8">
                <div className='grid grid-cols-7 gap-4 items-center '>
                    <div className="col-span-3 input-container">
                        <CustomSelect
                            options={allProducts}
                            onChange={handleChange}
                            onSelect={(name, value) => {
                                handleChange({
                                    target: {
                                        name: 'productName',
                                        value: name,
                                    },
                                });
                                value && handleFilter(value)

                            }}
                            filterKey="name"
                            selectName={'productName'}
                            label='Choose a product'
                            iconLeft={<Textbox />}
                            loading={isLoading}
                            valueKey={'id'}
                        />
                    </div>
                    <div className="col-span-2 input-container">
                        <InputIcons
                            inputName={'productQuantity'}
                            type={'number'}
                            placeholder={'Quantity'}
                            iconLeft={<ArrowsHorizontal />}
                            iconRight={<Edit />}
                            value={values.productQuantity}
                            onChange={handleChange}
                            err={errors.productQuantity && touched.productQuantity}
                        />
                    </div>
                    <div className="col-span-2 input-container">
                        <InputIcons
                            inputName={'productPrice'}
                            type={'text'}
                            placeholder={'Price'}
                            iconLeft={<CurrencyNgn />}
                            iconRight={<Edit />}
                            value={values.productPrice}
                            onChange={handleChange}
                            err={errors.productPrice && touched.productPrice}

                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 ">
                    <div className="col-span-1 input-container">
                        <Buttons
                            color={'primary'}
                            type={'btn'}
                            onClick={(e) => {
                                handleArrayOne(values, setFieldValue);
                                e.preventDefault();
                            }}>Add to list</Buttons >
                    </div>
                </div>
            </div>
        </>
    )
}
CreateOrderList.propTypes = {
    values: PropTypes.any,
    errors: PropTypes.any,
    touched: PropTypes.any,
    handleChange: PropTypes.any,
    setFieldValue: PropTypes.any,
    invoiceArray: PropTypes.any,
    setInvoiceArray: PropTypes.any,
    submitForm: PropTypes.any,
    handleFilter: PropTypes.any,
    handleArrayOne: PropTypes.any,
    allProducts: PropTypes.any,
    isLoading: PropTypes.any,
    handleStep: PropTypes.func
}