import React, { Component } from "react";
import { connect } from "react-redux";
import { onboardingActions } from "../../../actions";
import Header from "../../../components/onboardings/header";
import Steps from "../../../components/onboardings/steps";
import FirstStep from "../step-1";
import SecondStep from "../step-2";
import ThirdStep from "../step-3";
import FourthStep from "../step-4";
import FifthStep from "../step-5";

class Onboarding extends Component {
  state = {
    step: 1,
    dogs: [],
    dogs_detail: [],
    cookedRecipes: {},
    kibble: {},
    dietPortions: [],
    user: {},
    couponPercentage: 0
  };

  componentDidMount() {
    if (this.props.location.search.startsWith('?')) {
      const strQuery = this.props.location.search.slice(1);
      const queryParams = strQuery.split('&');
      for (var param of queryParams) {
        if (param.endsWith('off'))
          this.setState({ couponPercentage: param.slice(0, param.length - 3) });
      }
    }
    this.props.getOnboardingData();
  }

  updateDog = (dog) => {
    const { dogs } = this.state;
    
    var bNew = true;
    for (let i in dogs) {
      if (dogs[i].index == dog.index) {
        dogs[i] = dog;
        this.setState({ dogs })

        bNew = false;
        break;
      }
    }
    if (bNew)
      this.setState({ dogs: [...dogs, dog] });
  };

  updateDogDetail = (dog) => {
    let dogs = this.state.dogs_detail;
    
    var bNew = true;
    for (let i in dogs) {
      if (dogs[i].index == dog.index) {
        dogs[i] = dog;
        this.setState({ dogs_detail: dogs });

        bNew = false;
        break;
      }
    }
    if (bNew)
      this.setState({ dogs_detail: [...dogs, dog] });
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
    this.setState({ step: this.state.step + 1, dogs_detail: [] });
  };

  // This function is for selecting cooked food recipes
  selectedCookedRecipes = (dogId, recipe) => {
    const { cookedRecipes } = this.state;
    
    if (cookedRecipes[dogId] != undefined) {
      let recipes = cookedRecipes[dogId];
      const recipeIndex = recipes.indexOf(recipe);
      if (recipeIndex >= 0) {
        recipes.splice(recipeIndex, 1);
      }
      else {
        recipes.push(recipe);
      }
      cookedRecipes[dogId] = recipes;

      this.setState({ cookedRecipes });
      return;
    }

    cookedRecipes[dogId] = [recipe];

    this.setState({ cookedRecipes });
  };

  // This step is for selecting Kibble Recipe
  selectedKibble = (dogId, kibble_) => {
    const { kibble } = this.state;
    
    if(kibble[dogId] != undefined) {
      kibble[dogId] = undefined;
      this.setState({ kibble });
      return;
    }

    kibble[dogId] = kibble_;

    this.setState({ kibble });
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
    for (let i = 0; i < this.props.temp_user.temp_dog_ids.length; i++) {
      const dogId = this.props.temp_user.temp_dog_ids[i];
      dogs.push({
        id: dogId,
        cooked_recipes: cookedRecipes[dogId] == undefined ? []: cookedRecipes[dogId],
        kibble_recipe: kibble[dogId] == undefined ? null : kibble[dogId]
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
    const { dogs, dogs_detail, step, cookedRecipes, kibble, dietPortions } = this.state;
    const {
      onboarding_starter_data,
      getOnboardingDetails,
      onboarding_details_data,
      dogs: selectedDogs,
      temp_user,
    } = this.props;
    return (
      <React.Fragment>
        <Header
          coupon={this.state.couponPercentage}
        />
        {4 > step && <Steps completePercent={`${step}/3`} />}
        <main className="flex flex-col justify-between sm:px-4 sm:py-5 px-3 py-4">
          {step === 1 && (
            <FirstStep
              onboarding_starter_data={onboarding_starter_data}
              updateDog={this.updateDog}
            />
          )}
          {step === 2 && (
            <SecondStep
              selectedDogs={selectedDogs}
              updateDogDetail={this.updateDogDetail}
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
              separateVersion
            />
          )}
          {step === 4 && (
            <FourthStep
              temp_user={temp_user}
              diet_portions={this.props.diet_portions}
              getDogDietPortion={this.props.getDogDietPortion}
              dietPortions={dietPortions}
              handleDietPortion={this.handleDietPortion}
              separateVersion
              
              cookedRecipes={cookedRecipes}
              kibbleRecipes={kibble}
            />
          )}
          {step === 5 && (
            <FifthStep
              handleChange={this.handleChange}
              selectedDogs={selectedDogs}
              user={this.state.user}
            />
          )}
        </main>
        <div className="h-20" />

        <div className="fixed inset-x-0 bottom-0 h-20 footer border-t bg-white flex justify-center py-4 z-100">
            {step === 1 && (
              <button
                disabled={dogs.length <= 0 || !dogs.every(dog => dog.name != undefined && dog.breed != undefined && dog.age_in_months != undefined && dog.name !== '' && dog.breed >= 0 && dog.age_in_months >= 0) }
                onClick={this.handleFirstStep}
                className={
                  dogs.length <= 0 || !dogs.every(dog => dog.name != undefined && dog.breed != undefined && dog.age_in_months != undefined && dog.name !== '' && dog.breed >= 0 && dog.age_in_months >= 0)
                    ? "flex justify-center items-center border btn mx-5 border-gray-300 xs:bg-green-600 xs:text-white md:bg-gray-200 md:text-gray-400  focus:outline-none rounded-lg py-3 px-20"
                    : "flex justify-center items-center border btn mx-5 border-green-600 xs:bg-green-600 xs:text-white md:bg-green-600 md:text-white  focus:outline-none rounded-lg py-3 px-20"
                }
              >
                Next
              </button>
            )}
            {step === 2 && (
              <button
                disabled={dogs_detail.length <= 0 || !dogs_detail.every(dog => dog.gender != undefined && dog.ovary != undefined && dog.weight_unit != undefined && dog.weight != undefined && dog.body_type != undefined && dog.activity_level != undefined && dog.weight_unit != '' && Number(dog.weight) >= 0 && dog.body_type >= 0 && dog.activity_level >= 0) }
                onClick={this.handleSecondStep}
                className={
                  dogs_detail.length <= 0 || !dogs_detail.every(dog => dog.gender != undefined && dog.ovary != undefined && dog.weight_unit != undefined && dog.weight != undefined && dog.body_type != undefined && dog.activity_level != undefined && dog.weight_unit != '' && Number(dog.weight) >= 0 && dog.body_type >= 0 && dog.activity_level >= 0)
                    ? "flex justify-center items-center border btn mx-5 border-gray-300 xs:bg-green-600 xs:text-white md:bg-gray-200 md:text-gray-400  focus:outline-none rounded-lg py-3 px-20"
                    : "flex justify-center items-center border btn mx-5 border-green-600 xs:bg-green-600 xs:text-white md:bg-green-600 md:text-white  focus:outline-none rounded-lg py-3 px-20"
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
                    ? "flex justify-center items-center border btn mx-5 border-gray-300 xs:bg-green-600 xs:text-white md:bg-gray-200 md:text-gray-400  focus:outline-none rounded-lg py-3 px-20"
                    : "flex justify-center items-center border btn mx-5 border-green-600 xs:bg-green-600 xs:text-white md:bg-green-600 md:text-white  focus:outline-none rounded-lg py-3 px-20"
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
                    ? "flex justify-center items-center border btn mx-5 border-gray-300 xs:bg-green-600 xs:text-white md:bg-gray-200 md:text-gray-400  focus:outline-none rounded-lg py-3 px-20"
                    : "flex justify-center items-center border btn mx-5 border-green-600 xs:bg-green-600 xs:text-white md:bg-green-600 md:text-white  focus:outline-none rounded-lg py-3 px-20"
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
                    ? "flex justify-center items-center border btn mx-5 border-gray-300 xs:bg-green-600 xs:text-white md:bg-gray-200 md:text-gray-400  focus:outline-none rounded-lg py-3 px-20"
                    : "flex justify-center items-center border btn mx-5 border-green-600 xs:bg-green-600 xs:text-white md:bg-green-600 md:text-white  focus:outline-none rounded-lg py-3 px-20"
                }
              >
                Next
              </button>
            )}
          </div>
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
