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
import { ReactComponent as Bowl } from '../../assets/images/bowl-colour.svg';

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
    selectedDogIndex: this.props.match.params.id,
  };

  componentDidMount() {
    this.props.getSubscriptionData();
    this.props.getAccountData();
    this.props.getRecipeData();
  }

  componentDidUpdate(prevProps, prevState, snap) {
    if (
      !this.props.user.subLoading &&
      this.props.user.dogs.length > 0 &&
      !this.state.dog.name
      ) {
      let currentdog = this.props.user.dogs[this.state.selectedDogIndex];
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
    // Should check props.location, because we use this page as modal on some sections. e.g: unpause meal-plan.
    // Specific position will be shown after rendering, when dogs data are loaded.
    if (this.props.location && this.props.location.hash && this.props.location.hash.length > 0) {
      const scrollId = this.props.location.hash.replace('#', '');
      const scrollElement = document.getElementById(scrollId);
      if (scrollElement) scrollElement.scrollIntoView();
    }
  }

  selectedDog = (dog) => {
    this.setState({ dog });
  };

  handleDog = (value) => {
    this.setState({ dog: this.props.user.dogs[value] });
    this.setState({ selectedDogIndex: value });
    let currentdog = this.props.user.dogs[value];
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
    const {
      user: { dogs },
    } = this.props;
    return (
      <div className="mx-2">
        {dog && dog.name && dogs && dogs.length > 1 && (
          <div className="sm:flex items-center sm:mb-8 ml-0 sm:ml-10">
            <p>Select your doggo</p>
            <select className="sm:ml-4 mt-2 sm:mt-0 px-3 py-3 min-w-10 bg-white border border-gray-300 rounded-lg" value={this.state.selectedDogIndex} onChange={e => this.handleDog(e.target.value)}>
              {dogs.map((item, index) => (
                <option value={index}>{item.name}</option>
              ))}
            </select>
          </div>
        )}
        <div className="mt-4 sm:mt-0 sm:bg-white sm:px-4 md:border rounded-lg border-gray-200 md:px-6 xl:px-8">
          <div className="justify-center mb-5 p-1 sm:p-4 ">
            <div className="flex items-end sm:items-center sm:pt-4">
              <div className="mr-3 ">
                <Bowl className="w-14 md:w-20" />
              </div>
              <h1 className="font-extrabold text-2xl sm:text-3xl">{dog && dog.name}'s meal plan</h1>
            </div>
            <RecipeSelection
              user={user}
              showCooked={showCooked}
              showKibble={showKibble}
              index={this.state.selectedDogIndex}
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
            <div id="DailyDietPortion" />
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
              index={this.state.selectedDogIndex}
              selectedDog={this.selectedDog}
              handleSelectedCookedRecipes={this.handleSelectedCookedRecipes}
              selectedCookedRecipes={cookedRecipes}
              handleSelectedKibbleRecipe={this.handleSelectedKibbleRecipe}
              selectedKibble={kibbleRecipes}
              selectedLength={selectedLength}
              toggleKibble={this.toggleKibble}
              isKibble={this.state.isKibble}
              estimate={!user.estimate ? null : user.estimate.amount}
              onConfirm={(e) => this.handleMealUpdate(e)}
            />
          </div>
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
  return {
    currentDog: userSelectors.selectDogByIndex(props.match.params.id),
    user: state.user,
    meal: state.meal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPlan);
