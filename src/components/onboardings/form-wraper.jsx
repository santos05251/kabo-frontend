import React from "react";

const FormWrapper = ({ children, increaseSmallPadding }) => {
  return (
    <div
      className={`${
        increaseSmallPadding && "xs:pb-5"
      } mt-2 md:mt-5 px-4 md:px-9 py-2 md:py-6 bg-white rounded-lg`}
    >
      {children}
    </div>
  );
};

export default FormWrapper;
