// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import InputIcons from '../common/InputIcons'
import { ReactComponent as User } from '../../assets/main/icon/user.svg'
import { ReactComponent as Edit } from '../../assets/main/icon/edit-2.svg'
import { LocateFixed } from 'lucide-react'
import { Formik } from 'formik'
import { CustomSelect } from '../Inputs/Select'
import productSlice from '../../store/productStore'
import { useQuery } from 'react-query'
import { Buttons } from '../buttons/Buttons'
import { ArrowsHorizontal, CurrencyNgn, Phone, Textbox } from 'phosphor-react'
import Invoicelist from '../common/Invoicelist'


const GenerateInvoiceForm = () => {
    const [searchPrice, setSearchPrice] = useState()
    const [invoiceArray, setInvoiceArray] = useState([])

    const getAllProducts = productSlice.getState().getProducts
    const initialValues = {
        invoiceeName: '',
        invoiceeAddress: '',
        invoiceePhone: '',
        productPrice: searchPrice ?? '',
        productName: '',
        list: [],

    }
    const onSubmit = (values) => {
        console.log(values)
    }
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
        }
        setFieldValue('list', [...values.list, list], false);


        // setFieldValue('productName', "");
        // setFieldValue('productQuantity', "");
        // setFieldValue('productPrice', "");
        // setSearchPrice('')

    }

    const { data: allProducts, isLoading } = useQuery('getAllProducts', () => getAllProducts());

    return (
        <section className='w-full h-full'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} >
                {({ values, touched, errors, handleChange, setFieldValue, submitForm }) => (
                    <form>
                        <div className="input-container">
                            <InputIcons
                                inputName={'invoiceeName'}
                                type={'text'}
                                placeholder={'Enter full name'}
                                iconLeft={<User />}
                                iconRight={<Edit />}
                                value={values.invoiceeName}
                                onChange={handleChange}
                                err={errors.invoiceeName && touched.invoiceeName} />
                        </div>
                        <div className="input-container">
                            <InputIcons
                                inputName={'invoiceeAddress'}
                                type={'text'}
                                placeholder={'Enter address'}
                                iconLeft={<LocateFixed />}
                                iconRight={<Edit />}
                                value={values.invoiceeAddress}
                                onChange={handleChange}
                                err={errors.invoiceeAddress && touched.invoiceeAddress} />
                        </div>
                        <div className="input-container">
                            <InputIcons
                                inputName={'invoiceePhone'}
                                type={'text'}
                                placeholder={'Enter phone number'}
                                iconLeft={<Phone />}
                                iconRight={<Edit />}
                                value={values.invoiceePhone}
                                onChange={handleChange}
                                err={errors.invoiceePhone && touched.invoiceePhone} />
                        </div>

                        {values.list.length > 0 &&
                            <Invoicelist
                                setFieldValue={setFieldValue}
                                submitForm={submitForm}
                                list={values.list}
                                invoiceArray={invoiceArray}
                                setInvoiceArray={setInvoiceArray}
                            />
                        }
                        <div className="my-8">
                            <div className='grid grid-cols-7 gap-4 items-center '>
                                <div className="col-span-3 input-container">
                                    <CustomSelect
                                        options={allProducts}
                                        onChange={handleChange}
                                        onSelect={(name, value) => {
                                            console.log('before handle change', name)
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
                                        expect={'id'}
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
                                            console.log("handleArrayOne", values.list);
                                            e.preventDefault();
                                        }}>Add to list</Buttons >
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </section>
    )
}

export default GenerateInvoiceForm