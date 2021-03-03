import React, { useState } from "react";
import chevron from "../../assets/images/chevron.svg";
import Checkbox from "../global/Checkbox";

const DropDown = ({
  options,
  isCheckbox,
  helpText,
  label,
  value,
  setValue,
  unknown_breeds,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleIsChecked = () => {
    setIsChecked(!isChecked);
    setValue(unknown_breeds[0]);
  };

  return (
    <div className="flex flex-col xs:pb-3 md:pb-6">
      <label className="font-semibold pb-3">{label}</label>
      <div className="drop-down mb-3 bg-transparent cursor-pointer outline-none text-gray-400 text-sm mt-2 mb-2.5 w-full h-full">
        <div
          className="selected flex justify-between border py-2 border-gray-400 rounded-lg px-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value && value.label}</span>

          <img src={chevron} className="select-chevron w-3" />
        </div>
        <div className={`options ${isOpen ? "block" : "hidden"}`}>
          <ul className="border border-gray-400 rounded-md mt-2">
            {options &&
              options.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setValue(item);
                    setIsOpen(!isOpen);
                  }}
                  className="border-b  border-gray-400 py-3 pl-2"
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

export default DropDown;
