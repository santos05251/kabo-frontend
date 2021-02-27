import React from "react";

const FormWrapper = ({ children, increaseSmallPadding }) => {
  return (
    <div
      className={`xs:pt-5 ${
        increaseSmallPadding && "xs:pb-5"
      } md:pt-10 xs:mt-2 md:mt-8 xs:px-4 md:px-9 bg-white rounded-lg`}
    >
      {children}
    </div>
  );
};

export default FormWrapper;
