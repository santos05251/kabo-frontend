import React, { useState } from "react";
import DietPortionCard from "./DailyDietPortionCard.jsx";
import "./style.css";

const DailyDietPortion = ({ meal, dog, handleDietPortion, dogName }) => {
  const [dietPortion, setDietPortion] = useState("");

  const handleSelect = (item) => {
    setDietPortion(item);
    handleDietPortion(
      dog,
      item.kibble_portion
        ? {
            cooked_portion: item.cooked_portion,
            kibble_portion: item.kibble_portion,
          }
        : { cooked_portion: item.cooked_portion }
    );
  };

  // console.log(cookedRecipes,)

  return (
    <React.Fragment>
      <div className="w-full flex flex-col items-center">
        <div className="container flex flex-col">
          <div className="pb-3 text-left text-3xl font-normal p-5 pt-3">
            Choose {dogName && dogName}'s Daily <br /> portion for Kabo
          </div>
          <div className="p-5  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
            {/* {meal.getting_diet_portion && <LoadingCircle />} */}
            {meal &&
              meal[dog] &&
              meal[dog].portions.map((item, idx) => (
                <DietPortionCard
                  key={idx}
                  item={item}
                  handleSelect={handleSelect}
                  dietPortion={dietPortion}
                  recipeTypes={meal[dog]["recipes_type"]}
                />
              ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default DailyDietPortion;
