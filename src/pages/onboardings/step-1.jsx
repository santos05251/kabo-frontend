import React, { Component, useState } from "react";
import addEmpty from "../../assets/images/add-empty.png";
import FormWrapper from "../../components/onboardings/form-wraper";
import EditableDropdown from "../../components/onboardings/edit-dropdown";
import DogInput from "../../components/onboardings/input";

class FirstStep extends Component {
  state = {
    dogForm: [],
    dogs: [],
  };

  addDogForm = () => {
    this.setState({
      dogForm: [...this.state.dogForm, this.state.dogForm.length + 1],
    });
  };

  //   addDog = (dog) => {
  //     this.setState({ dogs: [...this.state.dogs, dog] });
  //   };

  componentDidMount() {
    // default form
    this.addDogForm()
  }

  render() {
    const { onboarding_starter_data, updateDog } = this.props;

    return (
      <section className="flex flex-col items-center xs:mx-5 md:mx-5 xs:pb-5 md:pb-5 xs:pt-4 md:pt-5 ">
        <div className="on-boarding-form-container">
          {this.state.dogForm.map((idx) => (
            <React.Fragment key={idx}>
              <DogForm
                index={idx}
                breeds={
                  onboarding_starter_data && onboarding_starter_data.breeds
                }
                ages={onboarding_starter_data && onboarding_starter_data.ages}
                unknown_breeds={
                  onboarding_starter_data &&
                  onboarding_starter_data.unknown_breeds
                }
                updateDog={updateDog}
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

export default FirstStep;

const DogForm = ({ index, breeds, ages, updateDog, unknown_breeds }) => {
  const [dogName, setDogName] = useState("");
  const [breed, setBreed] = useState({});
  const [age, setAge] = useState({ });

  const [dog, setDog] = useState({ index });
  const handleDogName = (name) => {
    setDogName(name);
    setDog({ ...dog, name: name });

    updateDog({ ...dog, name: name });
  };

  const handleDogBreed = (breed) => {
    setBreed(breed);
    setDog({ ...dog, breed: breed.value });

    updateDog({ ...dog, breed: breed.value });
  };

  const handleDogAge = (age) => {
    setAge(age);
    setDog({ ...dog, age_in_months: age.value });
    
    updateDog({ ...dog, age_in_months: age.value });
  };

  const getBreedsList = () => {
    return (
      breeds &&
      breeds.map((item) => {
        return { label: item.label, value: item.value };
      })
    );
  };

  const getAgesList = () => {
    return (
      ages &&
      ages.map((item) => {
        return { label: item.label, value: item.value };
      })
    );
  };

  return (
    <FormWrapper>
      <div className="flex flex-col xs:py-3 md:py-6">
        <DogInput
          label="What’s your dog’s name?"
          placeholder="Type your dog's name here"
          value={dogName}
          setValue={handleDogName}
        />
      </div>

      <EditableDropdown
        label="What’s their breed?"
        options={getBreedsList()}
        isCheckbox={true}
        helpText="Breed not listed or unknown mix"
        value={breed}
        setValue={handleDogBreed}
        unknown_breeds={unknown_breeds}
        placeholder="Type or select below"
      />

      <EditableDropdown
        label="How old is your dog?"
        options={getAgesList()}
        value={age}
        setValue={handleDogAge}
        placeholder="Type or select below"
      />
    </FormWrapper>
  );
};
