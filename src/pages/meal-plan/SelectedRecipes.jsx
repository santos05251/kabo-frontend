import React, { Component } from 'react';
import moment from 'moment';
import LoadingCircle from '../../components/partials/loading';
import MealPlanSelect from '../../components/meal-plan/meal-plan-select';
import DisplaySelected from '../../components/meal-plan/display-selected';
import ConfirmModal from '../../components/order/confirmModal';
class SelectedRecipes extends Component {
  handleChange = (selectedDog) => {
    this.props.selectedDog(selectedDog);
  };
  state = {
    checkout: false,
  };

  render() {
    const {
      user,
      index,
      selectedKibble,
      isKibble,
      toggleKibble,
      selectedDog,
      handleSelectedKibbleRecipe,
      handleSelectedCookedRecipes,
      selectedCookedRecipes,
      selectedLength,
      estimate,
      onConfirm,
      dog,
    } = this.props;
    return (
      <div className='flex flex-col py-9 items-center sm:bg-white'>
        <div className='container flex flex-col  w-11/12 mx-auto lg:w-full'>
          {estimate && (
            <div>
              <div>
                {user.how_often && (
                  <p className=" mt-1 text-2xl font-normal  mb-8">
                    Your new subscription price will be{' '}
                    <span className="text-green-500"> {estimate} </span> every{' '}
                    {parseInt(user.how_often)} weeks
                  </p>
                )}
              </div>
              <div className='flex md:items-center md:flex-row flex-col items-left'>
                <button
                  onClick={() => this.setState({ checkout: true })}
                  className="border border-green-700 hover:border-transparent w-8/12 sm:w-full focus:outline-none bg-green-600 text-white  text-sm md:text-lg md:w-52  md:px-5 rounded-xl border-green py-3 m-0 "
                >
                  Save Changes
                </button>
                <div className="flex items-center sm:pl-10">
                  {/* <div className="md:pl-6 pr-4">
                  </div> */}
                  <div className="w-full">
                    <p className="text-xl font-bold mb-1 mt-4 md:mt-0">
                      {user &&
                      user.subscription_phase &&
                      user.subscription_phase.status === 'waiting_for_trial_shipment'
                        ? 'Changes will apply to your trial delivery onwards'
                        : `Changes will apply to your ${
                            user &&
                            user.subscription_phase &&
                            moment(user.subscription_phase.changes_applied_delivery_date).format(
                              'MMM Do',
                            )
                          } delivery onwards`}
                    </p>
                    <p className='text-left text-sm'>
                      {' '}
                      <a className="font-medium text-green-500" href="mailto:help@kabo.co">
                        Email help@kabo.co{' '}
                      </a>{' '}
                      if you require additional help.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <ConfirmModal
          user={user}
          dog={dog}
          onConfirm={onConfirm}
          showModal={this.state.checkout}
          onClose={() => {
            this.setState({ checkout: false });
          }}
          estimate={estimate}
        />
      </div>
    );
  }
}

export default SelectedRecipes;
