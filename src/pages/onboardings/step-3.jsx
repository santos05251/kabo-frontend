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
      <div>
        {selectedDogs &&
            selectedDogs.dogs &&
            selectedDogs.dogs.map((dog, idx) => (
            <div>
              <div className="py-6">
                <div className="font-messina bg-green-900 text-white text-3xl mx-auto rounded-full h-16 w-16 flex items-center justify-center">
                  {idx + 1}
                </div>
                <h1
                  className="font-medium text-2xl text-center my-4"
                >
                  Choose up to 2 recipes for {dog.name}
                </h1>
              </div>
              <div
                className={!separateVersion && "grid lg:grid-cols-6/4 gap-20 my-9"}
              >
                
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
                          dogName={dog.name}
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
          ))}
      </div>
    );
  }
}

export default ThirdStep;
