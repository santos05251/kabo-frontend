import React, { Component, useState } from "react";
import DropDown from "../../components/onboardings/dropdown";
import FormWrapper from "../../components/onboardings/form-wraper";
// import Steps from "../../components/onboardings/steps";

class SecondStep extends Component {
  componentDidMount() {
    this.props.getOnboardingDetails();
  }

  getBodyTypes = () => {
    const { onboarding_details_data } = this.props;
    return (
      onboarding_details_data &&
      onboarding_details_data.body_types &&
      onboarding_details_data.body_types.map((item) => {
        return { label: item.label, value: item.value };
      })
    );
  };

  getActivityLevels = () => {
    const { onboarding_details_data } = this.props;
    return (
      onboarding_details_data &&
      onboarding_details_data.activity_levels &&
      onboarding_details_data.activity_levels.map((item) => {
        return { label: item.label, value: item.value };
      })
    );
  };

  handleCircleActive = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    const { onboarding_details_data, selectedDogs, addDogsDetail } = this.props;
    return (
      <React.Fragment>
        <section className="flex flex-col items-center xs:mx-5 xs:pb-5 md:pb-10 xs:pt-4 md:pt-8">
          {selectedDogs &&
            selectedDogs.dogs &&
            selectedDogs.dogs.map((item, idx) => (
              <div className="on-boarding-form-container" key={idx}>
                <DogDetailsForm
                  dog={item}
                  addDogsDetail={addDogsDetail}
                  onboarding_details_data={onboarding_details_data}
                  getActivityLevels={this.getActivityLevels}
                  getBodyTypes={this.getBodyTypes}
                />
              </div>
            ))}
        </section>
      </React.Fragment>
    );
  }
}

export default SecondStep;

const DogDetailsForm = ({
  dog,
  addDogsDetail,
  getBodyTypes,
  getActivityLevels,
  onboarding_details_data,
}) => {
  const neutereds = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];
  const units = [
    { label: "lbs", value: "lbs" },
    { label: "kg", value: "kg" },
  ];

  const [gender, setGender] = useState("");
  const [neutered, setNeutered] = useState("");
  const [weightUnit, setWeightUnit] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [dog_, setDog_] = useState(dog);

  const handleGender = (gender) => {
    gender = gender.toLowerCase();
    setGender(gender);
    setDog_({ ...dog_, gender });
  };

  const handleNeutered = (neutered) => {
    setNeutered(neutered);
    setDog_({ ...dog_, neutered });
  };

  const handleWeight = (weight) => {
    if(Number(weight) < 0) {
      setWeight(0);
      return;
    }
    setWeight(weight);
    setDog_({ ...dog_, weight });
  };

  const handleWeightUnit = (unit) => {
    setWeightUnit(unit);
    setDog_({ ...dog_, weight_unit: unit });
  };

  const handleBodyType = (body_type) => {
    setBodyType(body_type);
    setDog_({ ...dog_, body_type });
  };

  const handleActivityLevel = (activity_level) => {
    setActivityLevel(activity_level);
    setDog_({ ...dog_, activity_level });
    addDogsDetail({ ...dog_, activity_level });
  };
  return (
    <FormWrapper increaseSmallPadding>
      <div className="flex flex-col xs:pb-5 md:pb-10 pb-4">
        <label className="font-semibold pb-4">{dog && dog.name} is a</label>
        <div className="flex">
          {onboarding_details_data &&
            onboarding_details_data.genders &&
            onboarding_details_data.genders.map((item, idx) => (
              <input
                key={idx}
                type="button"
                value={item.label}
                onClick={(e) => handleGender(e.target.value)}
                className={
                  gender === item.label.toLowerCase()
                    ? "border cursor-pointer mr-3 border-green w-40 bg-green-600 md:text-white font-medium  focus:outline-none rounded-lg py-3"
                    : "border cursor-pointer mr-3 border-green w-40 bg-white text-green-600 md:text-green-600  focus:outline-none rounded-lg py-3"
                }
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col xs:pb-5 md:pb-10 pb-4">
        <label className="font-semibold pb-4">
          Is {dog && dog.name} spayed?
        </label>
        <div className="flex">
          {neutereds &&
            neutereds.map((item, idx) => (
              <input
                key={idx}
                type="button"
                value={item.label}
                onClick={(e) => handleNeutered(item.value)}
                className={
                  neutered === item.value
                    ? "border cursor-pointer mr-3 border-green w-40 bg-green-600 md:text-white font-medium  focus:outline-none rounded-lg py-3"
                    : "border cursor-pointer mr-3 border-green w-40 bg-white text-green-600 md:text-green-600  focus:outline-none rounded-lg py-3"
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
            className="border step-input mr-3 md:border-transparent-400 placeholder-black text-black bg-transparent w-20 text-center focus:outline-none rounded-lg py-3"
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
                    ? "border step-input mr-3 md:border-green-700-400 placeholder-white text-white bg-green-700 w-20 text-center focus:outline-none rounded-lg py-3"
                    : "border step-input mr-3 md:border-gray-400-400 placeholder-gray-700 text-gray-700 bg-gray-100 w-20 text-center focus:outline-none rounded-lg py-3"
                }
              />
            ))}
          {/* <button className="border step-input mr-3 md:border-green-700-400 placeholder-white text-white bg-green-700 w-20 text-center focus:outline-none rounded-lg py-3">
            lbs
          </button>
          <button className="border step-input mr-3 md:border-gray-400-400 placeholder-gray-700 text-gray-700 bg-gray-400 w-20 text-center focus:outline-none rounded-lg py-3">
            kg
          </button> */}
        </div>
      </div>

      <div className="flex flex-col xs:pb-5 md:pb-10 pb-4">
        <label className="font-semibold pb-4">
          {dog && dog.name}’s body is...
        </label>
        <div className="flex">
          <Steps
            steps={getBodyTypes()}
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
          <Steps
            steps={getActivityLevels()}
            value={activityLevel}
            setValue={handleActivityLevel}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

const Steps = ({ steps, value, setValue }) => (
  <div className="container">
    <div className="progress-container">
      <div className="progress" id="progress"></div>
      {steps &&
        steps.map((item, idx) => (
          <div className="relative" key={idx}>
            <div
              className={
                value === item.value
                  ? "circle cursor-pointer active"
                  : "circle cursor-pointer"
              }
              onClick={() => setValue(item.value)}
            />
            <p className="absolute xs:-left-1 -left-4 xs:mt-1 mt-2 text-sm">
              {item.label}
            </p>
          </div>
        ))}
    </div>
  </div>
);
