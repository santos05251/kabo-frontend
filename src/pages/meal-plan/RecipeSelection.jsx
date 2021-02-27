import React, { Component } from "react";
import LoadingCircle from "../../components/partials/loading";
import MealPlanSelect from "../../components/meal-plan/meal-plan-select";

class RecipeSelection extends Component {
  handleChange = (selectedDog) => {
    this.props.selectedDog(selectedDog);
  };
  render() {
    const {
      user,
      index,
      selectedKibble,
      isKibble,
      toggleKibble,
      selectedDog,
      handleSelectedKibbleRecipe,
      handleSelectedCookedRecipes,
      selectedCookedRecipes,
      selectedLength,
      showCooked,
      showKibble,
      onConfirm
    } = this.props;
    return (
      <div className="md:w-3/5 w-full flex flex-col lg:py-9 items-center bg-recipeGray">
        <div className="w-full">
          {showCooked && (
            <div>
              {!user.cooked_recipes ? (
                <LoadingCircle />
              ) : (
                  showCooked && (
                    <>
                    <div className="w-11/12 mx-auto">
                      <div className="mb-6 text-xl text-center md:text-left">Fresh Food</div>
                      </div>
                      <div className="grid w-11/12 mx-auto md:grid-cols-3 grid-cols-2 gap-6">
                        <MealPlanSelect
                          type="cooked"
                          index={index}
                          recipes={user.cooked_recipes}
                          handleSelectedCookedRecipes={handleSelectedCookedRecipes}
                          selectedCookedRecipes={selectedCookedRecipes}
                          selectedKibble={selectedKibble}
                          selectedDog={selectedDog}
                          selectedLength={selectedLength}
                        />
                      </div>
                    </>
                  )
                )}
            </div>
          )}
          {showKibble && (
            <div>
              {!user.kibble_recipes ? (
                <LoadingCircle />
              ) : (
                  showKibble && (
                    <>
                     <div className="w-11/12 mx-auto">
                      <div className="mb-6 text-xl text-center md:text-left">Kibble</div>
                      </div>
                      <div className="grid w-11/12 mx-auto  grid-cols-2 md:grid-cols-3 gap-6 ">
                        <MealPlanSelect
                          type="kibble"
                          recipes={user.kibble_recipes}
                          selectedKibbleRecipe={handleSelectedKibbleRecipe}
                          selectedKibble={selectedKibble}
                          selectedCookedRecipes={selectedCookedRecipes}
                          toggleKibble={toggleKibble}
                          isKibble={isKibble}
                          selectedDog={selectedDog}
                          selectedLength={selectedLength}
                        />
                      </div>
                    </>
                  )
                )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RecipeSelection;
