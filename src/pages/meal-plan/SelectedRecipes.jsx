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
      <div className='flex flex-col py-9 items-center bg-white'>
        <div className='container flex flex-col  w-11/12 mx-auto lg:w-full'>
          <div>
            <DisplaySelected
              type='cooked'
              index={index}
              recipes={user.cooked_recipes}
              handleSelectedCookedRecipes={handleSelectedCookedRecipes}
              selectedCookedRecipes={selectedCookedRecipes}
              selectedKibble={selectedKibble}
              selectedDog={selectedDog}
              selectedLength={selectedLength}
            />
            <DisplaySelected
              type='kibble'
              recipes={user.kibble_recipes}
              selectedKibbleRecipe={handleSelectedKibbleRecipe}
              selectedKibble={selectedKibble}
              selectedCookedRecipes={selectedCookedRecipes}
              toggleKibble={toggleKibble}
              isKibble={isKibble}
              selectedDog={selectedDog}
              selectedLength={selectedLength}
            />
          </div>
          {estimate && (
            <div>
              <div>
                {user.how_often && (
                  <p className='font-cooper mt-1 text-xl font-bold mb-4'>
                    Your new subscription price will be{' '}
                    <span className='text-green-500 font-bold'> {estimate} </span> every{' '}
                    {parseInt(user.how_often)} weeks
                  </p>
                )}
              </div>
              <div className='flex md:items-center md:flex-row flex-col items-left'>
                <button
                  onClick={() => this.setState({ checkout: true })}
                  className='bg-green-700 border border-green-700 hover:border-transparent focus:outline-none text-white text-sm md:text-base font-bold p-3 md:py-2 md:px-5 font-cooper'
                >
                  Save Changes
                </button>
                <div className='flex items-center flex-col'>
                  <div className='w-full px-6'>
                    <p className='text-xl font-bold mb-2 mt-4 md:mt-0'>
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
                    <p className='text-left text-sm '>
                      {' '}
                      <a className='font-bold text-green-500' href='mailto:help@kabo.co'>
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
