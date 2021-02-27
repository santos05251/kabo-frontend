import React from "react";
import { CircleSVG } from "../../components/meal-plan/circle";

const DietPortionCard = ({ item, handleSelect, dietPortion, dog }) => {
  let thenum = item.title.match(/\d+/)[0];
  console.log(thenum, "thenummmmm");
  thenum = parseInt(thenum);
  if (thenum < 24) {
    thenum = 101;
  }

  return (
    <button
      onClick={(e) => handleSelect(item)}
      className={
        item.title === dietPortion.title
          ? " flex flex-col w-full pt-4 px-4 pb-16 items-center bg-green-100 font-messina relative rounded-lg border border-gray-200"
          : " flex flex-col w-full  p-2 items-center bg-white font-messina relative rounded-lg border border-gray-200"
      }
    >
      <div className="flex w-2/5 relative mb-4">
        {thenum === 100 && (
          <img
            src="/diet-logo.png"
            className="absolute w-3/4"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}

        {thenum > 100 && (
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
        <CircleSVG num={thenum} />
      </div>
      <p className="font-messina mt-1">{item.title}</p>
      <div>{thenum === 100 ?  <p className="text-xs mt-3">All of {dog?.name}’s daily caloric needs from cooked food</p> :  <p className="text-xs mt-3">Mix our food with 75% of {dog?.name}’s existing food</p>}</div>
    </button>
  );
};

export default DietPortionCard;
