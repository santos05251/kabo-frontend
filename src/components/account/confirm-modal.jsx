import React from "react";
import moment from 'moment'
import LoadingCircle from "../partials/loading";
import MealplanCard from "./mealplan-card";
import { connect } from "react-redux";
import { userSelectors } from "../../selectors/user.selectors";
import { userActions } from "../../actions";

// dogs, dogIndex, subscriptions, noPrice, user
const ConfirmModal = ({
  dogIndex,
  dogs,
  skipping_dog_delivery,
  frequencyData,
  amount_of_food_options,
  how_often_options,
  close
}) => {
  return (
    <>
      {skipping_dog_delivery && <LoadingCircle />}

      <div className="py-3 md:px-24 px-3 overflow-x-hidden">
        <div className="bg-white border p-5 rounded-md shadow-md mb-4">
          {dogs.length > 0 &&
            dogs.map((dog, i) => {
              return <MealplanCard dogIndex={i} currentDog={dog} />;
            })}

          <div className="mt-3">
            <p className="text-base text-gray-700 text-base font-medium mb-1">
              Your Next Delivery Date
            </p>
            <p className="text-lg text-gray-700 text-2xl font-medium">
              {moment(frequencyData.starting_date).format(
                `MMMM D ${moment().year()}`
              )}
            </p>
          </div>
          <div className="mt-3">
            <p className="text-base text-gray-700 text-base font-medium mb-1">
              How often
            </p>
            <p className="text-lg text-gray-700 text-2xl font-medium capitalize">
              {how_often_options.find((item) => item.value === frequencyData.how_often).label}
            </p>
          </div>
          <div className="mt-3">
            <p className="text-base text-gray-700 text-base font-medium mb-1">
              Amount of food per dog
            </p>
            <p className="text-lg text-gray-700 text-2xl font-medium">
              {amount_of_food_options.find((item) => item.value === frequencyData.amount_of_food).label}
            </p>
          </div>
        </div>
        <div className="mb-5">
          <button
            className="bg-green-600 text-white py-2 px-10 rounded-md focus:outline-none font-medium"
            onClick={() => close()}
          >
            Got it
          </button>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state, props) {
  const { user: User, user } = state;
  const { dogs, skipping_dog_delivery, amount_of_food_options, how_often_options } = state.user;
  return {
    User,
    dogs,
    dogSubscription: userSelectors.selectSubscriptionByDogIndex(
      state,
      props.dogIndex
    ),
    currentDog: userSelectors.selectDogByIndex(state, props.dogIndex),
    skipping_dog_delivery,
    amount_of_food_options,
    how_often_options,
    dogsLength: dogs.length,
  };
}

const mapDispatchToProps = (dispatch) => ({
  skipDogDelivery: (payload) => dispatch(userActions.skipDogDelivery(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
