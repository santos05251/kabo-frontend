import React, { useState } from "react";
import Input from "../global/input.jsx";
import Button from "../global/button.jsx";

import { connect } from "react-redux";

import PwdModal from "./pwd-modal";

const Cupon = ({ addCoupon, couponResponse, userError }) => {
  const [coupon, setCoupon] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (coupon) {
      addCoupon({ coupon_code: coupon, coupon: coupon });
    }
  };
  return (
    <div>
      <div className="flex-auto text-2xl font-cooper mb-3 md:mb-6">Coupons</div>

      <form className="py-4" action="" onSubmit={handleSubmit}>
        <label className="pb-4">Enter coupon code below</label>
        <div className="w-full flex mt-4">
          <input
            disabled={couponResponse}
            placeholder="Promo Code"
            className={`${
              couponResponse ? "bg-green-100" : ""
            } p-2 rounded-l-lg  border border-1 border-green   w-max webkitFillAvalible`}
            onChange={(e) => setCoupon(e.target.value)}
            defaultValue={couponResponse ? couponResponse.coupon : ""}
          />
          <button
            disabled={couponResponse}
            class="py-4  px-6 md:py-3 md:px-8  rounded-r-lg text-base font-bold bg-primary text-white "
            type="submit"
          >
            Apply
          </button>
        </div>
        {couponResponse && (
          <div class="text-primary text-xs font-messina mt-1">
            Your coupon has been succssfully applied! See on your next billing
          </div>
        )}
        {userError && (
          <div class="text-red-500 text-xs font-messina mt-1">{userError}</div>
        )}
      </form>
    </div>
  );
};

export default Cupon;
