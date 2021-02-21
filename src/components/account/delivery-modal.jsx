import React from 'react';
import { connect } from 'react-redux'

import { userActions } from '../../actions'
import { formValueSelector, reduxForm } from 'redux-form';

import MealPlanCard from './mealplan-card.jsx'
import DogSelector from './dog-selector.jsx'
import Stepper from '../partials/stepper.jsx';
import { Button } from '../../stories/Button.js';
import GlobalButton from '../global/button.jsx';
import UnpauseMealPlanModal from './unpause-modal.jsx';
import Modal from '../global/modal';

class DeliveryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogIndex: 0,
      showUnpauseBox: false
    };
    this.setDog = this.setDog.bind(this)
  }

  setDog(i) {
    this.setState({
      dogIndex: i
    })
  }

  render() {
    const { dogIndex } = this.state
    const { dogs, user, subscriptions, userDetails } = this.props

    const dogsLength = dogs.length
    const currentDog = dogs[dogIndex]
    const { portion } = currentDog;

    let dogNames = dogs.map((dog, i) => { return dog.name })
    let readableNames = dogNames.join(' and ')

    // const PAUSED = (userDetails.subscription.status=="paused");
    const PAUSED = true;

    let deliveryStatus;
    const nextDelivery = userDetails.next_occurrencies[0];

    if (user.subscription_phase_status = 'normal_user_preparing_order') {
      deliveryStatus = 1
    } else {
      deliveryStatus = 0
    }

    if (dogsLength === 0) return null

    return (
      <> 
        <div className="py-7 px-5 relative border-r border-l rounded-b-xl border-b border-gray-300">
          {PAUSED &&
          <>
            { dogsLength > 1 && <DogSelector dogs={dogs} setDog={this.setDog} dogIndex={dogIndex} />}
            <span className="mb-5 text-base font-semibold">{readableNames}'s delivery is currently paused. Unpause to schedule your next delivery</span>
            <div className="my-8">
              <MealPlanCard dogIndex={dogIndex} portion={portion} />
            </div>
            <GlobalButton filled={true} styles="mb-7" text="Unpause Meal Plan"
              handleClick={() => {
                this.setState({ showUnpauseBox: true });
              }}
            />
            <br/>
            <span className="text-base font-semibold" >Next available delivery date</span>
            <br/>
            <span className="font-cooper text-25xl">{nextDelivery}</span>
          </>
        
          }
          {!PAUSED &&
            <>
              { dogsLength > 1 && <DogSelector dogs={dogs} setDog={this.setDog} dogIndex={dogIndex} />}
              <div className="mb-14">
                <MealPlanCard dogIndex={dogIndex} portion={portion} />
              </div>
              <nav aria-label="Progress">
                <Stepper
                  labels={
                    [
                      { main: "Scheduled", sub: "We have your order" },
                      { main: "Preparing", sub: "We're getting things ready" },
                      { main: "Delivering", sub: "Your order is out for delivery" },

                    ]
                  }
                  current={deliveryStatus}
                />
              </nav>
              <div
                className="text-primary mt-7 font-bold"
              >
                Skip this delivery
              </div>
              <Button primary label="test" />
            </>
          }
          <Modal
            title="Unpause Kabo"
            isOpen={this.state.showUnpauseBox}
            onRequestClose={() => this.setState({ showUnpauseBox: false })}
          >
            <UnpauseMealPlanModal dogs={dogs} />
          </Modal>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication
  const { subscriptions, dogs } = state.user
  const userDetails = state.user
  return {
    user,
    subscriptions,
    dogs,
    userDetails
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    getAccountData: () => dispatch(userActions.getAccountData()),
    getSubscriptionData: () => dispatch(userActions.getSubscriptionData())
  }
)

reduxForm({
  form: 'nextDelivery',
})(DeliveryModal)

// DeliveryModal = reduxForm({ form: 'nextDelivery' })(DeliveryModal)
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryModal)
