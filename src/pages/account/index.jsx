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
import DeliveryModalPaused from "../../components/account/delivery-modal-paused";
import Modal from "../../components/global/modal";
import UnpauseMealPlanModal from "../../components/account/unpause-modal";
import DeliveryModalCancelled from "../../components/account/delivery-modal-cancelled";
import { otherConstants } from '../../constants'
import WelcomeModal from "../../components/account/welcome-modal";

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
      showUnpauseBox: false,
      isWelcomeModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.setDogIndex = this.setDogIndex.bind(this);
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

  static getDerivedStateFromProps(nextProps, prevState) {
    const { user } = nextProps;
    if (user.user && user.user.subscription_phase_status) {
      const isWelcomeModal = user.user.subscription_phase_status === otherConstants.SUBSCRIPTION_STATUS.FIRST_BOX_PREPARING_ORDER || user.user.subscription_phase_status === otherConstants.SUBSCRIPTION_STATUS.WAITING_FOR_TRIAL_SHIPMENT;
      const firstTrial = localStorage.getItem("first_trial");
      if (firstTrial === null) {
        localStorage.setItem("first_trial", true);
      }
      return { isWelcomeModal: isWelcomeModal && firstTrial === null }
    }
    return null;
  }

  setDogIndex = (i) => {
    this.setState({ dogIndex: i });
  };

  selectSubscription = (isPaused, isCancelled) => {
    if (isPaused) this.manageSubscription(true);
    else if (isCancelled) this.manageSubscription(false);
  };

  manageSubscription = (status) => {
    const { dogIndex } = this.state;
    if (dogIndex === null || dogIndex < 0) return;
    if (status) this.props.history.push(`/unpause/${dogIndex}`);
    else this.props.history.push(`/reactivate/${dogIndex}`);
  };

  confirmWelcome = () => {
    this.setState({ isWelcomeModal: false });
    this.props.history.push("/profile");
  }

  render() {
    if (!this.props.dogs.length) return <HomeLoader />;
    const { dogIndex } = this.state
    const { user, subscriptions, dogs, globalState, openUpdatePaymentModal, setBillingAddress, updatePaymentMethod } = this.props;
    const { cooked_recipes, kibble_recipe } = user
    if (!cooked_recipes) return <HomeLoader />
    const currentDog = dogs[dogIndex]

    const dogInfo = `${currentDog.age_in_months / 12} years old, ${currentDog.weight}${currentDog.weight_unit}, ${currentDog.neutered && 'Neutered'}, ${currentDog.breed}`

    const firstTime = user.user.subscription_phase_status === otherConstants.SUBSCRIPTION_STATUS.FIRST_BOX_PREPARING_ORDER || user.user.subscription_phase_status === otherConstants.SUBSCRIPTION_STATUS.WAITING_FOR_TRIAL_SHIPMENT

    let dogSubscription = userSelectors.selectSubscriptionByDogIndex(
      globalState,
      dogIndex
    );

    const { invoice_estimate_total } = dogSubscription
    const displayPrice = (invoice_estimate_total / 100).toFixed(2)

    console.log(displayPrice)

    const isPaused = dogSubscription.status === "paused"
    const isCancelled = dogSubscription.status === "cancelled"

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
        <div data-cy="dashboard-header" className="h-full text-3xl text-center font-cooper mb-8 md:text-left ">
          Welcome {user.user.first_name}
        </div>
        {dogs.length > 1 && (
          <div className="flex mb-8">
            <span className="mr-2">Select your doggo</span>
            <DogSelector dogIndex={dogIndex} dogs={dogs} setDog={this.setDogIndex} />
          </div>
        )}
        {isPaused ?
          <DeliveryModalPaused dog={currentDog} openModal={() => this.manageSubscription(true)} />
          :
          isCancelled ?
            <DeliveryModalCancelled isCancelled dog={currentDog} openModal={() => this.manageSubscription(false)} />
            :
            <DeliveryModal displayPrice={displayPrice} readableRecipe={readableRecipe} user={user} readablePortion={portion} />
        }
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 xl:gap-10 grid-cols-1">
          <DashboardCard
            icon={<BowlIcon className="h-full" />}
            title="Meal Plan"
            text={readableRecipe}
            buttonAction={() => this.selectSubscription(isPaused, isCancelled)}
            paused={isPaused}
            cancelled={isCancelled}
            redirectLink={`/edit-plan/${dogIndex}`}
            buttonText="Edit Mealplan" />
          {!isCancelled &&
            <DashboardCard
              icon={<FrequencyIcon className="h-full" />}
              title="Delivery Frequency"
              paused={isPaused}
              cancelled={isCancelled}
              text={portion}
              buttonText="Edit Delivery Frequency"
              disabled={firstTime} />
          }
          {!isCancelled &&
            <DashboardCard
              icon={<PortionCircle num={currentDog.cooked_portion} className="h-full" />}
              title="Portion"
              subText="When you change your portions, the size of your packs of food change"
              paused={isPaused}
              cancelled={isCancelled}
              text={portion}
              redirectLink={`/edit-plan/${dogIndex}#DailyDietPortion`}
              buttonText="Edit Portion Size" />
          }
          {!isCancelled &&
            <DashboardCard
              icon={<MealBox className="h-full" />}
              title="Amount of Food"
              subText="This is the amount of food in your next delivery "
              paused={isPaused}
              cancelled={isCancelled}
              text={portion}
              buttonText="Edit Amount of Food" />
          }
          <DashboardCard
            icon={<DogHeadIcon className="h-full" />}
            title={`${currentDog.name}'s info`}
            text={dogInfo} />
          {!isCancelled &&
            <DashboardCard
              icon={<RecipeSheet className="h-full" />}
              cancelled={isCancelled}
              title='Feeding Guide'
              text={`View ${currentDog.name}'s custom feeding guide`} />
          }
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAccountData: () => dispatch(userActions.getAccountData()),
  getSubscriptionData: () => dispatch(userActions.getSubscriptionData()),
  getRecipeData: () => dispatch(userActions.getRecipeData()),
  openSkipDeliveryModal: (payload) =>
    dispatch(userActions.openSkipDeliveryModal(payload)),
  openUpdatePaymentModal: (payload) =>
    dispatch(userActions.openUpdatePaymentModal(payload)),
  setBillingAddress: (payload) =>
    dispatch(userActions.setBillingAddress(payload)),
  updatePaymentMethod: (payload) =>
    dispatch(userActions.updatePaymentMethod(payload)),
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
