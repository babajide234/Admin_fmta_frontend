// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import DashHeader from "./DashHeader";
import Actions from "../common/Actions";
import { DropdownMenuItem } from "../../ui/dropdown-menu";
import PropTypes from "prop-types";
import LoadingSpinnerComponent from "react-spinners-components";
import { Buttons } from "../buttons/Buttons";
import { Formik } from "formik";
import InputIcons from "../common/InputIcons";
import { DialogFooter } from "../../ui/dialog";
import { ReactComponent as Edit } from "../../assets/main/icon/edit-2.svg";
import DialogContainer from "../Modal/Dialog";
import productSlice from "../../store/productStore";
import { useMutation, useQuery } from "react-query";
import { CustomSelect } from "../Inputs/Select";
import { Text } from "lucide-react";
import * as Yup from 'yup'
import FailedModal from "../Modal/FailedModal";
import userSlice from "../../store/userStore";
import { adminRoles } from "../../util/util";


const DashSubCat = ({
  variant = "outline",
  subCategoryData,
  subCatLoading,
  catId
}) => {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rowData, setRowData] = useState({});
  const getCategoryName = productSlice(state => state.getCategoryName)
  const addSubCat = productSlice(state => state.adminAddSubCategory)
  const editSubCat = productSlice(state => state.adminEditSubCategory)
  const role = userSlice.getState().role
  //get req
  const { data: catData, isLoading } = useQuery('get categories', () => getCategoryName())

  //formik initial values
  const initialValues = {
    name: rowData ? rowData.name : "",
    categoryId: (rowData && !!catId) ? catId : "",
    description: ''
  };

  //validation schema
  const SubCatSchema = Yup.object().shape({
    name: Yup.string().required(),
    categoryId: Yup.string().required(),
    description: Yup.string().required()
  })
  //handle add post req
  const addSubMutation = useMutation(formData => addSubCat(formData), {
    onSuccess: (data) => {
      if (data.status) {
        setOpen(prev => !prev)
      } else {
        setFailed(prev => !prev)
      }
    },
    onError: (error) => {
      console.log(error);
    },
  })

  //handle edit post req
  const editSubMutation = useMutation(formData => editSubCat(rowData.id, formData), {
    onSuccess: (data) => {
      if (data.status) {
        setOpen(prev => !prev)
      } else {
        setFailed(prev => !prev)
      }
    },
    onError: (error) => {
      console.log(error);
    },
  })
  //formik on submit func
  const onSubmit = (values, { setSubmitting }) => {
    const newVal = {
      name: values.name,
      category_id: values.categoryId,
      description: values.description
    }
    if (edit) {
      editSubMutation.mutate(newVal)
    } else {
      addSubMutation.mutate(newVal)
    }
    setSubmitting(false);
  };

  return (
    <div className="dashSubCat">
      <div className="flex justify-between items-center gap-4">
        <DashHeader small={true} text={"Sub-Categories"} variant={variant} />
        {adminRoles.includes(role) && <DialogContainer
          trigger={
            <div className="btn-container w-full">
              <Buttons color={"primary"} type={"btn"} onClick={() => setEdit(false)}>
                Add
              </Buttons>
            </div>
          }
          title={`${edit ? 'Edit' : 'Add'} sub-category`}
          open={open}
          onOpenChange={setOpen}
        >
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={SubCatSchema} enableReinitialize={true}>
            {({ values, errors, touched, handleChange, submitForm }) => (
              <form>
                <div className="input-container">
                  <InputIcons
                    type={"text"}
                    inputName="name"
                    placeholder={"Sub-Category Name"}
                    onChange={handleChange}
                    value={values.name}
                    err={errors.name && touched.name}
                    iconLeft={<Text />}
                    iconRight={<Edit />}
                  />
                </div>
                {!edit && <div className="input-container">
                  <CustomSelect
                    options={catData}
                    onChange={handleChange}
                    onSelect={(_, value) => {
                      handleChange({
                        target: {
                          name: 'categoryId',
                          value: value
                        }
                      })
                    }}
                    filterKey={'name'}
                    selectName={'categoryId'}
                    label={'Choose category'}
                    loading={isLoading}
                    iconLeft={<Text />}
                    valueKey={'id'}
                  />
                </div>}

                <div className="input-container">
                  <InputIcons
                    type={"text"}
                    inputName="description"
                    placeholder={"Sub-Category description"}
                    onChange={handleChange}
                    value={values.description}
                    err={errors.description && touched.description}
                    iconLeft={<Text />}
                    iconRight={<Edit />}
                  />
                </div>
                <DialogFooter>
                  <Buttons color={"primary"} type={"btn"} onClick={(e) => {
                    e.preventDefault();
                    submitForm()
                  }}>
                    {edit ? 'Edit' : 'Add'}
                  </Buttons>
                </DialogFooter>
              </form>
            )}
          </Formik>
        </DialogContainer>}
      </div>
      <div className="dashSubCat__div-body">
        <header className="dashSubCat__div-header grid grid-cols-7 py-2">
          <div className="p4 col-span-1 text-left">No.</div>
          <div className="p4 col-span-5 text-left">Name</div>
          <div className="p4 col-span-1"></div>
        </header>
        {subCategoryData === null || subCatLoading ? (
          <LoadingSpinnerComponent
            type={"DualBall"}
            colors={["#001973", "#122122", "#19b8ed"]}
            size={"100px"}
          />
        ) : (
          <div className="dashSubCat__div-table">
            {subCategoryData?.length === 0 ? (
              <p className="p3 secondary text-center mt-6">No subcategory</p>
            ) : (
              subCategoryData?.map((row, index) => (
                <div
                  className="dashSubCat__div-table-item grid grid-cols-7 py-2"
                  key={row.id}
                >
                  <div className="p4 col-span-1 text-left">{index + 1}</div>
                  <div className="p4 col-span-5 text-left">{row.name}</div>
                  {adminRoles.includes(role) &&
                    <div className="p4 col-span-1">
                      <Actions>

                        <DropdownMenuItem className="dropdown-options p4 secondary" onClick={() => {
                          setEdit(true)
                          setOpen(prev => !prev)
                          setRowData(row)
                        }}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="dropdown-options p4 secondary ">
                          Delete
                        </DropdownMenuItem>
                      </Actions>
                    </div>
                  }
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {
        failed && <FailedModal
          icon={true}
          open={failed}
          close={() => setFailed(prev => !prev)}
          text={`${edit ? 'Edit' : 'Add'} subcategory failed`}
          header={true}
          loading={true}
        />
      }
    </div>
  );
};
DashSubCat.propTypes = {
  variant: PropTypes.oneOf(["outline", "fill", "empty"]),
  subCategoryData: PropTypes.any,
  subCatLoading: PropTypes.any,
  catId: PropTypes.any
};
export default DashSubCat;
