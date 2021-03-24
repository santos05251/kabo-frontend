import React from "react";
import moment from 'moment'
import Stepper from "../partials/stepper.jsx";
import { ReactComponent as DeliveryBox } from "../../assets/images/box-colour.svg";
import { ReactComponent as QuestionMark } from "../../assets/images/green-question.svg";


const DeliveryModal = ({
  dogsLength,
  user,
  readablePortion,
  readableRecipe,
  displayPrice
}) => {

  let deliveryStatus;
  const nextDelivery = moment(user.delivery_starting_date_options[0].label).format(`MMMM D`)
  if (
    user.subscription_phase &&
    user.subscription_phase.status &&
    user.subscription_phase.status.includes("deliver")
  ) {
    deliveryStatus = 3;
  } else if (
    user.subscription_phase &&
    user.subscription_phase.status &&
    user.subscription_phase.status.includes("prepar")
  ) {
    deliveryStatus = 2;
  } else {
    deliveryStatus = 1;
  }

  if (dogsLength === 0) return null;

  return (
    <div data-cy="next-delivery-expanded" className="relative border-r mb-4 border-l bg-white rounded-xl border border-gray-300 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/5 p-8">
          <div className="flex items-center">
            <DeliveryBox />
            <div className="ml-4 font-semibold text-xl">
              Upcoming Delivery
            </div>
          </div>
          <div className="font-cooper text-3xl mt-6">
            {moment(nextDelivery).format("ddd, MMM D")}
          </div>
          <div className="font-bold mt-6">
            Order Summary
            </div>
          <div className="text-sm mt-4">
            <b>Recipes: </b>
            {readableRecipe}
            <b className="float-right">${displayPrice}</b>
          </div>
          <div className="text-sm mt-2">
            <b>Portions: </b>
            {readablePortion}
          </div>
          <div className="text-sm mt-2">
            <b>Amount: </b>
            {readablePortion}
          </div>
          <div className="flex items-center text-primary text-xs font-semibold mt-1">
            <QuestionMark className="-ml-1" />
            Read feeding guide
          </div>
        </div>
        <div className="w-full md:w-2/5 bg-deliveryStepper p-4 lg:p-8 flex justify-center items-center" data-cy="delivery-stepper" aria-label="Progress">
          <Stepper
            labels={[
              { main: "Scheduled", sub: "We have your order" },
              { main: "Preparing", sub: "We're getting things ready" },
              { main: "Delivering", sub: "Your order is out for delivery" },
            ]}
            current={deliveryStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryModal;
