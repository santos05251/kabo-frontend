import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions, mealActions } from "../../actions";
import DailyDietPortion from "./shared/DailyDietPortion";
import RecipeSelection from "./shared/RecipeSelection";

class Recipes extends Component {
  state = {
    next: false,
    previous: true,
    selectedBox: false,
    cookedRecipes: [],
    kibble: [],
    isKibble: false,
    selectedPortion: false,
    estimate: false,
    dietPortion: {},
    dog: {},
    step: 0,
  };

  componentDidMount() {
    this.props.getRecipeData();
  }

  selectedDog = (dog) => {
    this.setState({ dog });
  };

  toggleKibble = () => {
    this.setState({ isKibble: !this.state.isKibble });
  };

  togglePortion = () => {
    this.setState({ selectedPortion: !this.state.selectedPortion });
  };

  selectedDietPortion = (diet) => {
    console.log(diet);
    this.setState({ dietPortion: diet });
  };

  handleSelectedCookedRecipes = (food) => {
    const { cookedRecipes } = this.state;
    if (
      cookedRecipes &&
      cookedRecipes.length > 0 &&
      cookedRecipes.includes(food.recipe)
    ) {
      let recipes = [...cookedRecipes];
      const index = recipes.indexOf(food.recipe);
      recipes.splice(index, 1);
      this.setState({ cookedRecipes: recipes });
      return;
    }
    this.setState({ cookedRecipes: [...cookedRecipes, food.recipe] });
  };

  handleSelectedKibbleRecipe = (food) => {
    const { kibble } = this.state;
    if (kibble && kibble.length > 0 && kibble.includes(food.recipe)) {
      let recipes = [...kibble];
      const index = recipes.indexOf(food.recipe);
      recipes.splice(index, 1);
      this.setState({ kibble: recipes });
      return;
    }
    this.setState({ kibble: [...kibble, food.recipe] });
  };

  handleNext = () => {
    const { cookedRecipes, kibble, dietPortion, dog } = this.state;
    const data = {
      dog_id: 454,
      chicken_recipe: false,
      lamb_recipe: false,
      turkey_recipe: false,
      beef_recipe: false,
    };
    if (kibble && kibble.length > 0) {
      data.kibble_recipe = kibble[0];
    } else {
      data.kibble_recipe = null;
    }

    for (let item of cookedRecipes) {
      data[`${item}_recipe`] = true;
    }
    console.log("Recipes data", data);
    //   this.props.getSubscriptionEstimate(data);
    this.props.selectedRecipes(data);

    //this.props.handleStep(this.props.step);
    // this.setState({ step: this.state.step + 1 });
  };

  handlePrevious = () => {
    this.setState({ step: this.state.step - 1 });
  };

  handleEstimate = () => {
    this.setState({ previous: false, next: false, estimate: true });
  };

  handleMealUpdate = () => {
    const { cookedRecipes, kibble, dietPortion, dog } = this.state;
    const data = {
      dog_id: dog.id,
      cooked_portion: dietPortion.cooked_portion || null,
      kibble_portion: dietPortion.kibble_portion || null,
      portion_adjusment: dietPortion.portion_adjusment || null,
    };
    if (kibble && kibble.length > 0) {
      data.kibble_recipe = kibble[0];
    }
    for (let item of cookedRecipes) {
      data[`${item}_recipe`] = true;
    }
    this.props.updateMealPlan(data);
  };

  render() {
    const { user, meal, step, getDailyDietPortion, dog_ } = this.props;
    const { cookedRecipes, kibble, dog, dietPortion, index } = this.state;

    // if (user.subLoading) return <LoadingCircle />;

    return (
      <React.Fragment>
        {step === 0 && (
          <RecipeSelection
            user={user}
            dog={dog_}
            selectedDog={this.selectedDog}
            cookedRecipes={this.state.cookedRecipes}
            handleSelectedCookedRecipes={this.handleSelectedCookedRecipes}
            selectedCookedRecipes={this.state.cookedRecipes}
            handleSelectedKibbleRecipe={this.handleSelectedKibbleRecipe}
            kibble={this.state.kibble}
            toggleKibble={this.toggleKibble}
            isKibble={this.state.isKibble}
          />
        )}

        {step > 0 && (
          <DailyDietPortion
            meal={meal}
            dog={dog_}
            cookedRecipes={cookedRecipes}
            dietPortion={this.state.dietPortion}
            selectedPortion={this.state.selectedPortion}
            togglePortion={this.togglePortion}
            selectedDietPortion={this.selectedDietPortion}
            getDailyDietPortion={getDailyDietPortion}
            kibbleRecipe={kibble}
          />
        )}

        <div className="w-full flex flex-col py-3 bg-white items-center fixed bottom-0">
          <div className="inline-flex">
            {step !== 0 && (
              <button
                onClick={this.handlePrevious}
                className="text-green-600 mr-2 focus:outline-none"
              >
                Previous
              </button>
            )}
            {step == 0 && (
              <button
                onClick={this.handleNext}
                disabled={
                  cookedRecipes &&
                  cookedRecipes.length === 0 &&
                  kibble &&
                  kibble.length === 0
                }
                className={
                  cookedRecipes.length === 0 && kibble.length === 0
                    ? "bg-gray-300 focus:outline-none text-white font-bold py-2 px-4 rounded"
                    : "bg-green-600 focus:outline-none text-white font-bold py-2 px-4 rounded"
                }
              >
                Next
              </button>
            )}
            {step > 0 && (
              <button
                onClick={this.handleNext}
                disabled={Object.keys(dietPortion).length <= 0}
                className={
                  cookedRecipes.length === 0 && kibble.length === 0
                    ? "bg-gray-300 focus:outline-none text-white font-bold py-2 px-4 rounded"
                    : "bg-green-600 focus:outline-none text-white font-bold py-2 px-4 rounded"
                }
              >
                Next
              </button>
            )}
            {this.state.estimate && (
              <button
                type="button"
                onClick={(e) => this.handleMealUpdate(e)}
                disabled={Object.keys(dietPortion).length <= 0}
                className={
                  Object.keys(dietPortion).length <= 0
                    ? "bg-gray-300 focus:outline-none text-white font-bold py-2 px-4 rounded"
                    : "bg-green-600 focus:outline-none hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                }
              >
                Submit
              </button>
            )}
          </div>
        </div>
        {/* {step == 0 && (
          <RecipeSelection
            selectedDog={this.selectedDog}
            cookedRecipes={this.state.cookedRecipes}
            handleSelectedCookedRecipes={this.handleSelectedCookedRecipes}
            selectedCookedRecipes={this.state.cookedRecipes}
            handleSelectedKibbleRecipe={this.handleSelectedKibbleRecipe}
            kibble={this.state.kibble}
            toggleKibble={this.toggleKibble}
            isKibble={this.state.isKibble}
          />
        )}
        {step > 0 && (
          <DailyDietPortion
            meal={meal}
            dog={dog}
            cookedRecipes={cookedRecipes}
            dietPortion={this.state.dietPortion}
            selectedPortion={this.state.selectedPortion}
            togglePortion={this.togglePortion}
            selectedDietPortion={this.selectedDietPortion}
            getDailyDietPortion={getDailyDietPortion}
            kibbleRecipe={kibble}
          />
        )}
        {step > 1 && (
          <ConfirmMeal
            dog={dog}
            user={user}
            open={true}
            cookedRecipes={cookedRecipes}
            index={this.props.match.params.id}
            subs={user.subscriptions}
            kibble={this.state.kibble}
            onClose={this.handlePrevious}
            dietPortion={this.state.dietPortion}
            estimate={user.estimate}
            onConfirm={(e) => this.handleMealUpdate(e)}
          />
        )}

        <div className="w-full flex flex-col py-3 bg-white items-center fixed bottom-0">
          <div className="inline-flex">
            {step !== 0 && (
              <button
                onClick={this.handlePrevious}
                className="text-green-600 mr-2 focus:outline-none"
              >
                Previous
              </button>
            )}
            {step == 0 && (
              <button
                onClick={this.handleNext}
                disabled={
                  cookedRecipes &&
                  cookedRecipes.length === 0 &&
                  kibble &&
                  kibble.length === 0
                }
                className={
                  cookedRecipes.length === 0 && kibble.length === 0
                    ? "bg-gray-300 focus:outline-none text-white font-bold py-2 px-4 rounded"
                    : "bg-green-600 focus:outline-none text-white font-bold py-2 px-4 rounded"
                }
              >
                Next
              </button>
            )}
            {step > 0 && (
              <button
                onClick={this.handleNext}
                disabled={Object.keys(dietPortion).length <= 0}
                className={
                  cookedRecipes.length === 0 && kibble.length === 0
                    ? "bg-gray-300 focus:outline-none text-white font-bold py-2 px-4 rounded"
                    : "bg-green-600 focus:outline-none text-white font-bold py-2 px-4 rounded"
                }
              >
                Next
              </button>
            )}
            {this.state.estimate && (
              <button
                type="button"
                onClick={(e) => this.handleMealUpdate(e)}
                disabled={Object.keys(dietPortion).length <= 0}
                className={
                  Object.keys(dietPortion).length <= 0
                    ? "bg-gray-300 focus:outline-none text-white font-bold py-2 px-4 rounded"
                    : "bg-green-600 focus:outline-none hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                }
              >
                Submit
              </button>
            )}
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAccountData: () => dispatch(userActions.getAccountData()),
  getRecipeData: () => dispatch(userActions.getRecipeData()),
  updateMealPlan: (payload) => dispatch(mealActions.updateMealPlan(payload)),
  getDailyDietPortion: (payload) =>
    dispatch(mealActions.getDailyDietPortion(payload)),
  getSubscriptionData: () => dispatch(userActions.getSubscriptionData()),
  getSubscriptionEstimate: (data) =>
    dispatch(userActions.getSubscriptionEstimate(data)),
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
    meal: state.meal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);

// class DogRecipeSelector extends Component {
//   render() {
//     const {
//       user,
//       kibble,
//       toggleKibble,
//       isKibble,
//       selectedDog,
//       cookedRecipes,
//       handleSelectedCookedRecipes,
//       selectedCookedRecipes,
//       handleSelectedKibbleRecipe,
//     } = this.props;
//     return (
//       <React.Fragment>
//         <RecipeSelection
//           user={user}
//           selectedDog={selectedDog}
//           cookedRecipes={cookedRecipes}
//           handleSelectedCookedRecipes={handleSelectedCookedRecipes}
//           selectedCookedRecipes={cookedRecipes}
//           handleSelectedKibbleRecipe={handleSelectedKibbleRecipe}
//           kibble={kibble}
//           toggleKibble={toggleKibble}
//           isKibble={isKibble}
//         />
//       </React.Fragment>
//     );
//   }
// }
