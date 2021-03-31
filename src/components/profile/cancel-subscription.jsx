import React, { Component } from 'react';
import DogSelector from '../account/dog-selector';
import CancelOptions from './cancel-options';
import DogImage from '../../assets/images/manage-subscription-dog.png';
import { ReactComponent as DogIcon } from '../../assets/images/account-details.svg';
import ErrorMessage from '../global/error-message';

class CancelSubscription extends Component {
  state = {
    dogIndex: 0,
  };

  setDog = (i) => {
    this.setState({
      dogIndex: i,
    });
  };

  render() {
    const { dogs, error } = this.props;
    return (
      <>
        { error
          ? <ErrorMessage />
          : <div className="grid lg:grid-cols-2 xs:grid-cols-1">
              <div className="bg-green-50 pt-5 pl-6 pr-6 md:hidden">
                <h3 className="font-medium text-xl font-messina text-copyPrimary flex items-center"> <DogIcon className="mr-4" /> Manage Subscription</h3>
                <p className="mt-8 text-3xl font-cooper">
                  We'll be waiting for you to come back
                </p>
                { dogs && dogs.length >= 1 &&
                  <div className="mt-8 flex">
                    <DogSelector
                      dogs={dogs}
                      setDog={this.setDog}
                      dogIndex={this.state.dogIndex}
                    />
                  </div>
                }
              </div>
              <div>
                <img className="w-full h-full object-cover" src={DogImage} alt="Dog Image" />
              </div>
              <div className="bg-white">
                <div className="w-auto">
                  <div className="bg-green-50 pt-5 pl-12 hidden md:block">
                    <h3 className="font-medium text-xl font-messina text-copyPrimary flex items-center"> <DogIcon className="mr-4" /> Manage Subscription</h3>
                    <p className="mt-8 text-3xl font-cooper">
                      We'll be waiting for you to come back
                    </p>
                    { dogs && dogs.length >= 1 &&
                      <div className="mt-8 flex">
                        <DogSelector
                          dogs={dogs}
                          setDog={this.setDog}
                          dogIndex={this.state.dogIndex}
                        />
                      </div>
                    }
                  </div>
                  { dogs && dogs.length >= 1 &&
                    <div className="mt-10 px-4 w-screen overflow-hidden lg:w-auto">
                      <CancelOptions
                        currentDog={
                          dogs.length >= 1 &&
                          dogs[this.state.dogIndex]
                        }
                        dogIndex={this.state.dogIndex}
                        userName={this.props.userName}
                        subscriptionPhase={this.props.subscriptionPhase}
                        cancelSubscription={this.props.cancelSubscription}
                        pauseSubscription={this.props.pauseSubscription}
                        subscriptionCancel={this.props.subscriptionCancel}
                        isSubscriptionPaused={this.props.isSubscriptionPaused}
                        subscription={this.props.subscription}
                        delivery_starting_date_options={this.props.delivery_starting_date_options}
                      />
                    </div>
                  }
                </div>
              </div>
            </div>
        }
      </>
    );
  }
}

export default CancelSubscription;
