import React, { Component } from "react";
import { connect } from "react-redux";
import Recipes from "../../../components/onboardings/recipes";
import DailyDietPortion from "../../../components/onboardings/daily-diet-portion";

class RecipeStep extends Component {
  render() {
    const {
      cookedRecipes,
      kibbleRecipes,
      dietPortions,
      selectedDogs,
      temp_user,
      separateVersion
    } = this.props;

    const {
      handleSelectedCookedRecipes,
      handleSelectedKibbleRecipe,
      handleDietPortion
    } = this.props;
    
    return (
      <div>
        {selectedDogs &&
          selectedDogs.dogs &&
          selectedDogs.dogs.map((dog, idx) => (
            <div key={idx}>
              <div className="py-6">
                <div className="font-messina bg-green-900 text-white text-3xl mx-auto rounded-full h-16 w-16 flex items-center justify-center">
                  {idx + 1}
                </div>
                <h1 className="font-medium text-2xl text-center my-4">
                  Choose up to 2 recipes for {dog.name}
                </h1>
              </div>
              {temp_user &&
                temp_user.temp_dog_ids &&
                temp_user.temp_dog_ids.length > idx &&
                <div className={!separateVersion ? "grid lg:grid-cols-6/4 gap-20 my-9" : ""}>
                  <Recipes
                    key={idx}
                    tempDogId={temp_user.temp_dog_ids[idx]}
                    handleSelectedKibbleRecipe={handleSelectedKibbleRecipe}
                    handleSelectedCookedRecipes={handleSelectedCookedRecipes}
                    separateVersion={separateVersion}
                    cookedRecipes={cookedRecipes[temp_user.temp_dog_ids[idx]] != undefined ? cookedRecipes[temp_user.temp_dog_ids[idx]] : []}
                    kibbleRecipes={kibbleRecipes[temp_user.temp_dog_ids[idx]] != undefined ? [kibbleRecipes[temp_user.temp_dog_ids[idx]]] : []}
                  />
                  {!separateVersion &&
                    <div className="h-full lg:border-l-2 border-gray-300 lg:pl-12">
                      <DailyDietPortion
                        key={idx}
                        dogId={temp_user.temp_dog_ids[idx]}
                        handleDietPortion={handleDietPortion}
                        dietPortion={dietPortions[temp_user.temp_dog_ids[idx]] != undefined ? dietPortions[temp_user.temp_dog_ids[idx]] : {}}
                        separateVersion={separateVersion}
                      />
                    </div>
                  }
                </div>
              }
            </div>
          ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
});

function mapStateToProps(state) {
  return {
    temp_user: state.onboarding.temp_user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeStep);
