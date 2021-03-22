import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import Radio from "../global/radio";
import CancelReason from "../account/cancel-reasons";
import ConfirmationMessage from "./confirmation-message";
import { cancelConstants } from "../../constants"
import GuideOptions from "./guide-options";

const CancelOptions = ({
  currentDog,
  userName,
  subscriptionCancel,
  isSubscriptionPaused,
  pauseSubscription,
  cancelSubscription,
}) => {
  const [pauseBoxType, setPauseBoxType] = useState('MAIN');
  const [pauseType, setPauseType] = useState('1_delivery');
  const [pauseUntil, setPauseUntil] = useState(null);
  const [reason, setReason] = useState('');

  const pauseMeal = () => {
    const dogId = currentDog.id;
    const pauseUntilToSend =
      pauseType === '1_delivery' ||
      pauseType === '2_deliveries' ||
      pauseType === 'forever'
        ? pauseType
        : moment(pauseUntil).format('YYYY-MM-DD');

    let pausePayload = {
      dog_id: dogId,
      pause_until: pauseUntilToSend,
    }

    if (pauseType === 'forever') {
      pausePayload.reason = reason.value;
    }
    pauseSubscription(pausePayload)
  };

  const cancelMeal = () => {
    cancelSubscription({
      dog_id: currentDog.id,
      reason: reason.value,
    });
  };

  const handleDateSelection = () => {
    setPauseType('specific');
    setPauseBoxType('MAIN');
  }

  const options = [
    {
      value: '1_delivery',
      text: `Pause ${currentDog.name}'s account ${cancelConstants.ONE_DELIVERY}`,
      displayText: cancelConstants.ONE_DELIVERY,
    },
    {
      value: '2_deliveries',
      text: `Pause ${currentDog.name}'s account ${cancelConstants.TWO_DELIVERIES}`,
      displayText: cancelConstants.TWO_DELIVERIES,
    },
    {
      value: 'forever',
      text: `Pause ${currentDog.name}'s account indefinitley`,
      displayText: cancelConstants.FOREVER,
    },
    {
      value: 'specific',
      text: (
        <>
          <span>
            Pause until &nbsp;
            {pauseUntil === null
              ? 'a specific date'
              : moment(pauseUntil).format('MMM DD, YYYY')}
          </span>
          &nbsp;
          {pauseUntil !== null && (
            <span
              className="text-primary text-sm"
              onClick={() => setPauseBoxType('TIME')}
            >
              Edit Date
            </span>
          )}
        </>
      ),
      displayText: cancelConstants.ONE_DELIVERY,
      onChange: () => {
        if (pauseUntil === null) {
          setPauseBoxType('TIME');
        } else {
          setPauseType('specific');
        }
      },
    },
    {
      value: 'cancel',
      text: 'Cancel deliveries',
      displayText: cancelConstants.CANCEL,
    },
  ];
  return (
    <React.Fragment>
      <div className="mb-5">
        { isSubscriptionPaused ? (
          <div className="py-6 px-16">
            <div className="flex items-center flex-col mb-4">
              <h2 className="text-xl font-bold mb-5">
                Your account has been successfully paused
              </h2>
              <div className="w-full p-6 bg-promptYellow rounded-1lg">
                <h4 className="text-center text-base font-semibold mb-1">
                  You can reactivate anytime
                </h4>
                <p className="text-center text-sm">
                  Keep in mind you can pause your account at anytime
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Link
                to="/profile"
                className="rounded-xl py-3 px-8 text-base font-bold bg-primary text-white"
              >
                Back to My Kabo
              </Link>
            </div>
          </div>
        ) : (
          pauseBoxType === 'MAIN' &&
          options.map((opt, i) => (
            <Radio
              key={opt.value + i}
              value={opt.value}
              text={opt.text}
              onChange={() => {
                if (opt.value === 'specific') {
                  if (pauseUntil === null) {
                    setPauseBoxType('TIME');
                  } else {
                    setPauseType('specific');
                  }
                } else {
                  setPauseType(opt.value);
                }
              }}
              selected={pauseType === opt.value}
              className={i === options.length - 1 ? '' : 'mb-7'}
            />
          ))
        )}
        { pauseBoxType === 'MAIN' &&
        <button
          className="rounded-xl py-3 px-8 mt-5 text-base font-bold bg-primary text-white"
          onClick={() =>
            pauseType === 'cancel' || pauseType === 'forever'
              ? setPauseBoxType('REASON')
              : setPauseBoxType('CONFIRM')
          }
        >
          {pauseType === 'cancel' || pauseType === 'forever'
            ? 'Next'
            : 'Confirm'}
        </button>}
      </div>

      { pauseBoxType === 'TIME' && (
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
              onClick={handleDateSelection}
            >
              Pick Date
            </button>
          </div>
        </div>
      )}

      { pauseBoxType === 'REASON' &&
        <>
          <CancelReason
            reason={reason}
            setReason={setReason}
            dogName={currentDog.name}
            lastName={userName}
          />
          <button
            onClick={() => setPauseBoxType('CONFIRM')}
            className="rounded-xl mb-5 py-3 px-8 text-base font-bold bg-primary text-white"
          >
            Confirm
          </button>
        </>    
      }

      { pauseBoxType === 'CONFIRM' ? 
        !subscriptionCancel && !isSubscriptionPaused ? 
          <GuideOptions
            pauseMeal={pauseMeal} 
            cancelMeal={cancelMeal}
            pauseType={pauseType}
          />
        :
        subscriptionCancel && <ConfirmationMessage /> 
      : null }

    </React.Fragment>
  );
};

export default CancelOptions;
