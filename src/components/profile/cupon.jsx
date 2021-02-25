import React from "react";
import Input from "../global/input.jsx";
import Button from "../global/button.jsx";

import { connect } from "react-redux";

import PwdModal from "./pwd-modal";

const Cupon = () => {
  return (
    <div>
      <div className="flex-auto text-2xl font-cooper mb-3 md:mb-6">Coupons</div>

      <div class="flex items-center flex-col mb-4">
        <div class="w-full p-6 bg-promptYellow rounded-1lg">
          <h4 class="text-left text-base font-semibold mb-1">
            You have a coupon avaliable for Blake!
          </h4>
          <p class="text-left text-sm">
            Use the code <span className="font-bold"> SAVE20 </span>on your next
            delivery!
          </p>
        </div>
      </div>

      <form className="py-4" action="">
        <label className="pb-4">Enter coupon code below</label>
        <div className="w-full flex mt-4">
          <input placeholder="Promo Code" className="p-2 rounded-l-lg  border border-1 border-green   w-max webkitFillAvalible"></input>
          <button class="py-4  px-6 md:py-3 md:px-8  rounded-r-lg text-base font-bold bg-primary text-white ">
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default Cupon;
