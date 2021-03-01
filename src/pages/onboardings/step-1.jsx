import React, { Component, useState } from "react";
import addEmpty from "../../assets/images/add-empty.png";
import FormWrapper from "../../components/onboardings/form-wraper";
import Dropdown from "../../components/onboardings/dropdown";
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

  //   addDogs = (dog) => {
  //     this.setState({ dogs: [...this.state.dogs, dog] });
  //   };

  render() {
    const { onboarding_starter_data, addDogs } = this.props;
    console.log("starter",onboarding_starter_data)
    return (
      <>
        <section className="flex flex-col items-center xs:mx-5 xs:pb-5 md:pb-10 xs:pt-4 md:pt-8">
          <div className="on-boarding-form-container">
            <DogForm
              breeds={onboarding_starter_data && onboarding_starter_data.breeds}
              ages={onboarding_starter_data && onboarding_starter_data.ages}
              unknown_breeds={
                onboarding_starter_data &&
                onboarding_starter_data.unknown_breeds
              }
              addDogs={addDogs}
            />
            {this.state.dogForm.map((idx) => (
              <React.Fragment key={idx}>
                <DogForm
                  breeds={
                    onboarding_starter_data && onboarding_starter_data.breeds
                  }
                  ages={onboarding_starter_data && onboarding_starter_data.ages}
                  unknown_breeds={
                    onboarding_starter_data &&
                    onboarding_starter_data.unknown_breeds
                  }
                  addDogs={addDogs}
                />
              </React.Fragment>
            ))}
            <div
              className="flex xs:px-4 md:px-9 py-5 bg-white rounded-lg xs:mt-5 md:mt-10 cursor-pointer"
              onClick={this.addDogForm}
            >
              <img src={addEmpty} />
              <p className="text-green-700 ml-3">I have another dog</p>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default FirstStep;

const DogForm = ({ breeds, ages, addDogs, unknown_breeds }) => {
  const [dogName, setDogName] = useState("");
  const [breed, setBreed] = useState({ label: "Type or select below" });
  const [age, setAge] = useState({ label: "Type or select below" });
  const [dog, setDog] = useState("");

  const handleDogName = (name) => {
    setDogName(name);
    setDog({ ...dog, name: name });
  };

  const handleDogBreed = (breed) => {
    setBreed(breed);
    setDog({ ...dog, breed: breed.value });
  };

  const handleDogAge = (age) => {
    setAge(age);
    setDog({ ...dog, age_in_months: age.value });
    addDogs({ ...dog, age_in_months: age.value });
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
      <div className="flex flex-col xs:pb-5 md:pb-10">
        <DogInput
          label="What’s your dog’s name?"
          placeholder="Type your dog's name here"
          value={dogName}
          setValue={handleDogName}
        />
      </div>

      <Dropdown
        label="What’s their breed?"
        options={getBreedsList()}
        isCheckbox={true}
        helpText="Breed not listed or unknown mix"
        value={breed}
        setValue={handleDogBreed}
        unknown_breeds={unknown_breeds}
      />

      <Dropdown
        label="How old is your dog?"
        options={getAgesList()}
        helpText="Breed not listed or unknown mix"
        value={age}
        setValue={handleDogAge}
      />
    </FormWrapper>
  );
};
