import React from "react";
import { CircleSVG } from "./circle";

const DailyDietPortionCard = ({ item, handleSelect, dietPortion, recipeTypes }) => {
  let pNum = item.title.match(/\d+/)[0];
  pNum = parseInt(pNum);
  if (pNum < 24) {
    pNum = 101;
  }
  return (
    <div
      className={
        item.title === dietPortion.title
          ? " flex flex-col w-full pt-4 px-4 pb-4 items-center bg-green-100 font-messina relative rounded-lg border border-gray-200"
          : " flex flex-col w-full  pt-4 px-4 pb-4 items-center bg-white font-messina relative rounded-lg border border-gray-200"
      }
      onClick={(e) => handleSelect(item)}
    >
      {recipeTypes === "MIXED_COOKED_AND_KIBBLE_RECIPE_DAILY_PORTIONS" ? (
        <div className="w-2/5 relative">
          <img
            src="https://staging.kabo.co/assets/mealplan/kabo-50-cooked-57f4c1e8167ece7756d22486ea3820038f18f28d905e71c94e8d117e856dfcba.png"
            alt={item.title}
          />
        </div>
      ) : (
        <div className="w-2/5 relative">
          {pNum === 100 && (
            <img
              src="/diet-logo.png"
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}

          {pNum > 100 && (
            <img
              src="/plus.png"
              className="absolute h-1/3"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
          <CircleSVG num={pNum} />
        </div>
      )}
      <p className="font-messina mt-1">{item.title}</p>
      <p className="font-messina mt-1 text-center">{item.description}</p>
    </div>
  );
};

export default DailyDietPortionCard;
