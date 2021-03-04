import React, { Component } from "react";
import moment from 'moment'
import LoadingCircle from "../../components/partials/loading";
import MealPlanSelect from "../../components/meal-plan/meal-plan-select";
import DisplaySelected from "../../components/meal-plan/display-selected";

class SelectedRecipes extends Component {
  handleChange = (selectedDog) => {
    this.props.selectedDog(selectedDog);
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
      onConfirm
    } = this.props;
    return (
      <div className="flex flex-col py-9 items-center bg-white">
        <div className="container flex flex-col  w-11/12 mx-auto lg:w-full">
          <div className=" grid grid-cols-1 w-full w-4/5 md:w-full gap-10">
            <div>
              <DisplaySelected
                type="cooked"
                index={index}
                recipes={user.cooked_recipes}
                handleSelectedCookedRecipes={handleSelectedCookedRecipes}
                selectedCookedRecipes={selectedCookedRecipes}
                selectedKibble={selectedKibble}
                selectedDog={selectedDog}
                selectedLength={selectedLength}
              />
              <DisplaySelected
                type="kibble"
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
                    <p className="font-messina mt-1">
                      Your new subscription price will be{" "}
                      <span className="text-green-500 font-bold">
                        {" "}
                        {estimate}{" "}
                      </span>{" "}
                      every {parseInt(user.how_often)} weeks
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onConfirm()}
                  className="rounded-lg bg-green-700 border border-green-700 hover:border-transparent focus:outline-none text-white text-sm md:text-base font-bold p-3 md:py-2 md:px-5  rounded mt-2"
                >
                  Save Changes
                </button>
              </div>
            )}

            <div className="flex items-center flex-col mb-4">
              <div className="w-full p-6 bg-promptYellow rounded-1lg">
                {user && user.subscription_phase && user.subscription_phase.status === "waiting_for_trial_shipment" ? "Changes will apply to your trial delivery onwards" : `Changes will apply to your ${user && user.subscription_phase && moment(user.subscription_phase.changes_applied_delivery_date).format("MMM Do")} delivery onwards`}
                <p className="text-left text-sm ">
                  Email{" "}
                  <a className="font-bold underline" href="mailto:help@kabo.co">
                    {" "}
                    help@kabo.co{" "}
                  </a>{" "}
                  if you require additional help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectedRecipes;
