import React, { Component } from "react";
import MealPlanSelect from "./meal-plan-select";
import LoadingCircle from "../partials/loading";

class RecipeSelection extends Component {
  render() {
    const {
      user,
      selectedKibble,
      selectedCookedRecipes,
      handleSelectedKibbleRecipe,
      handleSelectedCookedRecipes,
      selectedLength,
      separateVersion
    } = this.props;
    return (
      <div className="w-full">
        <div className="mb-3 text-center text-3xl" >
          1. Select recipes
        </div>
        {!user.cooked_recipes ? (
          <LoadingCircle />
        ) : (
          <div
            className={`flex flex-col md:grid ${
              separateVersion ? "md:grid-cols-4" : "md:grid-cols-3"
            }  gap-5`}
          >
            <MealPlanSelect
              type="cooked"
              recipes={user.cooked_recipes}
              selectedKibble={selectedKibble}
              selectedCookedRecipes={selectedCookedRecipes}
              handleSelectedCookedRecipes={handleSelectedCookedRecipes}
              selectedLength={selectedLength}
            />
          </div>
        )}
        {!user.kibble_recipes ? (
          <LoadingCircle />
        ) : (
          <div
            className={`flex flex-col md:grid ${
              separateVersion ? "md:grid-cols-4" : " md:grid-cols-3"
            }  gap-5`}
          >
            <MealPlanSelect
              type="kibble"
              recipes={user.kibble_recipes}
              selectedKibble={selectedKibble}
              selectedCookedRecipes={selectedCookedRecipes}
              handleSelectedKibbleRecipe={handleSelectedKibbleRecipe}
              selectedLength={selectedLength}
            />
          </div>
        )}
      </div>
    );
  }
}

export default RecipeSelection;
