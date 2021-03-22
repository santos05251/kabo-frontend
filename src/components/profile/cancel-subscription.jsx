import React, { Component } from 'react';
import DogSelector from '../account/dog-selector';
import CancelOptions from './cancel-options';
import GuideOptions from './guide-options';

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
    return (
      <React.Fragment>
        <div className="grid lg:grid-cols-2 xs:grid-cols-1">
          <div className="lg:-mx-80">
            <img src="https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
          </div>
          <div>
            <div className="lg:-mx-72 lg:-mr-0 w-auto">
              <div className="bg-green-50 p-5">
                <h3 className="font-medium text-xl">Manage Subscription</h3>
                <p className="mt-4 text-xl">
                  We'll be waiting for you to come back
                </p>
                <div className="mt-4 flex">
                  {this.props.dogs && this.props.dogs.length > 1 && (
                    <DogSelector
                      dogs={this.props.dogs}
                      setDog={this.setDog}
                      dogIndex={this.state.dogIndex}
                    />
                  )}
                </div>
              </div>
              <div className="mt-10 px-10">
                {this.props.step === 1 && <GuideOptions handleStep={this.props.handleStep}/>}

                {this.props.step === 2 &&
                <CancelOptions
                  currentDog={
                    this.props.dogs.length > 1 &&
                    this.props.dogs[this.state.dogIndex]
                  }
                  userName={this.props.userName}
                  cancelSubscription={this.props.cancelSubscription}
                  pauseSubscription={this.props.pauseSubscription}
                  subscriptionCancel={this.props.subscriptionCancel}
                  isSubscriptionPaused={this.props.isSubscriptionPaused}
                />
                }
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CancelSubscription;
