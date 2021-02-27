import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions, mealActions } from "../../actions";
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
      this.props.selectedCookedRecipes(this.props.tempDogId, food.recipe);
      return;
    }
    this.setState({ cookedRecipes: [...cookedRecipes, food.recipe] });
    this.props.selectedCookedRecipes(this.props.tempDogId, food.recipe);
  };

  handleSelectedKibbleRecipe = (food) => {
    const { kibble } = this.state;
    if (kibble && kibble.length > 0 && kibble.includes(food.recipe)) {
      let recipes = [...kibble];
      const index = recipes.indexOf(food.recipe);
      recipes.splice(index, 1);
      this.setState({ kibble: recipes });
      this.props.selectedKibble(this.props.tempDogId, food.recipe);
      return;
    }
    this.setState({ kibble: [...kibble, food.recipe] });
    this.props.selectedKibble(this.props.tempDogId, food.recipe);
  };

  render() {
    const { user, dog_ } = this.props;
    const { kibble, cookedRecipes } = this.state;

    return (
      <React.Fragment>
        <RecipeSelection
          user={user}
          dog={dog_}
          selectedDog={this.selectedDog}
          cookedRecipes={cookedRecipes}
          handleSelectedCookedRecipes={this.handleSelectedCookedRecipes}
          selectedCookedRecipes={this.state.cookedRecipes}
          handleSelectedKibbleRecipe={this.handleSelectedKibbleRecipe}
          kibble={kibble}
          toggleKibble={this.toggleKibble}
          isKibble={this.state.isKibble}
        />
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
