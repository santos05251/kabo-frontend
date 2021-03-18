import React from "react";
import Button from "./button";

export const DashboardCard = ({ title, icon, text, buttonText, buttonAction, disabled = false, redirectLink }) => {
  return (
    <div className="rounded-lg shadow-md bg-white flex pt-8 pb-6 px-6 flex-col items-center">
      <div>
        {icon}
      </div>
      <h3 className={`text-xl messina font-bold my-4 ${disabled && 'text-gray-500'}`}>{title}</h3>
      <div>{text}</div>
      {buttonText && (
        redirectLink ?
          <a class="w-full" href={redirectLink}>
            <Button
              styles="w-full mt-8"
              text={buttonText}
              onClick={buttonAction}
              disabled={disabled}
            />
          </a>
          :
          <Button
            styles="w-full mt-8"
            text={buttonText}
            onClick={buttonAction}
            disabled={disabled}
          />
      )}
    </div>
  );
}
