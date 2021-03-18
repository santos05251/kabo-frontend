import React, { Component } from "react";
import { connect } from "react-redux";
import { onboardingActions } from "../../../actions";
import ImgCheckoutSuccessLogo from "../../../assets/images/checkout-success-logo.svg";
import ImgCheckoutSuccessCard from "../../../assets/images/checkout-success-card.svg";
import LoadingCircle from "../../../components/partials/loading";

class CheckoutSuccess extends Component {
  state = {
  };

  componentDidMount() {
    this.props.getCheckoutResult();
  }

  goAccount = () => {
    this.props.history.push("/");
  }
  
  render() {
    const { getting_checkout_result, checkout_success_result } = this.props;

    return (
      <main className="w-full px-0 md:px-20 py-0 md:py-20">
        { getting_checkout_result &&
          <LoadingCircle />
        }
        <div className="flex flex-col align-center mx-auto w-full md:w-7/12 px-6 md:px-12 py-6 md:py-10 bg-white rounded-md shadow-lg">
          <img className="mx-auto w-4/12 md:w-3/12" src={ImgCheckoutSuccessLogo} alt="" />
          <h3 className="font-normal text-2xl text-center text-gray-700 mt-6 md:mt-12">
            Thanks! You're all set!
          </h3>
          <h4 className="txt-xl text-center text-gray-700 mt-2 md:mt-4">
            You will receive an email confirmation shortly.
          </h4>
          { checkout_success_result && 
            <div className="border border-gray-300 rounded-md px-4 md:px-6 py-4 md:py-6 my-6">
              <div className="flex flex-col">
                {
                  checkout_success_result.dogs &&
                  checkout_success_result.dogs.map((dogItem, index) => (
                    <div className="flex flex-col" key={index}>
                      <p className={`font-bold text-md text-gray-700 ${index === 0? 'mt-0': 'mt-4'}`}>
                        {dogItem.name}'s Mealplan
                      </p>
                      <p className="text-md text-gray-700">
                        {dogItem.mealplan}
                      </p>
                      <p className="text-md text-gray-500 mt-1 md:mt-2">
                        Portion
                      </p>
                      <p className="text-md text-gray-700">
                        {dogItem.portion}
                      </p>
                    </div>
                  ))
                }
                <div className="flex flex-col mt-2 md:mt-4">
                  <p className="text-md text-gray-500">
                    Delivers
                  </p>
                  <p className="text-md text-gray-700">
                    { checkout_success_result.delivery_date ? checkout_success_result.delivery_date : '' }
                  </p>
                </div>
                <div className="flex flex-col mt-2 md:mt-4">
                  <p className="text-md text-gray-500">
                    Total Paid
                  </p>
                  <p className="text-md text-gray-700">
                    { checkout_success_result.total_paid ? checkout_success_result.total_paid : '' }
                  </p>
                </div>
                <div className="flex mt-2 md:mt-4 rounded-md px-3 md:px-6 py-4 md:py-8 bg-gray-50">
                  <img className="w-12 pr-3" src={ImgCheckoutSuccessCard} alt="" />
                  <p className="text-md text-gray-700">
                    Card ending in { checkout_success_result.last_digits ? checkout_success_result.last_digits : '' }
                  </p>
                </div>
              </div>
            </div>
          }
          <button className="w-full bg-green-600 rounded-md text-base font-medium text-white py-3 md:py-4 hover:bg-green-700 focus:outline-none" onClick={this.goAccount}>
            See your Account Page
          </button>
          <div className="font-medium text-sm text-gray-700 mt-2 md:mt-4">
            After your trial, we'll send you recurring shipments so will always have enough delicious food to eat. You can pause, cancel, and adjust your shipments at any time.
          </div>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCheckoutResult: (payload) =>
    dispatch(onboardingActions.getCheckoutResult(payload)),
});

function mapStateToProps(state) {
  return {
    getting_checkout_result: state.onboarding.getting_checkout_result,
    checkout_success_result: state.onboarding.checkout_success_result,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutSuccess);
