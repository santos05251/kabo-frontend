import React, { useEffect, useState } from "react";
import FormWrapper from "./form-wrapper";
import EditableDropdown from "./edit-dropdown";
import DogInput from "./dog-input";

const DogForm = ({ index, breeds, ages, unknown_breeds, updateDog, dogDetail, deleteDog, lastLength }) => {
  const [dogName, setDogName] = useState(dogDetail.name?dogDetail.name:'');
  const [breed, setBreed] = useState(dogDetail.breed?dogDetail.breed:{});
  const [age, setAge] = useState(dogDetail.age?dogDetail.age:{});
  const [dog, setDog] = useState({index, name: dogDetail.name?dogDetail.name:'', breed: dogDetail.breed?dogDetail.breed:{},  age: dogDetail.age?dogDetail.age:{}});
  const handleDogName = (name) => {
    setDogName(name);
    setDog({ ...dog, name: name });
    updateDog({ ...dog, name: name });
  };

  const handleDogBreed = (breed) => {
    setBreed(breed);
    setDog({ ...dog, breed: breed });
    updateDog({ ...dog, breed: breed });
  };

  const handleDogAge = (age) => {
    setAge(age);
    setDog({ ...dog, age: age });
    updateDog({ ...dog, age: age });
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
