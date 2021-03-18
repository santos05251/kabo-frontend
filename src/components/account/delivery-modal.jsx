import React from "react";
import { connect } from "react-redux";
import moment from 'moment'
import MealPlanCard from "./mealplan-card.jsx";
import DogSelector from "./dog-selector.jsx";
import { userActions } from "../../actions";
import Stepper from "../partials/stepper.jsx";
import GlobalButton from "../global/button.jsx";
import UnpauseMealPlanModal from "./unpause-modal.jsx";
import Modal from "../global/modal";
import SkipDeliveryModal from "./skip-delivery-modal.jsx";
import { userSelectors } from "../../selectors/user.selectors";
import { ReactComponent as DeliveryBox } from "../../assets/images/box-colour.svg";


class DeliveryModalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogIndex: 0,
      showUnpauseBox: false,
    };
    this.setDog = this.setDog.bind(this);
    this.showUnpauseBoxCallBack = this.showUnpauseBoxCallBack.bind(this);
  }

  setDog(i) {
    this.setState({
      dogIndex: i,
    });
    this.props.setDogIndex(i);
  }
  showUnpauseBoxCallBack(val) {
    this.setState({ showUnpauseBox: val });
  }
  render() {
    const { dogIndex } = this.state;
    return (
      <ConnectedModal
        dogIndex={dogIndex}
        setDog={this.setDog}
        showUnpauseBox={this.state.showUnpauseBox}
        showUnpauseBoxCallBack={this.showUnpauseBoxCallBack}
        readableRecipe={this.props.readableRecipe}
        readablePortion={this.props.readablePortion}
      />
    );
  }
}

const DeliveryModal = ({
  dogSubscription,
  dogsLength,
  dogs,
  user,
  readablePortion,
  readableRecipe,
  User,
  showUnpauseBox,
  showUnpauseBoxCallBack,
}) => {
  let readableNames = dogs && dogs.map((dog) => dog.name).join(" and ");

  const PAUSED = dogSubscription.status == "paused";
  const CANCELLED = dogSubscription.status == "cancelled";

  let deliveryStatus;
  const nextDelivery = moment(user.delivery_starting_date_options[0].label).format(`MMMM D`)
  const amountOfFood = user.amount_of_food;
  if (
    user.subscription_phase &&
    user.subscription_phase.status &&
    user.subscription_phase.status.includes("deliver")
  ) {
    deliveryStatus = 3;
  } else if (
    user.subscription_phase &&
    user.subscription_phase.status &&
    user.subscription_phase.status.includes("prepar")
  ) {
    deliveryStatus = 2;
  } else {
    deliveryStatus = 1;
  }

  if (dogsLength === 0) return null;

  return (
    <div data-cy="next-delivery-expanded" className="relative border-r mb-4 border-l bg-white rounded-xl border border-gray-300 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/5 p-8">
          <div className="flex items-center">
            <DeliveryBox />
            <div className="ml-4 font-semibold text-xl">
              Upcoming Delivery
              </div>
          </div>
          <div className="font-cooper text-3xl mt-6">
            {moment(nextDelivery).format('ddd, MMM D')}
          </div>
          <div className="font-bold mt-6">
            Order Summary
            </div>
          <div className="text-sm mt-4">
            <b>Recipes: </b>{readableRecipe}
          </div>
          <div className="text-sm mt-2">
            <b>Portions: </b>{readablePortion}
          </div>
          <div className="text-sm mt-2">
            <b>Amount: </b>{readablePortion}
          </div>
        </div>
        <div className="w-full md:w-2/5 bg-deliveryStepper p-8" data-cy="delivery-stepper" aria-label="Progress">
          <Stepper
            labels={[
              { main: "Scheduled", sub: "We have your order" },
              { main: "Preparing", sub: "We're getting things ready" },
              { main: "Delivering", sub: "Your order is out for delivery" },
            ]}
            current={deliveryStatus}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openSkipDeliveryModal: (payload) =>
    dispatch(userActions.openSkipDeliveryModal(payload)),
  openUpdatePaymentModal: (payload) =>
    dispatch(userActions.openUpdatePaymentModal(payload)),
  setBillingAddress: (payload) =>
    dispatch(userActions.setBillingAddress(payload)),
  updatePaymentMethod: (payload) =>
    dispatch(userActions.updatePaymentMethod(payload)),
});

function mapStateToProps(state, props) {
  const { user: User, user } = state; // whole state of user reducer and named User
  const { dogs, open_skip_delivery_modal } = state.user;
  return {
    User,
    user,
    dogs,
    subscriptions: userSelectors.selectSubscriptions(state),
    dogSubscription: userSelectors.selectSubscriptionByDogIndex(
      state,
      props.dogIndex
    ),
    dogsLength: dogs.length,
    open_skip_delivery_modal,
  };
}

const ConnectedModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryModal);

export default DeliveryModalWrapper;
