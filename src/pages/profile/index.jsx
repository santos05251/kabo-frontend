/* eslint-disable semi */
import React from "react";
import { connect } from "react-redux";
import { ReactComponent as Arrow } from "../../assets/images/Vectorarrow.svg";
import LoadingCircle from "../../components/partials/loading.jsx";
import { userActions } from "../../actions";

import Billing from "../../components/profile/billing.jsx";
import AccountDetails from "../../components/profile/account-details.jsx";
import DeliveryAddress from "../../components/profile/delivery-address.jsx";
import Loader from "../../loaders/profileLoader";
import Cupon from "../../components/profile/cupon";
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextExpanded: false,
      mealExpanded: false,
      frequencyExpanded: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal(name) {
    this.setState({
      [name]: !this.state[name],
    });
  }

  componentDidMount() {
    this.props.getAccountData();
    this.props.getSubscriptionData();
    this.props.getBreedData();
  }

  render() {
    if (!this.props.dogs.length || !this.props.user.shipping_address)
      return <Loader />;
    const {
      user,
      subscriptions,
      dogs,
      updatePaymentMethod,
      addCoupon,
      couponResponse,
      userError,
    } = this.props;

    const detailsCard = "container pb-4  shadow-profileBoxes p-10 rounded-xl";
    return (
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-7 pb-10">
        <div className={detailsCard}>
          <AccountDetails user={user} dogs={dogs} />
        </div>
        <div className={detailsCard}>
          <Billing
            user={user}
            open_payment_modal={user.open_payment_modal}
            openUpdatePaymentModal={this.props.openUpdatePaymentModal}
            payment_billing_address={user.payment_billing_address}
            setBillingAddress={this.props.setBillingAddress}
            payment_method_updated={user.payment_method_updated}
            updatePaymentMethod={updatePaymentMethod}
            updating_payment_method={user.updating_payment_method}
            showManageSubscriptionsBox={this.props.showManageSubscriptionsBox}
            openSubscriptionManagementModal={
              this.props.openSubscriptionManagementModal
            }
          />
        </div>
        <div className={detailsCard}>
          <DeliveryAddress
            user={user}
            deliveryAddress={user.shipping_address}
          />
        </div>
        <div className={detailsCard}>
          <Cupon
            user={user}
            deliveryAddress={user.shipping_address}
            addCoupon={addCoupon}
            couponResponse={couponResponse}
            userError={userError}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAccountData: () => dispatch(userActions.getAccountData()),
  getSubscriptionData: () => dispatch(userActions.getSubscriptionData()),
  getBreedData: () => dispatch(userActions.getBreedData()),
  openUpdatePaymentModal: (payload) =>
    dispatch(userActions.openUpdatePaymentModal(payload)),
  setBillingAddress: (payload) =>
    dispatch(userActions.setBillingAddress(payload)),
  updatePaymentMethod: (payload) =>
    dispatch(userActions.updatePaymentMethod(payload)),
  addCoupon: (payload) => dispatch(userActions.applyCoupon(payload)),
  openSubscriptionManagementModal: (payload) =>
    dispatch(userActions.openSubscriptionManagementModal(payload)),
});

const mapStateToProps = (state) => {
  const { user } = state;
  const {
    subscriptions,
    dogs,
    couponResponse,
    errorMessage,
    showManageSubscriptionsBox,
  } = state.user;
  return {
    user,
    subscriptions,
    dogs,
    couponResponse,
    userError: errorMessage,
    showManageSubscriptionsBox,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
