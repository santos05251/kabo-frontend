import React, { Component } from "react";
import { connect } from "react-redux";
import { onboardingActions } from "../../actions";
import Header from "../../components/onboardings/header";
import Steps from "../../components/onboardings/steps";
import FirstStep from "./step-1";
import SecondStep from "./step-2";
import ThirdStep from "./step-3";
import FourthStep from "./step-4";
import FifthStep from "./step-5";

class Onboarding extends Component {
  state = {
    step: 1,
    dogs: [],
    dogs_detail: [],
    cookedRecipes: [],
    kibble: [],
    dietPortions: [],
    user: {},
  };

  componentDidMount() {
    this.props.getOnboardingData();
  }

  addDogs = (dog) => {
    this.setState({ dogs: [...this.state.dogs, dog] });
  };

  addDogsDetail = (dog) => {
    this.setState({ dogs_detail: [...this.state.dogs_detail, dog] });
  };

  handleChange = (key, value) => {
    let user = { ...this.state.user };
    user[key] = value;
    this.setState({ user });
  };

  // This function is for step 1
  handleFirstStep = () => {
    const data = {
      step: "start",
      dogs: this.state.dogs,
    };
    localStorage.setItem("dogs", JSON.stringify(data));
    this.props.getDogsFromForm(data);
    this.props.creatingTempUser(data);
    this.setState({ step: this.state.step + 1, dogs: [] });
  };

  // This function is for step 2
  handleSecondStep = () => {
    let dogs = this.state.dogs_detail;
    dogs.map((item, idx) => {
      return (item["id"] = this.props.temp_user.temp_dog_ids[idx]);
    });
    const data = {
      id: this.props.temp_user.temp_user_id,
      details: {
        step: "detail",
        dogs,
      },
    };
    localStorage.setItem("dogs_detail", JSON.stringify(data.details));
    this.props.updateTempUser(data);
    this.setState({ step: this.state.step + 1 });
  };

  // This function is for selecting cooked food recipes
  selectedCookedRecipes = (dogId, recipe) => {
    const { cookedRecipes } = this.state;
    let sub_array = [];
    if (cookedRecipes && cookedRecipes.length > 0) {
      for (let i = 0; i < cookedRecipes.length; i++) {
        if (cookedRecipes[i].includes(dogId)) {
          sub_array = cookedRecipes[i];
        }
      }
    }

    if (sub_array.includes(dogId) && sub_array.includes(recipe)) {
      const array_index = cookedRecipes.indexOf(sub_array);
      let recipes = [...sub_array];
      const index = recipes.indexOf(recipe);
      recipes.splice(index, 1);
      cookedRecipes[array_index] = recipes;
      this.setState({ cookedRecipes });
      return;
    }

    if (sub_array.includes(dogId) && !sub_array.includes(recipe)) {
      const array_index = cookedRecipes.indexOf(sub_array);
      let recipes = [...sub_array];
      recipes.push(recipe);
      cookedRecipes[array_index] = recipes;
      this.setState({ cookedRecipes });
      return;
    }

    this.setState({
      cookedRecipes: [...this.state.cookedRecipes, [dogId, recipe]],
    });
  };

  // This step is for selecting Kibble Recipe
  selectedKibble = (dogId, kibble_) => {
    const { kibble } = this.state;
    let temp = {};
    if (kibble && kibble.length > 0) {
      for (let i = 0; i < kibble.length; i++) {
        if (kibble[i]["id"] === dogId) {
          temp = kibble[i];
        }
      }
    }

    if (temp["id"] === dogId) {
      const index = kibble.indexOf(temp);
      kibble.splice(index, 1);
      this.setState({ kibble });
      return;
    }

    this.setState({
      kibble: [...this.state.kibble, { id: dogId, kibble: kibble_ }],
    });
  };

  // This function is for getting diet portions
  handleDietPortion = (dogId, diet_portion) => {
    const { dietPortions } = this.state;
    let temp = {};
    if (dietPortions && dietPortions.length > 0) {
      for (let i = 0; i < dietPortions.length; i++) {
        if (dietPortions[i]["id"] === dogId) {
          temp = dietPortions[i];
        }
      }
    }

    if (temp["id"] === dogId) {
      const index = dietPortions.indexOf(temp);
      temp["diet"] = diet_portion;
      dietPortions[index] = temp;
      this.setState({ dietPortions });
      return;
    }

    this.setState({
      dietPortions: [
        ...this.state.dietPortions,
        { id: dogId, diet: diet_portion },
      ],
    });
  };

  // This function for Third Step (Recipes Selection)
  handleThirdStep = () => {
    const { cookedRecipes, kibble } = this.state;

    let dogs = [];
    for (let i = 0; i < cookedRecipes.length; i++) {
      if (cookedRecipes[i].length === 1) {
        return;
      }
      let [id] = cookedRecipes[i].filter((item) => typeof item === "number");
      let recipes = cookedRecipes[i].filter((item) => typeof item === "string");
      dogs.push({
        id: id,
        cooked_recipes: recipes,
        kibble_recipe:
          kibble[i] && kibble[i].hasOwnProperty("kibble")
            ? kibble[i]["kibble"]
            : null,
      });
    }
    const data = {
      id: this.props.temp_user.temp_user_id,
      details: {
        step: "recipes",
        dogs: dogs,
      },
    };

    this.props.updateTempUser(data);
    this.setState({ step: this.state.step + 1 });
  };

  handleFourthStep = () => {
    const { dietPortions } = this.state;
    let dogs = [];
    for (let i = 0; i < dietPortions.length; i++) {
      dogs.push({ id: dietPortions[i]["id"], diet: dietPortions[i]["diet"] });
    }
    let data = {
      id: this.props.temp_user.temp_user_id,
      details: {
        step: "portions",
        plan_interval: 2,
        dogs: [],
      },
    };
    for (let i = 0; i < dogs.length; i++) {
      let obj = {
        id: dogs[i]["id"],
        cooked_portion: dogs[i]["diet"]["cooked_portion"],
      };
      if (dogs[i]["diet"] && dogs[i]["diet"]["kibble_portion"]) {
        obj["kibble_portion"] = dogs[i]["diet"]["kibble_portion"];
      }
      data.details.dogs.push(obj);
    }
    this.props.updateTempUser(data);
    this.setState({ step: this.state.step + 1 });
  };

  handleFifthStep = () => {
    const { user } = this.state;
    const data = {
      id: this.props.temp_user.temp_user_id,
      details: {
        step: "account",
        first_name: user.first_name,
        email: user.email,
      },
    };
    this.props.updateTempUser(data);
    this.props.history.push("/onboarding/checkout");
  };

  render() {
    const { dogs, step, cookedRecipes, kibble, dietPortions } = this.state;
    const {
      onboarding_starter_data,
      getOnboardingDetails,
      onboarding_details_data,
      dogs: selectedDogs,
      temp_user,
    } = this.props;
    return (
      <React.Fragment>
        <Header />
        {4 > step && <Steps completePercent={`${step}/3`} />}
        <main className="h-full flex flex-col justify-between">
          {step === 1 && (
            <FirstStep
              onboarding_starter_data={onboarding_starter_data}
              addDogs={this.addDogs}
            />
          )}
          {step === 2 && (
            <SecondStep
              selectedDogs={selectedDogs}
              addDogsDetail={this.addDogsDetail}
              getOnboardingDetails={getOnboardingDetails}
              onboarding_details_data={onboarding_details_data}
            />
          )}

          {step === 3 && (
            <ThirdStep
              temp_user={temp_user}
              selectedDogs={selectedDogs}
              selectedKibble={this.selectedKibble}
              selectedCookedRecipes={this.selectedCookedRecipes}
              getting_diet_portion={this.props.getting_diet_portion}
              diet_portions={this.props.diet_portions}
              getDogDietPortion={this.props.getDogDietPortion}
              dietPortions={dietPortions}
              handleDietPortion={this.handleDietPortion}
            />
          )}
          {step === 4 && (
            <FourthStep
              temp_user={temp_user}
              getting_diet_portion={this.props.getting_diet_portion}
              diet_portions={this.props.diet_portions}
              getDogDietPortion={this.props.getDogDietPortion}
              dietPortions={dietPortions}
              handleDietPortion={this.handleDietPortion}
            />
          )}
          {step === 5 && (
            <FifthStep
              handleChange={this.handleChange}
              user={this.state.user}
            />
          )}
          <div className="footer bg-white flex justify-center py-4">
            {step === 1 && (
              <button
                disabled={dogs.length <= 0}
                onClick={this.handleFirstStep}
                className={
                  dogs.length <= 0
                    ? "border btn mx-5 border-gray-300 xs:bg-green-600 xs:text-white md:bg-gray-200 md:text-gray-400  focus:outline-none rounded-lg py-3 px-20"
                    : "border btn mx-5 border-green-600 xs:bg-green-600 xs:text-white md:bg-green-600 md:text-white  focus:outline-none rounded-lg py-3 px-20"
                }
              >
                Next
              </button>
            )}
            {step === 2 && (
              <button
                onClick={this.handleSecondStep}
                className={
                  "border btn mx-5 border-green-600 xs:bg-green-600 xs:text-white md:bg-green-600 md:text-white  focus:outline-none rounded-lg py-3 px-20"
                }
              >
                Next
              </button>
            )}

            {step === 3 && (
              <button
                disabled={cookedRecipes.length === 0 && kibble.length === 0}
                onClick={this.handleThirdStep}
                className={
                  cookedRecipes.length === 0 && kibble.length === 0
                    ? "border btn mx-5 border-gray-300 xs:bg-green-600 xs:text-white md:bg-gray-200 md:text-gray-400  focus:outline-none rounded-lg py-3 px-20"
                    : "border btn mx-5 border-green-600 xs:bg-green-600 xs:text-white md:bg-green-600 md:text-white  focus:outline-none rounded-lg py-3 px-20"
                }
              >
                Next
              </button>
            )}
            {step === 4 && (
              <button
                disabled={this.state.dietPortions.length <= 0}
                onClick={this.handleFourthStep}
                className={
                  this.state.dietPortions.length <= 0
                    ? "border btn mx-5 border-gray-300 xs:bg-green-600 xs:text-white md:bg-gray-200 md:text-gray-400  focus:outline-none rounded-lg py-3 px-20"
                    : "border btn mx-5 border-green-600 xs:bg-green-600 xs:text-white md:bg-green-600 md:text-white  focus:outline-none rounded-lg py-3 px-20"
                }
              >
                Next
              </button>
            )}

            {step === 5 && (
              <button
                disabled={Object.keys(this.state.user).length <= 0}
                onClick={this.handleFifthStep}
                className={
                  Object.keys(this.state.user).length <= 0
                    ? "border btn mx-5 border-gray-300 xs:bg-green-600 xs:text-white md:bg-gray-200 md:text-gray-400  focus:outline-none rounded-lg py-3 px-20"
                    : "border btn mx-5 border-green-600 xs:bg-green-600 xs:text-white md:bg-green-600 md:text-white  focus:outline-none rounded-lg py-3 px-20"
                }
              >
                Next
              </button>
            )}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOnboardingData: () => dispatch(onboardingActions.getOnboardingData()),
  getDogsFromForm: (payload) =>
    dispatch(onboardingActions.getDogsFromForm(payload)),
  getOnboardingDetails: () =>
    dispatch(onboardingActions.getOnboardingDetails()),
  creatingTempUser: (payload) =>
    dispatch(onboardingActions.createTempUser(payload)),
  updateTempUser: (payload) =>
    dispatch(onboardingActions.updateTempUser(payload)),

  addDogRecipes: (payload) =>
    dispatch(onboardingActions.addDogRecipes(payload)),

  getDogDietPortion: (payload) =>
    dispatch(onboardingActions.getDogDietPortion(payload)),
});

function mapStateToProps(state) {
  return {
    onboarding_starter_data: state.onboarding.onboarding_starter_data,
    onboarding_details_data: state.onboarding.onboarding_details_data,
    dogs: state.onboarding.dogs,
    temp_user: state.onboarding.temp_user,
    getting_diet_portion: state.onboarding.getting_diet_portion,
    diet_portions: state.onboarding.diet_portions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
