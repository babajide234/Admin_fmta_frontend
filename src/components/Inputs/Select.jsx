// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { CaretDown, Plus } from "phosphor-react";
import LoadingSpinnerComponent from "react-spinners-components";
import { useField } from "formik";
import PropTypes from 'prop-types'

const SelectItem = ({ label, value = '', name, handleOptionClick }) => {
  const id = `radio-${name}-${value}`;

  const handleClick = (e) => {
    handleOptionClick(name, value);
    e.preventDefault()
  };

  return (
    <div className="px-4 py-2 cursor-pointer " onClick={e => handleClick(e)}>
      <input
        id={id}
        type="radio"
        name={name}
        className="hidden"
        value={value}
      />
      <label
        htmlFor={id}
        className="py-2 flex items-center cursor-pointer group-hover:text-primary hover:bg-custom-blue rounded-lg">
        <span className="w-4 h-4 inline-block rounded-full border border-gray-500 mr-5 group-hover:border-primary"></span>
        {label}
      </label>
    </div>
  );
};

export const CustomSelect = ({
  options = [],
  onChange,
  onSelect,
  selectName,
  iconLeft,
  filterKey,
  label,
  loading,
  valueKey
}) => {
  const [meta] = useField(selectName);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [search, setSearch] = useState("");
  const [searchBool, setSearchBool] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (name, value) => {

    console.log('handleOptionClick', name)
    setSelectedOption(name);
    onSelect ? onSelect(name, value) : null;
    setIsOpen(false);
    // helpers.setValue(value, false)
  };

  const filteredOptions = options
    ? options.filter((option) =>
      option[filterKey].toLowerCase().includes(search.toLowerCase())
    )
    : [];

  const handleManualAdd = () => {
    setSearchBool(prev => !prev)
  }

  return (
    <div className="relative">
      <div
        className={`inputIcon cursor-pointer flex items-center ${meta.error ? "inputIcon__error" : "inputIcon__default"
          } `}
        onClick={toggleDropdown}>
        {iconLeft && (
          <span
            className={`inputIcon__span-left ${meta.error ? "inputIcon__svg-error" : " "
              }`}>
            {iconLeft}
          </span>
        )}
        <input
          className={` px-3 p4 basis-full ${selectedOption
            ? "text-gray-900 font-medium leading-5"
            : "text-gray-400"
            }`}
          value={selectedOption}
          type="text"
          name={selectName}
          placeholder={label}
          onChange={onChange}


        // onBlur={() => setIsOpen(!isOpen)}
        />

        {label && (
          <label className="inputIcon__label basis-full p-500 secondary-disabled">
            {label}
          </label>
        )}
        {loading ? (
          <div className="inputIcon__span-right">
            <LoadingSpinnerComponent
              type={"DualBall"}
              colors={["#001973", "#122122", "#19b8ed"]}
              size={"100px"}
            />
          </div>
        ) : (
          <div
            className={`inputIcon__span-right inset-y-0 
            right-0 flex items-center px-2 pointer-events-none
             ${meta.error ? "inputIcon__svg-error" : " "
              }`}>
            <label htmlFor={name} className={`caret ${isOpen ? "caretUp" : ""}`}>
              <CaretDown size={20} color="#001973" />
            </label>
          </div>
        )}
      </div>
      {
        isOpen && (
          <div className=" w-full px-3 py-5 bg-white absolute top-18 z-[9000] right-0 border border-solid border-gray-200 rounded-xl">

            <div className="grid grid-cols-5 gap-4">
              <input
                type="text"
                className={`px-2 py-2 border border-gray-200 rounded-lg outline-none w-full mb-2 ${filteredOptions.length > 0 ? 'col-span-5' : 'col-span-4'}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
              <div className={`${filteredOptions.length <= 0 ? 'col-span-1' : 'hidden'}`}>
                <div className="w-full h-[36px] rounded-lg flex justify-center items-center bg-secondary"
                  onClick={handleManualAdd} >
                  <Plus size={18} color="#ffffff" />
                </div>
              </div>
            </div>
            <div className=" max-h-[10rem] overflow-y-auto">
              {filteredOptions.map((option, index) => (
                <SelectItem
                  key={index}
                  label={option.name}
                  value={option[valueKey]}
                  name={option.name}
                  handleOptionClick={handleOptionClick}
                />
              ))}
              {
                searchBool && <SelectItem
                  label={search}
                  value={null}
                  name={search}
                  handleOptionClick={handleOptionClick}
                />
              }
            </div>
          </div>
        )

      }
    </div>
  );
};

SelectItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  name: PropTypes.string,
  handleOptionClick: PropTypes.func,
}

CustomSelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  err: PropTypes.bool,
  selectName: PropTypes.string,
  id: PropTypes.string,
  iconLeft: PropTypes.any,
  filterKey: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.any,
  loading: PropTypes.any,
  valueKey: PropTypes.string
}

