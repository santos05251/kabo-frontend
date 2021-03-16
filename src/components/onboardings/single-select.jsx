import React from "react";

const SingleSelect = ({ steps, value, setValue }) => (
  <div className="container">
    <div className="flex flex-wrap">
      {steps &&
        steps.map((item, idx) => (
          <input
            key={idx}
            type="button"
            value={item.label}
            onClick={() => setValue(item.value)}
            className={
              value === item.value
                ? "w-32 border cursor-pointer mr-3 mb-2 border-green bg-green-600 text-white font-medium focus:outline-none rounded-lg py-3"
                : "w-32 border cursor-pointer mr-3 mb-2 border-green bg-white text-green-600 focus:outline-none rounded-lg py-3"
            }
          />
        ))}
    </div>
  </div>
);

export default SingleSelect;
