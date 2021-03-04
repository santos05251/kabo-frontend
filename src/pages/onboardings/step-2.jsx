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
  dogDetails,
  updateDog,
  getBodyTypes,
  getActivityLevels,
  onboarding_details_data,
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

  const [gender, setGender] = useState(false);
  const [ovary, setOvary] = useState("");
  const [weightUnit, setWeightUnit] = useState(units[0].value);
  const [weight, setWeight] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [dog, setDog] = useState({ ...dogDetails, weight_unit: units[0].value });

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
                    ? "border cursor-pointer mr-3 mb-2 border-green w-32 bg-green-600 md:text-white font-medium  focus:outline-none rounded-lg py-3"
                    : "border cursor-pointer mr-3 mb-2 border-green w-32 bg-white text-green-600 md:text-green-600  focus:outline-none rounded-lg py-3"
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
                    ? "border cursor-pointer mr-3 mb-2 border-green w-32 bg-green-600 md:text-white font-medium  focus:outline-none rounded-lg py-3"
                    : "border cursor-pointer mr-3 mb-2 border-green w-32 bg-white text-green-600 md:text-green-600  focus:outline-none rounded-lg py-3"
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
                    ? "border step-input mr-3 mb-2 md:border-green-700 placeholder-white text-white bg-green-700 border-0 w-20 text-center focus:outline-none rounded-lg py-3"
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
    <div className="flex flex-wrap">
      {steps &&
        steps.map((item, idx) => (
          <input
            key={idx}
            type="button"
            value={item.label}
            onClick={() => setValue(item.value)}
            className={
              value === item.value
                ? "w-32 border cursor-pointer mr-3 mb-2 border-green bg-green-600 text-white font-medium  focus:outline-none rounded-lg py-3"
                : "w-32 border cursor-pointer mr-3 mb-2 border-green bg-white text-green-600 focus:outline-none rounded-lg py-3"
            }
          />
        ))}
    </div>
  </div>
);
