import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import RecipeSelection from "./recipe-selection";

class Recipes extends Component {
  state = {
    cookedRecipes: [],
    kibble: []
  };

  componentDidMount() {
    this.props.getRecipeData();

    const { cookedRecipes, kibbleRecipes } = this.props;
    this.setState({cookedRecipes, kibble: kibbleRecipes});
  }

  handleSelectedCookedRecipes = (food) => {
    const { cookedRecipes } = this.state;
    if (cookedRecipes && cookedRecipes.length > 0 && cookedRecipes.includes(food.recipe) ) {
      let recipes = [...cookedRecipes];
      const index = recipes.indexOf(food.recipe);
      recipes.splice(index, 1);
      this.setState({ cookedRecipes: recipes });
      this.props.handleSelectedCookedRecipes(this.props.tempDogId, food.recipe);
      return;
    }
    this.setState({ cookedRecipes: [...cookedRecipes, food.recipe] });
    this.props.handleSelectedCookedRecipes(this.props.tempDogId, food.recipe);
  };

  handleSelectedKibbleRecipe = (food) => {
    const { kibble } = this.state;
    if (kibble && kibble.length > 0 && kibble.includes(food.recipe)) {
      // kibble is single selection
      this.setState({ kibble: [] });
      this.props.handleSelectedKibbleRecipe(this.props.tempDogId, food.recipe);
      return;
    }
    this.setState({ kibble: [food.recipe] });
    this.props.handleSelectedKibbleRecipe(this.props.tempDogId, food.recipe);
  };

  render() {
    const { user, separateVersion } = this.props;
    const { kibble, cookedRecipes } = this.state;

    let filteredKibble = kibble[0] === null || !kibble ? 0 : kibble.length;
    let filteredCooked = cookedRecipes[0] === null || !cookedRecipes ? 0 : cookedRecipes.length;
    //checking selected plans length.
    const selectedLength = filteredCooked + filteredKibble;

    return (
      <React.Fragment>
        <RecipeSelection
          user={user}
          selectedKibble={kibble}
          selectedCookedRecipes={cookedRecipes}
          handleSelectedKibbleRecipe={this.handleSelectedKibbleRecipe}
          handleSelectedCookedRecipes={this.handleSelectedCookedRecipes}
          selectedLength={selectedLength}
          separateVersion={separateVersion}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getRecipeData: () => dispatch(userActions.getRecipeData())
});

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
