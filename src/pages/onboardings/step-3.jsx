import React, { Component } from "react";
import Recipes from "./recipes";

class ThirdStep extends Component {
  state = {
    counts: [1, 2],
  };

  handleNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  render() {
    const {
      selectedDogs,
      cookedRecipes,
      selectedCookedRecipes,
      selectedKibble,
      temp_user,
    } = this.props;
    return (
      <React.Fragment>
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
              />
            </>
          ))}
      </React.Fragment>
    );
  }
}

export default ThirdStep;
