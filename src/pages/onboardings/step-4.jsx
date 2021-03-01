import React, { Component } from "react";
import LoadingCircle from "../../components/partials/loading";
import DailyDietPortion from "./shared/DailyDietPortion";

class FourthStep extends Component {
  state = {
    selectedPortion: false,
  };

  componentDidMount() {
    const { temp_user } = this.props;
    let str = "";
    for (let id of temp_user && temp_user.temp_dog_ids) {
      str += id + ",";
    }
    str = str.replace(/,\s*$/, "");
    console.log("presentation of ids", str);
    this.props.getDogDietPortion(str);
  }

  togglePortion = () => {
    this.setState({ selectedPortion: !this.state.selectedPortion });
  };

  render() {
    const {
      temp_user,
      getting_diet_portion,
      dietPortions,
      handleDietPortion,
      separateVersion,
    } = this.props;
    const { daily_portions } = this.props.diet_portions;
    return (
      <React.Fragment>
        {getting_diet_portion && <LoadingCircle />}
        {temp_user &&
          temp_user.temp_dog_ids &&
          temp_user.temp_dog_ids.map((dog, idx) => (
            <DailyDietPortion
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
            />
          ))}
      </React.Fragment>
    );
  }
}

export default FourthStep;
