import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mealActions, userActions } from '../../actions';
import RecipeSelection from './RecipeSelection';
import DailyDietPortion from './DailyDietPortion';
import SelectedRecipes from './SelectedRecipes';
import FreshOrKibble from '../../components/meal-plan/fresh-kibble-selector';
import Loader from '../../loaders/mealPlan';
import { ReactComponent as Arrow } from '../../assets/images/Vectorarrow.svg';
import { ReactComponent as DeliveryBox } from '../../assets/images/delivery-box.svg';
import { userSelectors } from '../../selectors/user.selectors';

class EditPlan extends Component {
  state = {
    next: false,
    previous: true,
    selectedBox: false,
    cookedRecipes: [],
    kibbleRecipes: [],
    isKibble: false,
    selectedPortion: false,
    estimate: this.props.user?.estimate || false,
    dietPortion: {},
    dog: {},
    step: 0,
    dirty: false,
    showKibble: true,
    showCooked: true,
    editRecipiesOpen: false,
    editPortionsOpen: false,
  };

  componentDidMount() {
    this.props.getSubscriptionData();
    this.props.getAccountData();
    this.props.getRecipeData();
  }

  componentDidUpdate(prevProps, prevState, snap) {
    let index = parseInt(this.props.match.params.id);
    if (
      !this.props.user.subLoading &&
      this.props.user.dogs.length > 0 &&
      !this.state.dog.name
      // Object.keys(prevState.dog).length === 0
    ) {
      let currentdog = this.props.user.dogs[index];
      this.setState({ dog: currentdog });
      let loadRecipes = [];
      if (currentdog.chicken_recipe) {
        loadRecipes.push('chicken');
      }
      if (currentdog.beef_recipe) {
        loadRecipes.push('beef');
      }
      if (currentdog.lamb_recipe) {
        loadRecipes.push('lamb');
      }
      if (currentdog.turkey_recipe) {
        loadRecipes.push('turkey');
      }
      ///again not sure can be more then one kibble recipe
      this.setState({
        cookedRecipes: loadRecipes,
        kibbleRecipes: [currentdog.kibble_recipe] || [],
        dietPortion: {
          cooked_portion: currentdog.cooked_portion,
          kibble_portion: currentdog.kibble_portion,
          portion_adjusment: currentdog.portion_adjusment,
        },
      });
    }
  }

  selectedDog = (dog) => {
    this.setState({ dog });
  };

  displayKibble = (state) => {
    this.setState({ showKibble: state });
  };

  displayCooked = (state) => {
    this.setState({ showCooked: state });
  };

  toggleKibble = () => {
    this.setState({ isKibble: !this.state.isKibble });
  };

  toggleDirty = () => {
    this.setState({ dirty: true });
  };

  togglePortion = () => {
    this.setState({ selectedPortion: !this.state.selectedPortion });
  };

  selectedDietPortion = (diet) => {
    this.setState({ dietPortion: diet, step: 2 });
    this.handleNext();
  };
  openModal(name) {
    this.setState({
      [name]: !this.state[name],
    });
  }
  handleSelectedCookedRecipes = (food) => {
    const { cookedRecipes } = this.state;
    if (cookedRecipes && cookedRecipes.length > 0 && cookedRecipes.includes(food.recipe)) {
      let recipes = [...cookedRecipes];
      const index = recipes.indexOf(food.recipe);
      recipes.splice(index, 1);
      this.setState({ cookedRecipes: recipes, step: 1, dirty: true });
      this.handleNext();
      return;
    }
    this.setState({
      cookedRecipes: [...cookedRecipes, food.recipe],
      dirty: true,
      step: 1,
    });
    this.handleNext();
  };

  handleSelectedKibbleRecipe = (food) => {
    const { kibbleRecipes } = this.state;
    if (kibbleRecipes.length > 0 && kibbleRecipes.includes(food.recipe)) {
      let recipes = [...kibbleRecipes];
      const index = recipes.indexOf(food.recipe);
      recipes.splice(index, 1);
      this.setState({ kibbleRecipes: [], step: 1, dirty: true });
      this.handleNext();
      return;
    }
    this.setState({
      kibbleRecipes: [food.recipe],
      step: 1,
      dirty: true,
    });
    this.handleNext();
  };

  handleNext = () => {
    const { cookedRecipes, kibbleRecipes, dietPortion, dog } = this.state;
    const data = {
      dog_id: dog.id,
      cooked_portion: dietPortion.cooked_portion,
      kibble_portion: dietPortion.kibble_portion || null,
      chicken_recipe: false,
      turkey_recipe: false,
      lamb_recipe: false,
      beef_recipe: false,
      kibble_recipe: null,
      portion_adjusment: dietPortion.portion_adjusment || null,
    };
    let kibbleNotNull = kibbleRecipes.some(function (el) {
      return el !== null;
    });
    if (kibbleNotNull) {
      data.kibble_recipe = kibbleRecipes[0];
    } else {
      data.kibble_recipe = null;
    }
    for (let item of cookedRecipes) {
      data[`${item}_recipe`] = true;
    }
    this.props.getSubscriptionEstimate(data);
  };

  handlePrevious = () => {
    this.setState({ step: this.state.step - 1 });
  };

  handleEstimate = () => {
    this.setState({ previous: false, next: false, estimate: true });
  };

  handleMealUpdate = () => {
    const { cookedRecipes, kibbleRecipes, dietPortion, dog, showCooked, showKibble } = this.state;
    const data = {
      dog_id: dog.id,
      cooked_portion: dietPortion.cooked_portion || null,
      kibble_portion: dietPortion.kibble_portion || null,
      portion_adjusment: dietPortion.portion_adjusment || null,
      chicken_recipe: false,
      turkey_recipe: false,
      lamb_recipe: false,
      beef_recipe: false,
      kibble_recipe: null,
    };
    ///not sure what to do if selected kibbleRecipes more than one
    if (kibbleRecipes && kibbleRecipes.length > 0) {
      data.kibble_recipe = kibbleRecipes[0];
    } else {
      data.kibble_recipe = null;
    }
    for (let item of cookedRecipes) {
      data[`${item}_recipe`] = true;
    }
    this.props.updateMealPlan(data);
  };

  render() {
    const { user, meal, getDailyDietPortion } = this.props;
    const {
      cookedRecipes,
      kibbleRecipes,
      dog,
      step,
      dirty,
      showCooked,
      showKibble,
      editRecipiesOpen,
      editPortionsOpen,
    } = this.state;

    if (user.subLoading) return <Loader />;
    let filteredKibble = kibbleRecipes[0] === null || !kibbleRecipes ? 0 : kibbleRecipes.length;
    let filteredCooked = cookedRecipes[0] === null || !cookedRecipes ? 0 : cookedRecipes.length;

    ///checking selected plans length.
    const selectedLength = filteredCooked + filteredKibble;

    if (selectedLength === 0 && !dirty) this.forceUpdate();
    let cbID = dog.chargebee_subscription_id;

    let subData = user.subscriptions[cbID];

    ////resolved NaN
    let totalReadable =
      subData && subData.invoice_estimate_total === 'N/A'
        ? 0
        : subData && (subData.invoice_estimate_total / 100).toFixed(2);

    return (
      <div className="md:bg-white sm:px-2 md:px-4 xl:px-0">
        <div className="justify-center mb-5 customContainer md:border  border-gray-200 p-4 rounded-lg">
          <div className="flex items-center pb-7 pt-4 border-b border-gray-200">
            <div className="mr-3 ">
              <img
                className="w-20"
                src="https://staging.kabo.co/assets/dog-pic-placeholder-0e1ea281ad23bc5843589a1968515c57044324a77b4cfada2aa1c13d19ac6dbf.svg"
              />
            </div>
            <div>
              <h1 className="font-extrabold text-3xl mb-1">{dog && dog.name}'s Plan</h1>
              <p className="text-xl">Active Subscription</p>
            </div>
          </div>
          <RecipeSelection
            user={user}
            showCooked={showCooked}
            showKibble={showKibble}
            index={this.props.match.params.id}
            selectedDog={this.selectedDog}
            handleSelectedCookedRecipes={this.handleSelectedCookedRecipes}
            selectedCookedRecipes={cookedRecipes}
            handleSelectedKibbleRecipe={this.handleSelectedKibbleRecipe}
            selectedKibble={kibbleRecipes}
            selectedLength={selectedLength}
            toggleKibble={this.toggleKibble}
            isKibble={this.state.isKibble}
            dog={dog}
          />
          <DailyDietPortion
            meal={meal}
            dog={dog}
            cookedRecipes={cookedRecipes}
            dietPortion={this.state.dietPortion}
            selectedPortion={this.state.selectedPortion}
            togglePortion={this.togglePortion}
            selectedDietPortion={this.selectedDietPortion}
            getDailyDietPortion={getDailyDietPortion}
            kibbleRecipes={kibbleRecipes}
          />
            <SelectedRecipes
            dog={dog}
              user={user}
              index={this.props.match.params.id}
              selectedDog={this.selectedDog}
              handleSelectedCookedRecipes={this.handleSelectedCookedRecipes}
              selectedCookedRecipes={cookedRecipes}
              handleSelectedKibbleRecipe={this.handleSelectedKibbleRecipe}
              selectedKibble={kibbleRecipes}
              selectedLength={selectedLength}
              toggleKibble={this.toggleKibble}
              isKibble={this.state.isKibble}
              estimate={
                !user.estimate ? null : user.estimate.amount
              }
              onConfirm={(e) => this.handleMealUpdate(e)}
            />

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAccountData: () => dispatch(userActions.getAccountData()),
  getRecipeData: () => dispatch(userActions.getRecipeData()),
  updateMealPlan: (payload) => dispatch(mealActions.updateMealPlan(payload)),
  getDailyDietPortion: (payload) => dispatch(mealActions.getDailyDietPortion(payload)),
  getSubscriptionData: () => dispatch(userActions.getSubscriptionData()),
  getSubscriptionEstimate: (data) => dispatch(userActions.getSubscriptionEstimate(data)),
});

const mapStateToProps = (state, props) => {
  //console.log(props)
  return {
    currentDog: userSelectors.selectDogByIndex(props.match.params.id),
    user: state.user,
    meal: state.meal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPlan);
