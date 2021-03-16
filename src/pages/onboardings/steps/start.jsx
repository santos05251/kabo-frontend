import React, { Component } from "react";
import addEmpty from "../../../assets/images/add-empty.png";
import DogForm from "../../../components/onboardings/dog-form";

class StartStep extends Component {
  state = {
    dogForm: [],
    lastLength: 0
  };

  addDogForm = () => {
    const { dogForm, lastLength } = this.state;
    this.setState({
      dogForm: [...dogForm, lastLength + 1],
      lastLength: lastLength + 1
    });
  };

  componentDidMount() {
    // default form
    this.addDogForm()
  }

  removeDog = (index) => {
    const { dogForm } = this.state;
    if (dogForm.length <= 1)
      return;

    for (let i in dogForm) {
      if (dogForm[i] === index) {
        dogForm.splice(i, 1);
        this.setState({dogForm});
      }
    }
    this.props.removeDog(index);
  };

  render() {
    const { onboarding_starter_data, updateDog } = this.props;
    const { dogForm } = this.state;

    return (
      <section className="flex flex-col items-center xs:mx-5 md:mx-5 xs:pb-5 md:pb-5 xs:pt-4 md:pt-5 ">
        <div className="on-boarding-form-container">
          { dogForm.map((idx) => (
            <React.Fragment key={idx}>
              <DogForm
                index = { idx }
                breeds = { onboarding_starter_data && onboarding_starter_data.breeds }
                ages = { onboarding_starter_data && onboarding_starter_data.ages }
                unknown_breeds = { onboarding_starter_data && onboarding_starter_data.unknown_breeds }
                updateDog = { updateDog }
                deleteDog = { this.removeDog }
                lastLength = { dogForm.length }
              />
            </React.Fragment>
          ))}
          <div
            className="flex px-4 md:px-9 py-5 md:py-7 mt-3 md:mt-5 bg-white rounded-lg cursor-pointer"
            onClick={this.addDogForm}
          >
            <img src={addEmpty} />
            <p className="text-green-700 ml-3">I have another dog</p>
          </div>
        </div>
      </section>
    );
  }
}

export default StartStep;
