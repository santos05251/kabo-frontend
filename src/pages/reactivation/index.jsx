import React from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import { userSelectors } from "../../selectors/user.selectors";
import { userConstants } from "../../constants";
import MealPlanCard from "../../components/account/mealplan-card";
import SelectMealPlanModal from "../../components/account/select-meal-plan";
import ChangePaymentMethodModal from "../../components/profile/change-payment-method-modal";
import DeliveryAddressModal from "../../components/profile/delivery-address-modal";
import PaymentCardIcon from "../../components/global/payment-card-icon";
import Radio from "../../components/global/radio";
import SubscriptionCard from "../../components/global/subscriptionCard";
import ReactivationSuccessModal from "../../components/reactivation/reactivationSuccessModal";
import DeliveryAddress from "../../assets/images/delivery-address.svg";
import BowlIcon from "../../assets/images/bowl-colour.svg";
import BillingIcon from "../../assets/images/billing-icon.svg";
import DogHeadIcon from "../../assets/images/dog-head-badge.svg";

class ReactivationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogIndex: this.props.match.params.dog_id,
      unpauseType: "next-delivery-1",
      isSuccess: false,
      isMealModalOpen: false,
      isAddressModalOpen: false,
      isPaymentModalOpen: false,
      processing: false,
      isCancelled: false
    };
  }

  componentDidMount() {
    if (this.props.location.pathname.includes("/reactivate"))
      this.setState({isCancelled: true});
    else
      this.setState({isCancelled: false});
    
    this.props.getAccountData();
    this.props.getSubscriptionData();
    this.props.getRecipeData()
    
  }

  toggleMealPlanModal = () => {
    this.setState({ isMealModalOpen: !this.state.isMealModalOpen });
  };

  togglePaymentModal = () => {
    this.setState({ isPaymentModalOpen: !this.state.isPaymentModalOpen });
  };

  toggleAddressModal = () => {
    this.setState({ isAddressModalOpen: !this.state.isAddressModalOpen });
  };

  unpauseMeal() {
    const dogId = this.props.dogs[this.state.dogIndex].id;
    this.setState({
      processing: true,
    });
    this.props.unpauseSubscription({
      dog_id: dogId,
      unpause_date: "",
      reactivate: this.state.isCancelled,
    });
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.processing) {
      if (!nextProps.loading) {
        return { isSuccess: true, processing: false};
      }
    }
    return null;
  }
  
  gotoKaboPage = () => {
    this.setState({ isSuccess: false });
    this.props.history.push("/");
  }

  render() {
    const { dogs, user, error, errorMessage } = this.props;
    const { dogIndex, isCancelled } = this.state;

    const ccLastFour = user && user.card && user.card.last4 && user.card.last4;
    const address1 = user && user.subscription && user.subscription.shipping_address.line1;
    const address2 = `${user && user.subscription && user.subscription.shipping_address.city}, 
                        ${user && user.subscription && user.subscription.shipping_address.country} 
                        ${user && user.subscription && user.subscription.shipping_address.zip}`;
    const nextDeliveries = user.delivery_starting_date_options;

    return (
      <div className="p-1 md:p-4">
        {!this.state.isSuccess && (
          <div>
            <div className="flex flex-col items-start md:items-center justify-center bg-green-100 px-3 md:px-6 py-4 md:py-6">
              <div className="flex flex-row mb-5 items-center">
                <img src={DogHeadIcon} className="w-14 pr-3" />
                <h2 className="text-lg font-medium font-messina">
                  Manage Subscription
                </h2>
              </div>
              <h2 className="mb-5 text-xl font-cooper">
                Yay! We're excited to have you back.
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-center justify-center px-3 md:px-6 py-4 md:py-8">
              <button
                className="bg-green-600 text-white w-full md:w-auto my-3 md:my-5 px-2 md:px-6 py-2.5 md:py-3 text-base font-messina rounded-lg"
                onClick={() => {this.unpauseMeal();}}
              >
                { isCancelled ? "Reactivate and continue" : "Unpause and continue" }
              </button>
              <div className="mt-6 mb-4 text-left md:text-center text-base font-bold font-cooper">
                Please confirm the following:
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 auto-rows-fr	gap-5">
                <SubscriptionCard
                  title="Meal Plan"
                  icon={BowlIcon}
                  buttonText="Select a different meal plan"
                  buttonAction={this.toggleMealPlanModal}
                >
                  <MealPlanCard dogIndex={dogIndex} />
                </SubscriptionCard>
                <SubscriptionCard
                  title="Billing"
                  icon={BillingIcon}
                  buttonText="Change Payment Method"
                  buttonAction={this.togglePaymentModal}
                >
                  <div className="flex h-full items-center">
                    <PaymentCardIcon icon="visa" />
                    <span className="inline-block ml-3">
                      Card ending in {ccLastFour}
                    </span>
                  </div>
                </SubscriptionCard>
                <SubscriptionCard
                  title="Delivery Address"
                  icon={DeliveryAddress}
                  buttonText="Edit"
                  buttonAction={this.toggleAddressModal}
                >
                  <div className="mb-7">
                    <span className="text-sm">{address1}</span>
                    <br />
                    <span className="text-sm">{address2}</span>
                    <br />
                  </div>
                </SubscriptionCard>
                <SubscriptionCard
                  title="Confirm next delivery date"
                >
                  {
                    nextDeliveries &&
                    nextDeliveries.map((date, index) => (
                      <div className="mb-4" key={index}>
                        <Radio
                          text={date.label}
                          onChange={() =>
                            this.setState({ unpauseType: date.value })
                          }
                          selected={this.state.unpauseType === date.value}
                        />
                      </div>
                    ))
                  }
                </SubscriptionCard>
              </div>
              <button
                className="bg-green-600 text-white w-full md:w-auto my-3 md:my-5 px-2 md:px-6 py-1.5 md:py-3 text-base font-messina rounded-lg"
                onClick={() => {this.unpauseMeal();}}
              >
                { isCancelled ? "Reactivate and continue" : "Unpause and continue" }
              </button>
              { error &&
                <div className="text-red-500 text-xs mt-1">
                  {errorMessage
                    ? errorMessage
                    : "An error occurred please try again later"}
                </div>
              }
            </div>
          </div>
        )}
        <ReactivationSuccessModal
          isOpen={this.state.isSuccess}
          onRequestClose={() => this.gotoKaboPage()}
          onConfirmClick={() => this.gotoKaboPage()}
        />
        <SelectMealPlanModal
          isOpen={this.state.isMealModalOpen}
          toggle={this.toggleMealPlanModal}
          dogIndex={dogIndex}
        />

        <ChangePaymentMethodModal
          isOpen={this.state.isPaymentModalOpen}
          toggle={this.togglePaymentModal}
          payment_billing_address={user.payment_billing_address}
          setBillingAddress={this.props.setBillingAddress}
          updatePaymentMethod={this.props.updatePaymentMethod}
          updating_payment_method={user.updating_payment_method}
        />

        <DeliveryAddressModal
          isOpen={this.state.isAddressModalOpen}
          toggle={this.toggleAddressModal}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  unpauseSubscription: (userId) =>
    dispatch(userActions.unpauseSubscription(userId)),
  setBillingAddress: (payload) =>
    dispatch(userActions.setBillingAddress(payload)),
  updatePaymentMethod: (payload) =>
    dispatch(userActions.updatePaymentMethod(payload)),
  getAccountData: () => dispatch(userActions.getAccountData()),
  getSubscriptionData: () => dispatch(userActions.getSubscriptionData()),
  getRecipeData: () => dispatch(userActions.getRecipeData())
});

function mapStateToProps(state) {
  const { user } = state;
  const { dogs, error, errorMessage } = state.user;
  return {
    user,
    dogs,
    error,
    errorMessage: errorMessage && errorMessage.message,
    loading: userSelectors.selectUserLoadingByKey(
      state,
      userConstants.UNPAUSE_SUBSCRIPTION_REQUESTED
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactivationPage);
