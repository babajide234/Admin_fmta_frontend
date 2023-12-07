// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { ReactComponent as Edit } from "../../assets/main/icon/edit-2.svg";
import { useQuery } from "react-query";
import miscSlice from "../../store/miscSlice";
import { At, Globe, User } from "phosphor-react";
import { LocateIcon, Map, PhoneIcon } from "lucide-react";
import { CustomSelect } from "../Inputs/Select";
import InputIcons from "../common/InputIcons";
import PropTypes from 'prop-types'
import { Buttons } from "../buttons/Buttons";

const CreateOrderStep = ({ values, errors, touched, handleChange, handleStep }) => {
  const [stateCode, setStateCode] = useState("");
  const [cityCode, setCityCode] = useState("");
  const getCountry = miscSlice((state) => state.getCountry);
  const getState = miscSlice((state) => state.getState);



  const { data: countries, isLoading: countriesLoading } = useQuery(
    "getCountries",
    () => getCountry()
  );

  const { data: states, isLoading: statesLoading } = useQuery(
    ["getStates", stateCode],
    () => getState(stateCode),
    {
      enabled: stateCode !== "",
    }
  );



  return (
    <>

      <div className="input-container">
        <InputIcons
          inputName={"name"}
          placeholder={"Customer Name"}
          value={values.name}
          onChange={handleChange}
          type={"text"}
          err={errors.name && touched.name}
          iconLeft={<User />}
          iconRight={<Edit />}
        />
      </div>
      <div className="input-container">
        <InputIcons
          inputName={"email"}
          type={"email"}
          placeholder={"Customer Email"}
          value={values.email}
          onChange={handleChange}
          err={errors.email && touched.email}
          iconLeft={<At />}
          iconRight={<Edit />}
        />
      </div>
      <div className="input-container">
        <InputIcons
          inputName={"phone"}
          placeholder={"Customer Phone number"}
          value={values.phone}
          onChange={handleChange}
          type={"number"}
          err={errors.phone && touched.phone}
          iconLeft={<PhoneIcon />}
          iconRight={<Edit />}
        />
      </div>
      <div className="input-container">
       
        <CustomSelect
          options={countries}
          onChange={handleChange}
          onSelect={(name, value) => {
            handleChange({
              target: {
                name: 'country',
                value: value
              }
            })
            setStateCode(value);
          }}
          filterKey={"name"}
          selectName={'country'}
          label={'Choose your country'}
          iconLeft={<Globe />}
          loading={countriesLoading}
          valueKey={'isoCode'}
        />
      </div>
      <div className="input-container">
        {/* <CustomSelectButton
                name={"state"}
                label={"States"}
                value={values.state}
                onChange={(e) => {
                  setCityCode(e.target.value);
                  handleChange(e);
                }}
                err={errors.state && touched.state}
                isLoading={statesLoading}
              >
                <option value="" disabled>
                  Select user state
                </option>
                {states &&
                  states?.map((option, index) => (
                    <option
                      key={index}
                      value={option.isoCode}
                      className="py-4 text-md hover:bg-lightPrimary"
                    >
                      {option.name}
                    </option>
                  ))}
              </CustomSelectButton> */}

        <CustomSelect
          options={states}
          onChange={handleChange}
          onSelect={(name, value) => {
            handleChange({
              target: {
                name: 'state',
                value: value
              }
            })
            setCityCode(value);
          }}
          filterKey={"name"}
          selectName={'state'}
          label={'Choose your state'}
          iconLeft={<Map />}
          loading={statesLoading}
          valueKey={'isoCode'}
        />
      </div>
      <div className="input-container">
        <InputIcons
          inputName={"address"}
          placeholder={"Customer address"}
          value={values.address}
          onChange={handleChange}
          type={"text"}
          err={errors.address && touched.address}
          iconLeft={<User />}
          iconRight={<Edit />}
        />
      </div>
      <div className="input-container">
        <InputIcons
          inputName={"address"}
          placeholder={"Enter your Address"}
          value={values.address}
          onChange={handleChange}
          type={"text"}
          err={errors.address && touched.address}
          iconLeft={<LocateIcon />}
          iconRight={<Edit />}
        />

      </div>

      <div className="my-4 grid grid-cols-3 gap-4 ">
        <div className="col-span-1 input-container">
          <Buttons
            color={'primary'}
            type={'btn'}
            disable={(!values.name &&
              !values.email &&
              !values.phone &&
              !values.country &&
              !values.state &&
              !values.city)}
            onClick={(e) => {
              (!values.name &&
                !values.email ||
                !values.phone ||
                !values.country ||
                !values.state ||
                !values.city && handleStep('forward'))
              e.preventDefault();
            }}>Add products</Buttons >
        </div>
      </div>

    </>
  );
};

export default CreateOrderStep;

CreateOrderStep.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.any,
  touched: PropTypes.any,
  handleChange: PropTypes.any,
  handleStep: PropTypes.func
}
