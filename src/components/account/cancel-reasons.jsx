import React, { useState } from "react";
import Radio from "../global/radio";
import RadioMessage from "./RadioMessage";
import { planConstants } from "../../constants";

const CancelReason = ({ reason, setReason, dogName, lastName }) => {
  const [messages] = useState({
    expectations: {
      title: "Let us make things right!",
      text:
        "Our Dog Care & Nutrition team is eager to listen to your feedback and concerns. Schedule an appointment today and we will do our best to make sure your issue is resolved as quickly as possible!",
    },
    health: {
      title: "Book an appointment with Dr. Suzee!",
      text: `We encourage you to take advantage of Kabo's certified veternarian to discuss any health-related matters regarding ${dogName}. Schedule a virtual appoinment with Dr. Suzee ${lastName} to evaluate all of ${dogName}'s dietary needs!`,
    },

    different: {
      title: `Need help finding the perfect diet for ${dogName}?`,
      text: `We're sad to see ${dogName} go but we want to continue to help you find the best diet for ${dogName}. Check out our blogs where our Research & Development team share their thoughts on all things dog food!`,
    },
    unsatisfied: {
      title: "Let us make things right!",
      text:
        "Our customer support team is eager to listen to your feedback and concerns. We will do our best to make sure your issue is resolved as quickly as possible!",
    },
    moving: {
      title: "We're available across Canada!",
      text:
        "If you decide to reactivate your Kabo subscription after you settled into your new home, you can do that directly here ",
    },
    try: {
      title: "Let us know your initial experience!",
      text:
        "Our customer support team is eager to listen to your feedback. Let us know what you'd like to see from your perfect dog food!",
    },
    other: {
      title: "Let us make things right!",
      text:
        "Our customer support team is eager to listen to your feedback and concerns. We will do our best to make sure your issue is resolved as quickly as possible!",
    },
  });
  return (
    <React.Fragment>
      <p className="text-lg text-center font-medium text-gray-800">
        Please select a reason why you'd like to cancel your subscription
      </p>
      <div className="mt-5 grid sm:grid-cols-1">
        {planConstants.CANCEL_REASONS.map((item, idx) => (
          <div key={idx}>
            <Radio
              value={item.lable}
              className="mb-7"
              text={item.value}
              onChange={() => setReason(item)}
              selected={reason.label === item.label}
            />

            {reason.label === item.label && (
              <RadioMessage
                title={messages[item.label]["title"]}
                text={messages[item.label]["text"]}
                buttonTitle="Get 50% off now"
              />
            )}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default CancelReason;
