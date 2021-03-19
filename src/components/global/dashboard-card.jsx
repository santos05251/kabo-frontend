import React from "react";
import Button from "./button";

export const DashboardCard = ({ title, icon, text, buttonText, buttonAction, disabled = false, redirectLink, paused, cancelled }) => {
  return (
    <div className="rounded-lg shadow-md bg-white flex pt-8 pb-6 px-6 flex-col items-center">
      <div>
        {icon}
      </div>
      <h3 className={`text-xl messina font-bold my-4 ${disabled && 'text-gray-500'}`}>
        {paused ? 'Your meal plan is currently paused' : cancelled ? 'Your meal plan is currently cancelled' : title}
      </h3>
      <div>{paused ? 'Your meal plan is currently paused' : cancelled ? 'Your meal plan is currently cancelled' : text}</div>
      {buttonText && (
        redirectLink && !paused && !cancelled ?
          <a className="w-full" href={redirectLink}>
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
            text={paused ? 'Unpause Mealplan' : cancelled ? 'Reactivate Mealplan' : buttonText}
            onClick={buttonAction}
            disabled={disabled}
          />
      )}
    </div>
  );
}
