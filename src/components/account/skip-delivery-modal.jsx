import React from "react";
import LoadingCircle from "../partials/loading";
import Stepper from "../partials/stepper";
import DogSelector from "./dog-selector.jsx";
import MealplanCard from "./mealplan-card";
import {connect} from "react-redux";
import {userSelectors} from "../../selectors/user.selectors";
import {userActions} from "../../actions";

// dogs, dogIndex, subscriptions, noPrice, user
const SkipDeliveryModal = ({
  dogIndex,
  User,
  currentDog,
  dogsLength,
  dogs,
  //dogSubscription,
  skipping_dog_delivery,
  skipDogDelivery,
  setDogIndex
}) => {
  return (
    <>
      {skipping_dog_delivery && <LoadingCircle />}

      <div className="py-3 md:px-24 px-3 overflow-x-hidden">
        { dogsLength > 1 && <DogSelector dogs={dogs} setDog={setDogIndex} dogIndex={dogIndex} />}
        <div className="mb-5">
          <p className="text-base text-gray-700 text-lg font-medium">
            Upcoming Delivery Date
          </p>
          <p className="text-lg text-gray-700 text-2xl font-medium">
            {User &&
              User.starting_date &&
              new Date(User.starting_date * 1000).toDateString()}
          </p>
        </div>
        <div className="bg-white border p-5 rounded-md shadow-md mb-10">
          <MealplanCard dogIndex={dogIndex}/>
          <div>
            <button
              className="bg-green-600 text-white py-2 px-10 rounded-md focus:outline-none font-medium"
              onClick={() => skipDogDelivery(currentDog.id)}
            >
              Skip Delivery
            </button>
          </div>

          <div className="mt-3">
            <p className="text-base text-gray-700 text-base font-medium mb-1">
              Your Next Delivery Date
            </p>
            {User && !User.next_delivery_date_showable && (
              <p className="text-lg text-gray-700 text-2xl font-medium">
            {User &&
              User.delivery_starting_date_options &&
              new Date(User.delivery_starting_date_options[0].value * 1000).toDateString()}
          </p>
            )}
            <p className="text-sm text-gray-400 mt-3">
              We will send you a delivery on this date
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state, props) {
  const { user: User, user } = state;
  const {
    dogs,
    skipping_dog_delivery,
  } = state.user;
  return {
    User,
    dogs,
    dogSubscription: userSelectors.selectSubscriptionByDogIndex(state, props.dogIndex),
    currentDog: userSelectors.selectDogByIndex(state, props.dogIndex),
    skipping_dog_delivery,
    dogsLength: dogs.length
  }
}

const mapDispatchToProps = (dispatch) => ({
  skipDogDelivery: (payload) => dispatch(userActions.skipDogDelivery(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkipDeliveryModal);
