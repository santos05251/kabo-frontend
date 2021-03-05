import React, { Component } from "react";
import DailyDietPortionNew from "./shared/DailyDietPortionNew";

class FourthStep extends Component {
  state = {
    selectedPortion: false,
  };

  componentDidMount() {
  }

  togglePortion = () => {
    this.setState({ selectedPortion: !this.state.selectedPortion });
  };

  render() {
    const {
      temp_user,
      dietPortions,
      handleDietPortion,
      separateVersion,

      getDogDietPortion,
      cookedRecipes,
      kibbleRecipes
    } = this.props;

    const daily_portions = this.props.diet_portions;

    return (
      <React.Fragment>
        {temp_user &&
          temp_user.temp_dog_ids &&
          temp_user.temp_dog_ids.map((dog, idx) => (
            <DailyDietPortionNew
              key={idx}
              meal={daily_portions}
              dog={dog}
              dietPortion={this.state.dietPortion}
              selectedPortion={this.state.selectedPortion}
              togglePortion={this.togglePortion}
              selectedDietPortion={this.selectedDietPortion}
              dietPortions={dietPortions}
              handleDietPortion={handleDietPortion}
              separateVersion={separateVersion}

              getDogDietPortion={getDogDietPortion}
              kibbleRecipes={kibbleRecipes[dog]}
              cookedRecipes={cookedRecipes[dog]}
            />
          ))}
      </React.Fragment>
    );
  }
}

export default FourthStep;
