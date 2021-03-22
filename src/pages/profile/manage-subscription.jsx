import React, { Component } from 'react';
import { connect } from 'react-redux';
import CancelSubscription from '../../components/profile/cancel-subscription';
import { userActions } from '../../actions';
import ConfirmationModal from '../../components/profile/confirmation-modal';

class ManageSubscription extends Component {
  state = {
    isOpen: false,
    step: 1
  };

  componentDidMount() {
    this.props.getAccountData();
    this.props.getSubscriptionData();
    this.setState({ isOpen: !this.state.isOpen })
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleStep = (step) => {
    this.setState({ step: step })
  }

  render() {
    return (
      <React.Fragment>
        <CancelSubscription
          dogs={this.props.dogs}
          userName={this.props.userName}
          cancelSubscription={this.props.cancelSubscription}
          pauseSubscription={this.props.pauseSubscription}
          subscriptionCancel={this.props.subscriptionCancel}
          isSubscriptionPaused={this.props.isSubscriptionPaused}
          step={this.state.step}
          handleStep={this.handleStep}
        />

        <ConfirmationModal
          isOpen={this.state.isOpen}
          toggle={this.toggle}
          handleStep={this.handleStep}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  const { dogs, subscriptionCancel, isSubscriptionPaused } = state.user;
  return {
    user,
    dogs,
    subscriptionCancel,
    isSubscriptionPaused,
    userName: user.first_name
      ? user.first_name
      : 'Customer',
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
