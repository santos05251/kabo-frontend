import React, { Component } from "react";
import Recipes from "./recipes";
import LoadingCircle from "../../components/partials/loading";
import DailyDietPortion from "./shared/DailyDietPortion";

class ThirdStep extends Component {
  state = {
    counts: [1, 2],
    selectedPortion: false,
  };

  handleNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  componentDidMount() {
    if (!this.props.separateVersion) {
      const { temp_user } = this.props;
      let str = "";
      for (let id of temp_user && temp_user.temp_dog_ids) {
        str += id + ",";
      }
      str = str.replace(/,\s*$/, "");
      this.props.getDogDietPortion(str);
    }
  }

  togglePortion = () => {
    this.setState({ selectedPortion: !this.state.selectedPortion });
  };

  render() {
    const {
      selectedDogs,
      cookedRecipes,
      selectedCookedRecipes,
      selectedKibble,
      temp_user,
    } = this.props;
    const {
      getting_diet_portion,
      dietPortions,
      handleDietPortion,
      separateVersion,
    } = this.props;
    const daily_portions = this?.props.diet_portions?.daily_portions;
    return (
      <div className="md:w-4/5 w-11/12 mx-auto">
        <div className="py-6">
          <h1
            className={`font-medium text-4xl mb-3 ${separateVersion && "text-center"
              }`}
          >
            What's in {selectedDogs.dogs && selectedDogs.dogs[0].name}'s Box
          </h1>
          <div className="font-messina text-center  mb-4 text-black">
            Choose up to 2 and click Save Changes
          </div>
        </div>
        <div
          className={!separateVersion && "grid lg:grid-cols-6/4 gap-20 my-9"}
        >
          {/* {this.state.counts.map((dog, idx) => (
          <>
            <Recipes
              key={idx}
              dog_={dog}
              kibble={kibble}
              tempDogId={temp_user.temp_dog_ids[idx]}
              cookedRecipes={cookedRecipes}
              selectedKibble={selectedKibble}
              selectedCookedRecipes={selectedCookedRecipes}
            />
          </>
        ))} */}

          {selectedDogs &&
            selectedDogs.dogs &&
            selectedDogs.dogs.map((dog, idx) => (
              <>
                <Recipes
                  key={idx}
                  dog_={dog}
                  tempDogId={temp_user.temp_dog_ids[idx]}
                  cookedRecipes={cookedRecipes}
                  selectedKibble={selectedKibble}
                  selectedCookedRecipes={selectedCookedRecipes}
                  separateVersion={separateVersion}
                />
              </>
            ))}
          {!separateVersion && (
            <div className="h-full lg:border-l-2 border-gray-300 lg:pl-12">
              {getting_diet_portion && <LoadingCircle />}
              {temp_user &&
                temp_user.temp_dog_ids &&
                temp_user.temp_dog_ids.map((dog, idx) => (
                  <DailyDietPortion
                    key={idx}
                    meal={daily_portions}
                    dog={dog}
                    dogName={selectedDogs.dogs[0].name}
                    dietPortion={this.state.dietPortion}
                    selectedPortion={this.state.selectedPortion}
                    togglePortion={this.togglePortion}
                    selectedDietPortion={this.selectedDietPortion}
                    dietPortions={dietPortions}
                    handleDietPortion={handleDietPortion}
                    separateVersion={separateVersion}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ThirdStep;
