import React, { useState } from "react";
import Modal from "../global/modal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Divider from "../divider/index.jsx";
import PayPalIcon from "../../assets/images/paypal-logo.png";
import StripeForm from "./stripe-elements/";
import BillingMethodIcon from "../global/billingMethodIcon";

const stripePromise = loadStripe("pk_test_pk5H5N8H1PQ3qujf7YW2MWqN00IWiJzjsM");
const ChangePaymentMethodModal = ({
  isOpen,
  toggle,
  updatePaymentMethod,
  updating_payment_method,
  payment_billing_address,
  setBillingAddress,
}) => {
  const [isAppend, setIsAppend] = useState(true);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggle}
      title="Change Payment Method"
      isAppend={!isAppend}
    >
      <div className="py-5 px-5 overflow-x-hidden">
        <button className="w-full py-2 px-6 flex flex-col focus:outline-none items-center content-center text-indigo-100 transition-colors duration-150 bg-yellow-300 rounded-lg focus:shadow-outline hover:bg-yellow-400">
          <img src={PayPalIcon} alt="PayPal" width="100px" />
        </button>
        <div className="mt-5">
          <Divider text="OR" />
        </div>
        <div className="flex mt-2 mb-2">
          <BillingMethodIcon />
        </div>
        <Elements stripe={stripePromise}>
          <StripeForm
            isAppend={isAppend}
            setIsAppend={setIsAppend}
            payment_billing_address={payment_billing_address}
            setBillingAddress={setBillingAddress}
            updatePaymentMethod={updatePaymentMethod}
            updating_payment_method={updating_payment_method}
          />
        </Elements>
      </div>
    </Modal>
  );
};

export default ChangePaymentMethodModal;
