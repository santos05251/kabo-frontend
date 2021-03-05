import React, { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import DogSelector from "./dog-selector";
import MealPlanCard from "./mealplan-card";
import Radio from "../global/radio";
import { ReactComponent as FilledCircle } from "../../assets/images/filled-circle.svg";
import { userActions } from "../../actions";
import CancelReason from "./cancel-reasons";
import { userSelectors } from "../../selectors/user.selectors";
import { userConstants } from "../../constants";
import UnpauseMealPlanModal from "./unpause-modal";

const PauseMealModal = ({
  dogIndex,
  dogs,
  subscriptions,
  error,
  errorMessage,
  loading,
  resetUserError,
  userName,
  pauseSubscription,
  cancelSubscription,
  closeModal,
  subscriptionCancel,
}) => {
  const [currentDogIndex, setCurrentDogIndex] = useState(dogIndex || 0);
  const [pauseBoxType, setPauseBoxType] = useState("MAIN");
  const [pauseType, setPauseType] = useState("1_delivery");
  const [pauseDisplay, setPauseDisplay] = useState("");
  const [pauseUntil, setPauseUntil] = useState(null);
  const [pauseProcessing, setPauseProcessing] = useState(null);
  const [reason, setReason] = useState("");

  const currentDog = dogs[currentDogIndex] ? dogs[currentDogIndex] : {};

  const pauseMeal = () => {
    const dogId = currentDog.id;
    const pauseUntilToSend =
      pauseType === "1_delivery" ||
      pauseType === "2_deliveries" ||
      pauseType === "forever"
        ? pauseType
        : moment(pauseUntil).format("YYYY-MM-DD");
    // set local state to listen loading props.
    setPauseProcessing(true);
    if (pauseType !== "cancel") {
      pauseSubscription({
        dogId,
        pauseUntil: pauseUntilToSend,
      });
    }
  };

  const cancelMeal = () => {
    cancelSubscription({
      dog_id: currentDog.id,
      reason: reason.value,
    });
  };

  useEffect(() => {
    /// resetting error if it exists on initial rendering
    if (error) {
      resetUserError();
    }
  }, []);

  useEffect(() => {
    /// listning loading props if local processing state true to display success message
    if (pauseProcessing) {
      if (!error && !loading && pauseProcessing) {
        setPauseBoxType("SUCCESS");
      }
    }
  }, [loading]);

  let dogSubscription = {};

  Object.keys(subscriptions).forEach((key) => {
    if (+subscriptions[key].dog_id === +currentDog.id) {
      dogSubscription = subscriptions[key];
    }
  });

  const isPaused = dogSubscription.status !== "active";

  const options = [
    {
      value: "1_delivery",
      text: `Pause ${currentDog.name}'s account for 1 delivery`,
      displayText: "for 1 delivery",
    },
    {
      value: "2_deliveries",
      text: `Pause ${currentDog.name}'s account for 2 deliveries`,
      displayText: "for 2 deliveries",
    },
    {
      value: "forever",
      text: `Pause ${currentDog.name}'s account indefinitley`,
      displayText: "forever",
    },
    {
      value: "specific",
      text: (
        <>
          <span>
            Pause until &nbsp;
            {pauseUntil === null
              ? "a specific date"
              : moment(pauseUntil).format("MMM DD, YYYY")}
          </span>
          &nbsp;
          {pauseUntil !== null && (
            <span
              className="text-primary text-sm"
              onClick={() => setPauseBoxType("TIME")}
            >
              Edit Date
            </span>
          )}
        </>
      ),
      displayText: "for 1 delivery",
      onChange: () => {
        if (pauseUntil === null) {
          setPauseBoxType("TIME");
        } else {
          setPauseType("specific");
        }
      },
    },
    {
      value: "cancel",
      text: "Cancel deliveries",
      displayText: "cancel",
    },
  ];

  return pauseBoxType === "MAIN" ? (
    <div className="p-6">
      {isPaused ? (
        <UnpauseMealPlanModal
          dogs={dogs}
          setDog={setCurrentDogIndex}
          dogIndex={currentDogIndex}
          isCancelled={dogSubscription.status === "cancelled"}
        />
      ) : (
        <>
          <div className="p-6">
            {dogs.length > 1 && (
              <DogSelector
                dogs={dogs}
                setDog={setCurrentDogIndex}
                dogIndex={currentDogIndex}
              />
            )}
          </div>
          <div className="lg:flex justify-between lg:mb-12 mb-8">
            <div className="lg:w-96">
              <MealPlanCard noPrice dogIndex={currentDogIndex} />
            </div>
            <div className="mt-6 sm:mt-0">
              <a
                className="text-sm font-semibold text-primary lg:mr-2 cursor-pointer"
                href={`/edit-plan/${currentDogIndex}`}
              >
                Select a different meal plan
              </a>
            </div>
          </div>
          <div className="lg:flex justify-between lg:mb-9">
            <div className="lg:w-80">
              {options.map((opt, i) => (
                <Radio
                  key={opt.value + i}
                  value={opt.value}
                  text={opt.text}
                  onChange={() => {
                    if (opt.value === "specific") {
                      if (pauseUntil === null) {
                        setPauseBoxType("TIME");
                      } else {
                        setPauseType("specific");
                      }
                    } else {
                      setPauseType(opt.value);
                      setPauseDisplay(opt.displayText);
                    }
                  }}
                  selected={pauseType === opt.value}
                  className={i === options.length - 1 ? "" : "mb-7"}
                />
              ))}
            </div>
            <div className="mt-7 mb-6 sm:m-0">
              <div className="lg:w-72 p-6 bg-promptYellow rounded-1lg">
                <h3 className="text-base font-semibold mb-1.3">
                  You can unpause anytime
                </h3>
                <p className="text-sm">
                  Keep in mind you can pause your account at anytime
                </p>
              </div>
            </div>
          </div>
          <div>
            {error || isPaused ? (
              <div className="text-red-500 text-s mt-1">
                {isPaused
                  ? "This subscription already paused"
                  : "An error occured please try again later"}
              </div>
            ) : null}
            <button
              className={`rounded-xl py-3 px-8 ${
                loading ? "opacity-50" : ""
              } text-base font-bold bg-primary text-white`}
              onClick={() =>
                pauseType === "cancel" ? setPauseBoxType("REASON") : pauseMeal()
              }
              disabled={loading}
            >
              {pauseType === "cancel" ? "Next" : "Confirm"}
            </button>
          </div>
        </>
      )}
    </div>
  ) : pauseBoxType === "TIME" ? (
    <div className="p-6">
      <h2 className="ml-0 sm:ml-8 text-xl font-bold">
        Choose the date you'd like to pause until
      </h2>
      <div className="flex justify-center mt-6 mb-4">
        <DatePicker
          dateFormat="YYYY-MM-DD"
          startDate
          selected={pauseUntil === null ? new Date() : pauseUntil}
          onChange={(date) => setPauseUntil(date)}
          inline
          useWeekdaysShort
        />
      </div>
      <div className="flex justify-center">
        <button
          className="rounded-xl py-3 px-8 text-base font-bold bg-primary text-white"
          onClick={() => {
            setPauseType("specific");
            setPauseBoxType("MAIN");
          }}
        >
          Pick Date
        </button>
      </div>
    </div>
  ) : pauseBoxType === "REASON" ? (
    <div className="p-6">
      {!subscriptionCancel ? (
        <CancelReason
          reason={reason}
          setReason={setReason}
          dogName={currentDog.name}
          lastName={userName}
        />
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-medium mb-2">
            We've sent you confirmation email
          </h3>
          <div className="text-center mt-5">
            <p>
              We’re sorry to see you go. We’ve sent you a confirmation email to
              cancel your subscription.
            </p>
          </div>
        </div>
      )}
      {error ? (
        <div className="text-red-500 text-xs mt-1">
          {errorMessage && errorMessage.message
            ? errorMessage.message
            : "An error occured please try again later"}
        </div>
      ) : null}
      {!subscriptionCancel && (
        <button
          className={`rounded-xl py-3 px-8 ${
            !reason ? "opacity-50" : ""
          } text-base font-bold bg-primary text-white`}
          onClick={cancelMeal}
          disabled={!reason || loading}
        >
          Confirm
        </button>
      )}
    </div>
  ) : pauseBoxType === "SUCCESS" ? (
    <div className="py-6 px-16">
      <div className="flex items-center flex-col mb-4">
        <FilledCircle className="rounded-full h-7.3 w-7.3 mb-6" />
        <h2 className="text-xl font-bold mb-4">
          Your account has been successfully paused
        </h2>
        <p className="text-sm mb-5 text-center">
          Your account is paused {pauseDisplay}
        </p>
        <div className="w-full p-6 bg-promptYellow rounded-1lg">
          <h4 className="text-center text-base font-semibold mb-1">
            You can unpause anytime
          </h4>
          <p className="text-center text-sm">
            Keep in mind you can pause your account at anytime
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="rounded-xl py-3 px-8 text-base font-bold bg-primary text-white"
          onClick={closeModal}
        >
          Done
        </button>
      </div>
    </div>
  ) : null;
};

const mapDispatchToProps = (dispatch) => ({
  cancelSubscription: async (dogId) =>
    dispatch(userActions.cancelSubscription(dogId)),
  pauseSubscription: async (data) =>
    dispatch(userActions.pauseSubscription(data)),
  resetUserError: () => dispatch(userActions.resetUserError()),
});

const mapStateToProps = (state) => {
  const {
    subscriptions,
    dogs,
    error,
    user,
    errorMessage,
    subscriptionCancel,
  } = state.user;
  return {
    dogs,
    subscriptions,
    error,
    errorMessage,
    subscriptionCancel,
    userName: user.last_name
      ? user.last_name
      : user.first_name
      ? user.first_name
      : "Customer",
    loading:
      userSelectors.selectUserLoadingByKey(
        state,
        userConstants.PAUSE_SUBSCRIPTION_REQUESTED
      ) ||
      userSelectors.selectUserLoadingByKey(
        state,
        userConstants.CANCEL_SUBSCRIPTION_REQUESTED
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PauseMealModal);
