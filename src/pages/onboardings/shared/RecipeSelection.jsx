import React, { Component } from "react";
import MealPlanSelect from "../../../components/meal-plan/meal-plan-select";
import LoadingCircle from "../../../components/partials/loading";

class RecipeSelection extends Component {
  handleChange = (selectedDog) => {
    this.props.selectedDog(selectedDog);
  };
  render() {
    const {
      user,
      dog,
      index,
      kibble,
      isKibble,
      toggleKibble,
      selectedDog,
      handleSelectedKibbleRecipe,
      handleSelectedCookedRecipes,
      selectedCookedRecipes,
    } = this.props;
    return (
      <div className="w-full flex flex-col items-center ">
        <div className="container flex flex-col items-center">
          <div className="w-full">
            <div>
              {!user.cooked_recipes ? (
                <LoadingCircle />
              ) : (
                <>
                  <div
                    className={`mb-3 ${
                      this.props.separateVersion ? "text-center" : "text-left"
                    } text-3xl`}
                  >
                    Fresh Food
                  </div>
                  <div
                    className={`grid ${
                      this.props.separateVersion ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 md:grid-cols-3"
                    }  gap-5`}
                  >
                    <MealPlanSelect
                      type="cooked"
                      dog={user.dogs[index]}
                      index={index}
                      recipes={user.cooked_recipes}
                      handleSelectedCookedRecipes={handleSelectedCookedRecipes}
                      selectedCookedRecipes={selectedCookedRecipes}
                      selectedKibble={kibble}
                      selectedDog={selectedDog}
                    />
                  </div>
                </>
              )}
            </div>
            <div>
              {!user.kibble_recipes ? (
                <LoadingCircle />
              ) : (
                <>
                  <div
                    className={`mb-3 ${
                      this.props.separateVersion ? "text-center" : "text-left"
                    } text-3xl`}
                  >
                    Kibble
                  </div>
                  <div
                     className={`grid ${
                      this.props.separateVersion ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 md:grid-cols-3"
                    }  gap-5`}
                  >
                    <MealPlanSelect
                      type="kibble"
                      dog={user.dogs[index]}
                      recipes={user.kibble_recipes}
                      selectedKibbleRecipe={handleSelectedKibbleRecipe}
                      selectedKibble={kibble}
                      selectedCookedRecipes={selectedCookedRecipes}
                      toggleKibble={toggleKibble}
                      isKibble={isKibble}
                      selectedDog={selectedDog}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeSelection;
