import React, { useState } from "react";
import chevron from "../../assets/images/chevron.svg";
import Checkbox from "../global/Checkbox";

const EditableDropdown = ({
  options,
  isCheckbox,
  helpText,
  label,
  value,
  setValue,
  unknown_breeds,
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const handleIsChecked = () => {
    setIsChecked(!isChecked);
    setValue(unknown_breeds && unknown_breeds.length > 0 ? unknown_breeds[0]: {value: -1, label: ''});
  };

  const handleInputValue = (inputV) => {
    setInputVal(inputV);
    setValue({value: inputV === '' ? -1 : 10000, label: inputV});
  };

  return (
    <div className="flex flex-col pb-3 md:pb-6">
      <label className="font-semibold pb-2">{label}</label>
      <div className="drop-down mb-3 bg-transparent cursor-pointer outline-none text-gray-400 w-full h-full">
        <div
          className="selected flex justify-between border py-3 border-gray-400 rounded-lg px-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            type="text"
            className="placeholder-gray text-black w-full h-full px-2"
            value={inputVal}
            placeholder={placeholder}
            onChange={(e) => handleInputValue(e.target.value)}
          />

          <img src={chevron} className="select-chevron w-3" />
        </div>
        <div className={`options ${isOpen ? "block" : "hidden"}`}>
          <ul className="max-h-64	overflow-auto	border border-gray-400 rounded-md mt-2">
            {options &&
              options.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setInputVal(item.label);
                    setValue(item);
                    setIsOpen(!isOpen);
                  }}
                  className={`border-b  border-gray-400 py-3 pl-2 ${inputVal == '' || item.label.toLowerCase().includes(inputVal.toLowerCase()) ? "block" : "hidden"}`}
                >
                  <a className="rounded-lg text-dark">{item.label}</a>
                </li>
              ))}
          </ul>
        </div>
        {isCheckbox && helpText ? (
          <div className="mt-2">
            <Checkbox
              type="checkbox"
              className="h-4 w-4 mr-3"
              checked={isChecked}
              onChange={handleIsChecked}
              label={helpText}
            />
          </div>
        ) : (
            <div className="flex items-center mt-2">
              <p className="text-labelGray font-medium text-xs">{helpText}</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default EditableDropdown;
