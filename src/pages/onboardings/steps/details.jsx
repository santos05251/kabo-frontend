import React, { Component } from "react";
import DogDetailsForm from "../../../components/onboardings/dog-details-form";

class DetailStep extends Component {
  render() {
    const { onboarding_details_data, selectedDogs, updateDogDetail } = this.props;
    return (
      <React.Fragment>
        <section className="flex flex-col items-center xs:mx-5 xs:pb-5 md:pb-10 xs:pt-4 md:pt-8">
          {selectedDogs &&
            selectedDogs.dogs &&
            selectedDogs.dogs.map((item, idx) => (
              <div className="on-boarding-form-container" key={idx}>
                <DogDetailsForm
                  dogDetails={item}
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

export default DetailStep;
