import React, { useEffect } from 'react';
import LoadingCircle from '../../components/partials/loading';
import DietPortionCard from './DailyDietPortionCard.jsx';
import { ReactComponent as MealPortion25 } from '../../assets/images/meal-portion-25.svg';
import './style.css';

const DailyDietPortion = ({
  meal,
  dog_id,
  dog,
  dietPortion,
  cookedRecipes,
  selectedDietPortion,
  getDailyDietPortion,
  kibbleRecipes,
}) => {
  useEffect(() => {
    const data = {
      cooked_recipes: cookedRecipes,
      dog_id: dog.id,
      kibble_recipe: kibbleRecipes[0],
    };
    getDailyDietPortion(data);
  }, [cookedRecipes, kibbleRecipes, dog_id]);

  const handleSelect = (item) => {
    selectedDietPortion(item);
  };

  return (
    <>
      <div className="w-full flex flex-col pt-9 items-center sm:bg-white">
        <div className="container flex flex-col">
          <div className="mb-3 flex items-center text-xl font-extrabold md:text-left">
            <MealPortion25 />
            {' '}
            <h2 className="text-2xl sm:text-3xl font-extrabold ml-5">{dog && dog.name}'s portion</h2>
          </div>
          <div className="mb-5">
            <p>
              Choose
              {dog && dog.name}
              's Daily portion of Kabo:
              <br />
              If you want to edit the amount of food in your box click here
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {meal.getting_diet_portion && <LoadingCircle />}
            {meal
              && meal.daily_diet_portion_data
              && meal.daily_diet_portion_data.portions
              && meal.daily_diet_portion_data.portions.map((item, idx) => (
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
    </>
  );
};
export default DailyDietPortion;
