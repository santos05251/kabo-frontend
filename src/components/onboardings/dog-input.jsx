import React from "react";

const DogInput = ({ label, value, setValue, ...rest }) => {
  return (
    <React.Fragment>
      <label className="font-semibold pb-2">{label}</label>
      <input
        {...rest}
        defaultValue={value}
        onChange={(e) => setValue(e.target.value)}
        className=" input border border-gray-400 rounded-lg py-3"
      />
    </React.Fragment>
  );
};

export default DogInput;
