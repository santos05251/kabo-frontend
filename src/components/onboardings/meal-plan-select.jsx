import React from "react";
import FoodCard from "./food-card";

const MealPlanSelect = ({
  type,
  recipes,
  selectedKibble,
  selectedCookedRecipes,
  handleSelectedKibbleRecipe,
  handleSelectedCookedRecipes,
  selectedLength
}) => {
  return (
    <React.Fragment>
      {recipes &&
        recipes.map((food, idx) => (
          <FoodCard
            key={idx}
            type={type}
            food={food}
            selectedKibble={selectedKibble}
            selectedCookedRecipes={selectedCookedRecipes}
            handleSelectedCookedRecipes={handleSelectedCookedRecipes}
            handleSelectedKibbleRecipe={handleSelectedKibbleRecipe}
            selected={type === 'kibble'
              ? selectedKibble.includes(food.recipe)
              : selectedCookedRecipes.includes(food.recipe)}
            selectedLength={selectedLength}
          />
        ))}
    </React.Fragment>
  );
};

export default MealPlanSelect;
