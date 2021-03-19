import React from "react";
import { userSelectors } from "../../selectors/user.selectors";
import { ReactComponent as DeliveryBox } from "../../assets/images/box-colour.svg";
import Button from "../global/button.jsx";

const DeliveryModalCancelled = ({ dog, openModal }) => (
  <div data-cy="next-delivery-expanded" className="relative border-r mb-4 border-l bg-white rounded-xl border border-gray-300 overflow-hidden">
    <div className="flex flex-col md:flex-row">
      <div className="w-full p-8 flex">
        <div className="flex justify-center items-center w-1/5">
          <DeliveryBox />
        </div>
        <div className="flex flex-col ml-4 w-3/5">
          <div className="font-cooper text-3xl">
            Subscription Cancelled
          </div>
          <div className="text-sm mt-1">
            {dog.name}'s delivery is currently paused. Reactivate to schedule your next delivery.
          </div>
          <Button
            styles="w-full mt-8"
            text="Reactivate Mealplan"
            onClick={openModal}
          />
        </div>
      </div>
    </div>
  </div>
);

export default DeliveryModalCancelled;
