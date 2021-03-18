import React, { useState } from "react";
import FormWrapper from "./form-wrapper";
import SingleSelect from "./single-select";

const DogDetailsForm = ({
  dogDetail,
  updateDog,
  body_types,
  activity_levels
}) => {
  const genders = [
    { label: "Female", value: false },
    { label: "Male", value: true },
  ];
  // neutered or sprayed
  const ovaries = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];
  const units = [
    { label: "lbs", value: "lbs" },
    { label: "kg", value: "kg" },
  ];

  const [gender, setGender] = useState(dogDetail.gender!=undefined?dogDetail.gender:false);
  const [ovary, setOvary] = useState(dogDetail.ovary!=undefined?dogDetail.ovary:'');
  const [weightUnit, setWeightUnit] = useState(dogDetail.weight_unit!=undefined?dogDetail.weight_unit:units[0].value);
  const [weight, setWeight] = useState(dogDetail.weight!=undefined?dogDetail.weight:'');
  const [bodyType, setBodyType] = useState(dogDetail.body_type!=undefined?dogDetail.body_type:'');
  const [activityLevel, setActivityLevel] = useState(dogDetail.activity_level!=undefined?dogDetail.activity_level:'');
  const [dog, setDog] = useState({ gender: false, weight_unit: units[0].value, ...dogDetail });

  const handleGender = (gender) => {
    setGender(gender);
    setDog({ ...dog, gender });
    updateDog({ ...dog, gender });
  };

  const handleOvary = (ovary) => {
    setOvary(ovary);
    setDog({ ...dog, ovary });
    updateDog({ ...dog, ovary });
  };

  const handleWeight = (weight) => {
    if(Number(weight) < 0) {
      setWeight(0);
      return;
    }
    setWeight(weight);
    setDog({ ...dog, weight });
    updateDog({ ...dog, weight });
  };

  const handleWeightUnit = (unit) => {
    setWeightUnit(unit);
    setDog({ ...dog, weight_unit: unit });
    updateDog({ ...dog, weight_unit: unit });
  };

  const handleBodyType = (body_type) => {
    setBodyType(body_type);
    setDog({ ...dog, body_type });
    updateDog({ ...dog, body_type });
  };

  const handleActivityLevel = (activity_level) => {
    setActivityLevel(activity_level);
    setDog({ ...dog, activity_level });
    updateDog({ ...dog, activity_level });
  };

  return (
    <FormWrapper increaseSmallPadding>
      <div className="flex flex-col xs:pb-5 md:pb-10 pb-4">
        <label className="font-semibold pb-4">{dog && dog.name} is a</label>
        <div className="flex">
          {genders &&
            genders.map((item, idx) => (
              <input
                key={idx}
                type="button"
                value={item.label}
                onClick={(e) => handleGender(item.value)}
                className={
                  gender === item.value
                    ? "border cursor-pointer mr-3 mb-2 border-green w-32 bg-green-600 text-white font-medium focus:outline-none rounded-lg py-3"
                    : "border cursor-pointer mr-3 mb-2 border-green w-32 bg-white text-green-600 focus:outline-none rounded-lg py-3"
                }
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col xs:pb-5 md:pb-10 pb-4">
        <label className="font-semibold pb-4">
          Is {dog && dog.name} {gender ? 'neutered' : 'spayed'}?
        </label>
        <div className="flex">
          {ovaries &&
            ovaries.map((item, idx) => (
              <input
                key={idx}
                type="button"
                value={item.label}
                onClick={(e) => handleOvary(item.value)}
                className={
                  ovary === item.value
                    ? "border cursor-pointer mr-3 mb-2 border-green w-32 bg-green-600 text-white font-medium focus:outline-none rounded-lg py-3"
                    : "border cursor-pointer mr-3 mb-2 border-green w-32 bg-white text-green-600 focus:outline-none rounded-lg py-3"
                }
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col xs:pb-5 md:pb-10 pb-4">
        <label className="font-semibold pb-4">
          How much does {dog && dog.name} weigh?
        </label>
        <div className="flex">
          <input
            type="number"
            className="border step-input mr-3 mb-2 md:border-transparent-400 placeholder-black text-black bg-transparent w-20 text-center focus:outline-none rounded-lg py-3"
            placeholder="0"
            value={weight}
            min="0"
            onChange={(e) => handleWeight(e.target.value)}
          />

          {units &&
            units.map((item, idx) => (
              <input
                key={idx}
                type="button"
                value={item.label}
                onClick={(e) => handleWeightUnit(item.value)}
                className={
                  weightUnit === item.value
                    ? "border step-input mr-3 mb-2 md:border-green-700 placeholder-white text-white bg-green-700 font-medium border-0 w-20 text-center focus:outline-none rounded-lg py-3"
                    : "border step-input mr-3 mb-2 md:border-gray-300 placeholder-gray-700 text-gray-700 bg-gray-200 w-20 border-1 text-center focus:outline-none rounded-lg py-3"
                }
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col xs:pb-5 md:pb-10 pb-4">
        <label className="font-semibold pb-4">
          {dog && dog.name}’s body is...
        </label>
        <div className="flex">
          <SingleSelect
            steps={body_types}
            value={bodyType}
            setValue={handleBodyType}
          />
        </div>
      </div>

      <div className="flex flex-col xs:pb-5 md:pb-10 pb-4">
        <label className="font-semibold pb-4">
          {dog && dog.name}’s activity level is...
        </label>
        <div className="flex">
          <SingleSelect
            steps={activity_levels}
            value={activityLevel}
            setValue={handleActivityLevel}
          />
        </div>
      </div>
    </FormWrapper>
  );
};
export default DogDetailsForm;
