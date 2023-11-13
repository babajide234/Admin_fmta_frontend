// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import DashHeader from "./DashHeader";
import PropTypes from "prop-types";
import Actions from "../common/Actions";
import { DropdownMenuItem } from "../../ui/dropdown-menu";
import LoadingSpinnerComponent from "react-spinners-components";
import { Buttons } from "../buttons/Buttons";
import DialogContainer from "../Modal/Dialog";
import { Form, Formik } from "formik";
import InputIcons from "../common/InputIcons";
import { ReactComponent as Edit } from "../../assets/main/icon/edit-2.svg";
import { DialogFooter } from "../../ui/dialog";
import * as Yup from 'yup'
import { useMutation } from "react-query";
import productSlice from "../../store/productStore";
import { Text } from "lucide-react";
import FailedModal from "../Modal/FailedModal";

const DashCat = ({
  variant = "outline",
  catLoading,
  catData,
  handleCategoryChange,
}) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rowData, setRowData] = useState({})
  const [failed, setFailed] = useState(false)
  const addCat = productSlice(state => state.adminAddCategory)
  const editCat = productSlice(state => state.adminEditCategory)
  const deleteCat = productSlice(state => state.adminDeleteCategory)


  const initialValues = {
    name: rowData ? rowData.name : "",
    description: rowData ? rowData.description : '',
  };
  //handle post request
  const AddCatSchema = Yup.object().shape({

    name: Yup.string().required(),
    description: Yup.string().required(),

  })

  // handle add request to category
  const catMutation = useMutation((formData) => addCat(formData), {
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

  // handle category edit
  const editCatMutation = useMutation((formData) => editCat(rowData.id, formData), {
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

  //handle form submit
  const onSubmit = (values, { setSubmitting }) => {
    // console.log(values);
    if (edit) {
      editCatMutation.mutate(values)
      setEdit(prev => !prev)
    } else {
      catMutation.mutate(values)
    }
    setSubmitting(false);
  };
  return (
    <div className="dashCat">
      <div className="flex justify-between items-center gap-4">
        <DashHeader text={"Categories"} small={true} variant={variant} />
        <DialogContainer
          trigger={
            <div className="btn-container w-full">
              <Buttons color={"primary"} type={"btn"} onClick={() => setEdit(false)}>
                Add
              </Buttons>
            </div>
          }
          title={`${edit ? 'Edit' : 'Add'} category`}
          open={open}
          onOpenChange={setOpen}
        >
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={AddCatSchema} enableReinitialize={true}>
            {({ values, errors, touched, handleChange, submitForm }) => (
              <Form>
                <div className="input-container">
                  <InputIcons
                    type={"text"}
                    inputName="name"
                    placeholder={"Category Name"}
                    onChange={handleChange}
                    value={values.name}
                    err={errors.name && touched.name}
                    iconRight={<Edit />}
                    iconLeft={<Text />}
                  />
                </div>
                <div className="input-container">
                  <InputIcons
                    type={"text"}
                    inputName="description"
                    placeholder={"Category description"}
                    onChange={handleChange}
                    value={values.description}
                    err={errors.description && touched.description}
                    iconRight={<Edit />}
                    iconLeft={<Text />}
                  />
                </div>
                <DialogFooter>
                  <Buttons color={"primary"} type={"btn"} onClick={(e) => {
                    e.preventDefault();
                    submitForm()
                  }}>
                    {`${edit ? 'Edit' : 'Add'}`}
                  </Buttons>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContainer>
      </div>
      <div className="dashCat__div-body">
        <header className="dashCat__div-header grid grid-cols-7 py-2">
          <div className="p4 col-span-1 text-left pl-1">No.</div>
          <div className="p4 col-span-5 text-left">Name</div>
          <div className="p4 col-span-1"></div>
        </header>
        {catLoading ? (
          <LoadingSpinnerComponent
            type={"DualBall"}
            colors={["#001973", "#122122", "#19b8ed"]}
            size={"100px"}
          />
        ) : (
          <div className="dashCat__div-table">
            {catData?.map((row, index) => (
              <div
                className="dashCat__div-table-item grid grid-cols-7 py-2"
                key={index}
              >
                <div className="p4 col-span-1 text-left pl-1">{index + 1}</div>
                <div className="p4 col-span-5 text-left">{row.name}</div>
                <div className="p4 col-span-1">
                  <Actions>
                    <DropdownMenuItem className="dropdown-options p4 secondary " onClick={() => {
                      setEdit(true);
                      setOpen(prev => !prev);
                      setRowData(row)
                    }}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dropdown-options p4 secondary " onClick={() => {
                      setDeleteOpen(true)
                      setRowData(row)
                    }}>
                      Delete
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="dropdown-options p4 secondary"
                      id={row.id}
                      onClick={() => {
                        handleCategoryChange(row.id);
                      }}
                    >
                      SubCategory
                    </DropdownMenuItem>
                  </Actions>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {
        failed && <FailedModal
          icon={true}
          open={failed}
          close={() => setFailed(prev => !prev)}
          text={`${edit ? 'Edit' : 'Add'} category failed`}
          header={true}
          loading={true}
        />
      }
      {
        deleteOpen && <DialogContainer
          open={deleteOpen}
          onOpenChange={setDeleteOpen}

        >
          <div>
            <div className="flex justify-center items-center">
              <span className="header__3 error">Delete Category</span>
            </div>
            <div className="mt-12 flex items-center gap-4 w-full">
              <div className="w-full">
                <Buttons color={'secondary'} type={'btn'} onClick={() => setDeleteOpen(false)}>
                  Cancel
                </Buttons>
              </div>
              <div className="w-full">
                <Buttons color={'danger'} type={'btn'} onClick={() => {
                  deleteCat(rowData.id)
                  setDeleteOpen(false)
                }}>
                  Delete
                </Buttons>
              </div>
            </div>
          </div>
        </DialogContainer>
      }
    </div>
  );
};

export default DashCat;

DashCat.propTypes = {
  variant: PropTypes.oneOf(["outline", "fill", "empty"]),
  catData: PropTypes.any,
  catLoading: PropTypes.bool,
  handleCategoryChange: PropTypes.any,
};