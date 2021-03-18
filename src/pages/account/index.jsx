/* eslint-disable semi */
import React from "react";
import { connect } from "react-redux";
import { isMobile } from 'react-device-detect';

import { ReactComponent as DeliveryBox } from "../../assets/images/box-colour.svg";
import { ReactComponent as Arrow } from "../../assets/images/Vectorarrow.svg";
import { ReactComponent as MealBox } from "../../assets/images/food-colour.svg";
import { ReactComponent as BowlIcon } from "../../assets/images/bowl-colour.svg";
import { ReactComponent as DogHeadIcon } from "../../assets/images/dog-head-badge.svg";
import { ReactComponent as RecipeSheet } from "../../assets/images/recipe-sheet.svg";
import { ReactComponent as FrequencyIcon } from "../../assets/images/delivery-frequency-icon.svg";



import DeliveryModal from "../../components/account/delivery-modal.jsx";
import MealPlanModal from "../../components/account/meal-modal.jsx";
import FrequencyModal from "../../components/account/delivery-frequency.jsx";
import DogImage from "../../assets/images/Badge-Labrador-Retriever.svg";
import HomeLoader from "../../loaders/homeLoader";
import { userActions } from "../../actions";
import { userSelectors } from "../../selectors/user.selectors";
import { DashboardCard } from "../../components/global/dashboard-card";
import DogSelector from "../../components/account/dog-selector";
import PortionDisplay from "../../components/account/portion-display";
import { CircleSVG } from "../../components/meal-plan/circle";

const PortionCircle = (num) => (
  <div className="flex w-16 relative mb-4">
    <CircleSVG num={num} />
  </div>
)


class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextExpanded: !isMobile,
      mealExpanded: false,
      frequencyExpanded: false,
      dogIndex: 0,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal(name, isCardDisable) {
    if (
      name === "frequencyExpanded" && isCardDisable ||
      (name === "mealExpanded" && isCardDisable)
    ) {
      return;
    }
    this.setState({
      [name]: !this.state[name],
    });
  }

  componentDidMount() {
    this.props.getAccountData();
    this.props.getSubscriptionData();
    this.props.getRecipeData();
  }
  setDogIndex = (i) => {
    this.setState({ dogIndex: i });
  };

  render() {
    if (!this.props.dogs.length) return <HomeLoader />;
    const { dogIndex } = this.state
    const { user, subscriptions, dogs, globalState } = this.props;
    const { cooked_recipes, kibble_recipe } = user
    if (!cooked_recipes) return <HomeLoader />
    const currentDog = dogs[dogIndex]

    const dogInfo = `${currentDog.age_in_months / 12} years old, ${currentDog.weight}${currentDog.weight_unit}, ${currentDog.neutered && 'Neutered'}, ${currentDog.breed}`

    const firstTime = user.user.subscription_phase_status === 'first_box_preparing_order' || user.user.subscription_phase_status === 'waiting_for_trial_shipment'

    let dogSubscription = userSelectors.selectSubscriptionByDogIndex(
      globalState,
      dogIndex
    );
    let isCardDisable =
      dogSubscription.status === "cancelled" ||
      dogSubscription.status === "paused";
    let recipeArray = [];

    if (currentDog.chicken_recipe) {
      recipeArray.push(cooked_recipes[0].name);
    }
    if (currentDog.beef_recipe) {
      recipeArray.push(cooked_recipes[1].name);
    }
    if (currentDog.turkey_recipe) {
      recipeArray.push(cooked_recipes[2].name);
    }
    if (currentDog.lamb_recipe) {
      recipeArray.push(cooked_recipes[3].name);
    }
    if (currentDog.kibble_recipe) {
      recipeArray.push(`${currentDog.kibble_recipe} kibble`);
    }

    let portion = "";

    if (currentDog.cooked_portion === 100) {
      portion = "Full meal";
    } else if (!currentDog.kibble_portion) {
      portion = `${currentDog.cooked_portion}% Kabo`;
    } else {
      portion = `${currentDog.cooked_portion ? currentDog.cooked_portion : 0}% fresh food & ${currentDog.kibble_portion ? currentDog.kibble_portion : 0}% kibble`;
    }

    const readableRecipe = recipeArray.join(" and ");

    return (
      <div className="px-3 md:px-0 md:w-11/12 mx-auto xl:w-full pb-10">
        <div data-cy="dashboard-header" className="h-full text-3xl text-center font-cooper md:text-left ">
          Welcome {user.user.first_name}
        </div>
        {dogs.length > 1 && (
          <div className="flex mb-8">
            <span className="mr-2">Select your doggo</span>
            <DogSelector dogIndex={dogIndex} dogs={dogs} setDog={this.setDogIndex} />
          </div>
        )}
        <DeliveryModal readableRecipe={readableRecipe} readablePortion={portion} />
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 xl:gap-10 grid-cols-1">
          <DashboardCard
            icon={<BowlIcon />}
            title="Meal Plan"
            text={readableRecipe}
            redirectLink={`/edit-plan/${dogIndex}`}
            buttonText="Edit Mealplan" />
          <DashboardCard
            icon={<FrequencyIcon />}
            title="Delivery Frequency"
            text={portion}
            buttonText="Edit Delivery Frequency"
            disabled={firstTime} />
          <DashboardCard
            icon={<PortionCircle num={currentDog.cooked_portion} />}
            title="Portion"
            text={portion}
            buttonText="Edit Portion Size" />
          <DashboardCard
            icon={<MealBox />}
            title="Amount of Food"
            text={portion}
            buttonText="Edit Amount of Food" />
          <DashboardCard
            icon={<DogHeadIcon />}
            title={`${currentDog.name}'s info`}
            text={dogInfo} />
          <DashboardCard
            icon={<RecipeSheet />}
            title='Feeding Guide'
            text={`View ${currentDog.name}'s custom feeding guide`} />

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAccountData: () => dispatch(userActions.getAccountData()),
  getSubscriptionData: () => dispatch(userActions.getSubscriptionData()),
  getRecipeData: () => dispatch(userActions.getRecipeData()),
});

const mapStateToProps = (state) => {
  const { user } = state;
  const { subscriptions, dogs } = user;
  return {
    user,
    globalState: state,
    subscriptions,
    dogs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
