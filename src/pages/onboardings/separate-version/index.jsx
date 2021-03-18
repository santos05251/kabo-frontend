import React, { Component } from "react";
import { connect } from "react-redux";
import { onboardingActions } from "../../../actions";
import Header from "../../../components/onboardings/header";
import Steps from "../../../components/onboardings/steps";
import StartStep from "../steps/start";
import DetailStep from "../steps/details";
import RecipeStep from "../steps/recipe";
import PortionStep from "../steps/portion";
import UserStep from "../steps/user";
import LoadingCircle from "../../../components/partials/loading";
import qs from 'qs';

class OnboardingSeparateVersion extends Component {
  state = {
    step: 1,
    dogs: [],
    cookedRecipes: {},
    kibble: {},
    dietPortions: {},
    user: {},
    couponPercentage: 0
  };

  componentDidMount() {
    const params = qs.parse(this.props.location.search.slice(1));
    for (let key in params) {
      if (key.endsWith('off')) {
        this.setState({ couponPercentage: key.slice(0, key.length - 3) });
        break;
      }
    }
  }

  componentWillReceiveProps(newProps) {
    const { temp_user } = newProps;
    if (temp_user.checkout_token) {
      this.props.history.push("/checkout/" + temp_user.checkout_token);
    }
  }

  handlePrevious = () => {
    let { step } = this.state;
    step = step - 1;
    this.saveDogsData();
    this.setState({step});
  }

  saveDogsData = () => {
    const { dogs } = this.state;
    const data = {
      dogs
    };
    localStorage.setItem("dogs_data", JSON.stringify(data));
    this.props.getDogsFromForm(data);
  }

  updateDog = (dog) => {
    const { dogs } = this.state;
    var bNew = true;
    for (let i in dogs) {
      if (dogs[i].index == dog.index) {
        dogs[i] = dog;
        this.setState({ dogs });
        bNew = false;
        break;
      }
    }
    if (bNew)
      this.setState({ dogs: [...dogs, dog] });
  };

  removeDog = (index) => {
    let { dogs } = this.state;
    for (let i in dogs) {
      if (dogs[i].index === index) {
        dogs.splice(i, 1);
        this.setState({dogs});
        break;
      }
    }
  };

  handleStartStep = () => {
    this.saveDogsData();
    const { dogs } = this.state;
    let start_dogs = [];
    dogs.map(item => {
      start_dogs.push({
        ...item,
        breed: item.breed ? item.breed.label : '',
        age_in_months: item.age ? item.age.value : ''
      });
    });
    const data = {
      step: "start",
      dogs: start_dogs
    };
    this.props.createTempUser(data);
    this.setState({ step: this.state.step + 1 });
  };

  updateDogDetail = (dog) => {
    let { dogs } = this.state;
    var bNew = true;
    for (let i in dogs) {
      if (dogs[i].index == dog.index) {
        dogs[i] = dog;
        this.setState({ dogs });
        bNew = false;
        break;
      }
    }
    if (bNew)
      this.setState({ dogs: [...dogs, dog] });
  };

  handleDetailStep = () => {
    this.saveDogsData();
    const { dogs } = this.state;
    let detail_dogs = [];
    dogs.map((item, idx) => {
      detail_dogs.push({
        ...item,
        id: this.props.temp_user.temp_dog_ids[idx],
        neutered: item["ovary"],
        gender: item.gender ? "male" : "female"
      });
    });
    const data = {
      id: this.props.temp_user.temp_user_id,
      details: {
        step: "detail",
        dogs: detail_dogs
      }
    };
    this.props.updateTempUser(data);
    this.setState({ step: this.state.step + 1 });
  };

  handleSelectedCookedRecipes = (dogId, recipe) => {
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

  handleSelectedKibbleRecipe = (dogId, _kibble) => {
    let { kibble } = this.state;
    if(kibble[dogId] != undefined) {
      kibble[dogId] = undefined;
      this.setState({ kibble });
      return;
    }
    kibble[dogId] = _kibble;
    this.setState({ kibble });
  };

  handleDietPortion = (dogId, diet_portion) => {
    const { dietPortions } = this.state;
    dietPortions[dogId] = diet_portion;
    this.setState({ dietPortions });
  };

  // Separate version: Recipe
  handleRecipeStep = () => {
    const { cookedRecipes, kibble } = this.state;
    let dogs = [];
    this.props.temp_user.temp_dog_ids.map(dogId => {
      dogs.push({
        id: dogId,
        cooked_recipes: cookedRecipes[dogId] == undefined ? []: cookedRecipes[dogId],
        kibble_recipe: kibble[dogId] == undefined ? null : kibble[dogId]
      });
    });
    const data = {
      id: this.props.temp_user.temp_user_id,
      details: {
        step: "recipes",
        dogs: dogs
      }
    };
    this.props.updateTempUser(data);
    this.setState({ step: this.state.step + 1 });
  };

  handlePortionStep = () => {
    const { dietPortions } = this.state;

    let dogs = [];
    this.props.temp_user.temp_dog_ids.map(dogId => {
      let dog = { id: dogId };
      if (dietPortions[dogId].kibble_portion)
        dog["kibble_portion"] = dietPortions[dogId].kibble_portion;
      if (dietPortions[dogId].cooked_portion)
        dog["cooked_portion"] = dietPortions[dogId].cooked_portion;
      dogs.push(dog)
    });

    const data = {
      id: this.props.temp_user.temp_user_id,
      details: {
        step: "portions",
        dogs
      }
    };
    this.props.updateTempUser(data);
    this.setState({ step: this.state.step + 1 });
  };

  handleUserChange = (key, value) => {
    let user = { ...this.state.user };
    user[key] = value;
    this.setState({ user });
  };

  handleUserStep = () => {
    const { user, couponPercentage } = this.state;
    const data = {
      id: this.props.temp_user.temp_user_id,
      details: {
        step: "account",
        first_name: user.first_name ? user.first_name: '',
        email: user.email ? user.email : '',
        referral_code: Number(couponPercentage) <= 0 ? null : '40off'
      }
    };
    localStorage.setItem("account", JSON.stringify(data));
    this.props.updateTempUser(data);
  };

  render() {
    const { dogs, step, cookedRecipes, kibble, dietPortions } = this.state;
    const {
      dogs: selectedDogs,
      temp_user,
      updating_temp_user
    } = this.props;

    return (
      <React.Fragment>
        <Header
          coupon={this.state.couponPercentage}
        />
        <Steps completePercent={`${step}/5`} />
        <main className="flex flex-col justify-between sm:px-4 sm:py-5 px-3 py-4">
          { temp_user &&
            updating_temp_user &&
            <LoadingCircle />
          }
          {step === 1 && (
            <StartStep
              updateDog={this.updateDog}
              removeDog={this.removeDog}
            />
          )}
          {step === 2 && (
            <DetailStep
              updateDogDetail={this.updateDogDetail}
            />
          )}

          {step === 3 && (
            <RecipeStep
              selectedDogs={selectedDogs}
              handleSelectedKibbleRecipe={this.handleSelectedKibbleRecipe}
              handleSelectedCookedRecipes={this.handleSelectedCookedRecipes}
              separateVersion
              cookedRecipes={cookedRecipes}
              kibbleRecipes={kibble}
            />
          )}
          {step === 4 && (
            <PortionStep
              cookedRecipes={cookedRecipes}
              kibbleRecipes={kibble}
              handleDietPortion={this.handleDietPortion}
              separateVersion
              dietPortions={dietPortions}
            />
          )}
          {step === 5 && (
            <UserStep
              handleUserChange={this.handleUserChange}
              selectedDogs={selectedDogs}
              user={this.state.user}
            />
          )}
        </main>
        <div className="h-20" />

        <div className="fixed inset-x-0 bottom-0 h-20 footer border-t bg-white flex justify-center py-4 z-50">
            {step > 1 && (
              <button
                onClick={this.handlePrevious}
                className="flex justify-center items-center border btn mx-5 border-green text-green-600 focus:outline-none rounded-lg py-3 px-20"
              >
                Prev
              </button>
            )}
            {step === 1 && (
              <button
                disabled={ dogs.length <= 0 || !dogs.every(dog => dog.name != undefined && dog.breed != undefined && dog.age != undefined && dog.name !== '' && dog.breed.label != '' && dog.age.value >= 0) }
                onClick={this.handleStartStep}
                className={
                  dogs.length <= 0 || !dogs.every(dog => dog.name != undefined && dog.breed != undefined && dog.age != undefined && dog.name !== '' && dog.breed.label != '' && dog.age.value >= 0)
                    ? "flex justify-center items-center border btn mx-5 border-gray-300 bg-gray-200 text-gray-400 focus:outline-none rounded-lg py-3 px-20"
                    : "flex justify-center items-center border btn mx-5 border-green-600 bg-green-600 text-white focus:outline-none rounded-lg py-3 px-20"
                }
              >
                Next
              </button>
            )}
            {step === 2 && (
              <button
                disabled={ dogs.length <= 0 || !dogs.every(dog => dog.gender != undefined && dog.ovary != undefined && dog.weight_unit != undefined && dog.weight != undefined && dog.body_type != undefined && dog.activity_level != undefined && dog.weight_unit != '' && Number(dog.weight) > 0 && dog.body_type >= 0 && dog.activity_level >= 0) }
                onClick={this.handleDetailStep}
                className={
                  dogs.length <= 0 || !dogs.every(dog => dog.gender != undefined && dog.ovary != undefined && dog.weight_unit != undefined && dog.weight != undefined && dog.body_type != undefined && dog.activity_level != undefined && dog.weight_unit != '' && Number(dog.weight) > 0 && dog.body_type >= 0 && dog.activity_level >= 0)
                    ? "flex justify-center items-center border btn mx-5 border-gray-300 bg-gray-200 text-gray-400 focus:outline-none rounded-lg py-3 px-20"
                    : "flex justify-center items-center border btn mx-5 border-green-600 bg-green-600 text-white focus:outline-none rounded-lg py-3 px-20"
                }
              >
                Next
              </button>
            )}

            {step === 3 && (
              <button
                disabled={!temp_user.temp_dog_ids.every(dogId => (cookedRecipes[dogId] != undefined ? cookedRecipes[dogId].length : 0) + (kibble[dogId] != undefined ? 1 : 0) > 0)}
                onClick={this.handleRecipeStep}
                className={
                  !temp_user.temp_dog_ids.every(dogId => (cookedRecipes[dogId] != undefined ? cookedRecipes[dogId].length : 0) + (kibble[dogId] != undefined ? 1 : 0) > 0)
                    ? "flex justify-center items-center border btn mx-5 border-gray-300 bg-gray-200 text-gray-400 focus:outline-none rounded-lg py-3 px-20"
                    : "flex justify-center items-center border btn mx-5 border-green-600 bg-green-600 text-white focus:outline-none rounded-lg py-3 px-20"
                }
              >
                Next
              </button>
            )}
            {step === 4 && (
              <button
                disabled= {!temp_user.temp_dog_ids.every(dogId => dietPortions[dogId] != undefined)}
                onClick={this.handlePortionStep}
                className={
                  !temp_user.temp_dog_ids.every(dogId => dietPortions[dogId] != undefined)
                    ? "flex justify-center items-center border btn mx-5 border-gray-300 bg-gray-200 text-gray-400 focus:outline-none rounded-lg py-3 px-20"
                    : "flex justify-center items-center border btn mx-5 border-green-600 bg-green-600 text-white focus:outline-none rounded-lg py-3 px-20"
                }
              >
                Next
              </button>
            )}

            {step === 5 && (
              <button
                onClick={this.handleUserStep}
                className="flex justify-center items-center border btn mx-5 border-green-600 bg-green-600 text-white focus:outline-none rounded-lg py-3 px-20"
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
  getDogsFromForm: (payload) =>
    dispatch(onboardingActions.getDogsFromForm(payload)),
  createTempUser: (payload) =>
    dispatch(onboardingActions.createTempUser(payload)),
  updateTempUser: (payload) =>
    dispatch(onboardingActions.updateTempUser(payload))
});

function mapStateToProps(state) {
  return {
    dogs: state.onboarding.dogs,
    temp_user: state.onboarding.temp_user,
    updating_temp_user: state.onboarding.updating_temp_user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingSeparateVersion);
