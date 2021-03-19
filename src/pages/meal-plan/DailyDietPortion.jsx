import React, { useEffect } from "react";
import LoadingCircle from "../../components/partials/loading";
import DietPortionCard from "./DailyDietPortionCard.jsx";
import "./style.css";

const DailyDietPortion = ({
  meal,
  dog_id,
  dog,
  dietPortion,
  cookedRecipes,
  selectedDietPortion,
  getDailyDietPortion,
  kibbleRecipes
}) => {
  useEffect(() => {
    const data = {
      cooked_recipes: cookedRecipes,
      dog_id: dog.id,
      kibble_recipe: kibbleRecipes[0]
    };
    getDailyDietPortion(data);
  }, [cookedRecipes, kibbleRecipes, dog_id]);

  const handleSelect = (item) => {
    selectedDietPortion(item);
  };

  return (
    <React.Fragment>
      <div className="w-full flex flex-col pt-9 items-center bg-white">
        <div className="container flex flex-col">
          <div className="mb-6 text-xl font-extrabold md:text-left">Choose {dog && dog.name}'s Daily portion of Kabo</div>
          <div className="grid grid-cols-2 md:flex md:flex-wrap">
            {meal.getting_diet_portion && <LoadingCircle />}
            {meal &&
              meal.daily_diet_portion_data &&
              meal.daily_diet_portion_data.portions &&
              meal.daily_diet_portion_data.portions.map((item, idx) => (
                <DietPortionCard
                  key={idx}
                  item={item}
                  handleSelect={handleSelect}
                  dietPortion={dietPortion}
                  dog={dog}
                />
              ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default DailyDietPortion;
