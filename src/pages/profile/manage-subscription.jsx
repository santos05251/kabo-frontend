import React, { Component } from 'react';
import { connect } from 'react-redux';
import CancelSubscription from '../../components/profile/cancel-subscription';
import { userActions } from '../../actions';

class ManageSubscription extends Component {
  componentDidMount() {
    this.props.getAccountData();
    this.props.getSubscriptionData();
  }

  render() {
    return (
      <React.Fragment>
        <CancelSubscription
          dogs={this.props.dogs}
          userName={this.props.userName}
          subscriptionPhase={this.props.user.subscription_phase}
          cancelSubscription={this.props.cancelSubscription}
          pauseSubscription={this.props.pauseSubscription}
          subscriptionCancel={this.props.subscriptionCancel}
          isSubscriptionPaused={this.props.isSubscriptionPaused}
          subscription={this.props.subscription}
          delivery_starting_date_options={this.props.delivery_starting_date_options}
          error={this.props.error}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  const { 
    dogs,
    subscriptionCancel, 
    isSubscriptionPaused, 
    delivery_starting_date_options, 
    subscription,
    error
  } = state.user;
  return {
    user,
    dogs,
    subscription,
    subscriptionCancel,
    isSubscriptionPaused,
    delivery_starting_date_options,
    userName: user.first_name ? user.first_name : 'Customer',
    error
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAccountData: () => dispatch(userActions.getAccountData()),
  getSubscriptionData: () => dispatch(userActions.getSubscriptionData()),
  cancelSubscription: async (dogId) =>
    dispatch(userActions.cancelSubscription(dogId)),
  pauseSubscription: async (data) =>
    dispatch(userActions.pauseSubscription(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubscription);
