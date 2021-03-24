import React from "react";

const RadioMessage = ({ title, text, buttonTitle }) => {
  return (
    <div className="bg-promptYellow p-6 rounded-md mb-3">
      <p className="text-xl text-black font-bold mb-2 font-cooper">{title}</p>
      <p className="font-xs text-black font-messina">{text}</p>
      <button className="bg-primary py-3 px-8 rounded-xl text-white text-base font-medium mt-2 font-messina">
        {buttonTitle}
      </button>
    </div>
  );
};

export default RadioMessage;
