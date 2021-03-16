import React, { useEffect, useState } from "react";
import FormWrapper from "./form-wrapper";
import EditableDropdown from "./edit-dropdown";
import DogInput from "./dog-input";

const DogForm = ({ index, breeds, ages, unknown_breeds, updateDog, deleteDog, lastLength }) => {
  const [dogName, setDogName] = useState("");
  const [breed, setBreed] = useState({});
  const [age, setAge] = useState({});
  const [dog, setDog] = useState({ index });
  const handleDogName = (name) => {
    setDogName(name);
    setDog({ ...dog, name: name });
    updateDog({ ...dog, name: name });
  };

  const handleDogBreed = (breed) => {
    setBreed(breed);
    setDog({ ...dog, breed: breed.label });
    updateDog({ ...dog, breed: breed.label });
  };

  const handleDogAge = (age) => {
    setAge(age);
    setDog({ ...dog, age_in_months: age.value });
    updateDog({ ...dog, age_in_months: age.value });
  };

  const removeDog = () => {
    deleteDog(dog.index);
  };

  return (
    <FormWrapper boxShadow>
      {
        lastLength > 1 &&
        <div className="text-right text-green-700 cursor-pointer" onClick={removeDog}>
          Remove
        </div>
      }
      <div className="flex flex-col py-3 md:py-6">
        <DogInput
          label="What’s your dog’s name?"
          placeholder="Type your dog's name here"
          value={dogName}
          setValue={handleDogName}
        />
      </div>

      <EditableDropdown
        label="What’s their breed?"
        options={breeds}
        isCheckbox={true}
        helpText="Breed not listed or unknown mix"
        value={breed}
        setValue={handleDogBreed}
        unknown_breeds={unknown_breeds}
        placeholder="Type or select below"
      />

      <EditableDropdown
        label="How old is your dog?"
        options={ages}
        value={age}
        setValue={handleDogAge}
        placeholder="Type or select below"
      />
    </FormWrapper>
  );
};

export default DogForm;
