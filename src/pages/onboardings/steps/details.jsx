import React, { Component } from "react";
import { connect } from "react-redux";
import { onboardingActions } from "../../../actions";
import DogDetailsForm from "../../../components/onboardings/dog-details-form";

class DetailStep extends Component {

  componentDidMount() {
    this.props.getOnboardingDetails();
  }

  render() {
    const { onboarding_details_data, dogs: selectedDogs, updateDogDetail } = this.props;
    return (
      <React.Fragment>
        <section className="flex flex-col items-center xs:mx-5 xs:pb-5 md:pb-10 xs:pt-4 md:pt-8">
          {selectedDogs &&
            selectedDogs.dogs &&
            selectedDogs.dogs.map((item, idx) => (
              <div className="on-boarding-form-container" key={idx}>
                <DogDetailsForm
                  dogDetail={item}
                  updateDog={updateDogDetail}
                  activity_levels = { onboarding_details_data && onboarding_details_data.activity_levels }
                  body_types = { onboarding_details_data && onboarding_details_data.body_types }
                />
              </div>
            ))}
        </section>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOnboardingDetails: () =>
    dispatch(onboardingActions.getOnboardingDetails())
});

function mapStateToProps(state) {
  return {
    onboarding_details_data: state.onboarding.onboarding_details_data,
    dogs: state.onboarding.dogs
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailStep);
