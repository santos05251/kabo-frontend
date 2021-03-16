import React, { Component } from "react";
import { connect } from "react-redux";
import DailyDietPortionSeparate from "../../../components/onboardings/daily-diet-portion-separate";

class PortionStep extends Component {
  render() {
    const {
      cookedRecipes,
      kibbleRecipes,
      temp_user,
      handleDietPortion,
      separateVersion
    } = this.props;

    return (
      <React.Fragment>
        {
          temp_user &&
          temp_user.temp_dog_ids &&
          temp_user.temp_dog_ids.map((dogId, idx) => (
            <DailyDietPortionSeparate
              key={idx}
              dogId={dogId}
              handleDietPortion={handleDietPortion}
              separateVersion={separateVersion}
              cookedRecipes={cookedRecipes[dogId]}
              kibbleRecipes={kibbleRecipes[dogId]}
            />
          ))
        }
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(PortionStep);
