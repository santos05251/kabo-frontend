import React, { useEffect, useRef, useState } from "react";

const EditableDropdown = ({
  options,
  value,
  setValue,
  placeholder,
  ...rest
}) => {
  const node = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState(value ? value: '');

  const handleInputValue = (inputValue) => {
    setInputVal(inputValue);
    setValue(inputValue);
  };
  
  const handleClickOutside = (e) => {
    if (node && node.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClickOutside);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col relative">
      <div ref={node} className="drop-down bg-transparent cursor-pointer outline-none w-full h-full">
        <div
          className="selected flex justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            { ...rest }
            type="text"
            value={inputVal}
            placeholder={placeholder}
            onChange={(e) => handleInputValue(e.target.value)}
          />
        </div>
        <div className={`options ${isOpen ? "block" : "hidden"} absolute border border-gray-200 text-gray-400 top-15 inset-x-0 z-10 bg-gray-50`}>
          <ul className="max-h-64	overflow-auto	border border-gray-50 mt-2">
            {options &&
              options.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    handleInputValue(item);
                    setIsOpen(!isOpen);
                  }}
                  className={`border-b border-gray-150 py-3 pl-2 ${inputVal == '' || item.toLowerCase().includes(inputVal.toString().toLowerCase()) ? "block" : "hidden"}`}
                >
                  <a className="rounded-lg text-dark">
                    { item }
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditableDropdown;
