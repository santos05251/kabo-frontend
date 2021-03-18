import React, { useState } from 'react';
import CouponsIcon from '../../assets/images/coupons.svg';

const Cupon = ({ addCoupon, couponResponse, userError }) => {
  const [coupon, setCoupon] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (coupon) {
      addCoupon({ coupon_code: coupon, coupon: coupon });
    }
  };
  return (
    <div className="rounded-xl shadow-md bg-white">
      <div className="flex shadow-sm text-2xl font-cooper font-semibold mb-3 border-b px-5 py-3">
        <img src={CouponsIcon} />
        <span className="ml-2">Coupons</span>
      </div>

      <div className="px-5 py-3">
        <form action="" onSubmit={handleSubmit}>
          <label>Enter coupon code below</label>
          <div className="w-full flex mt-2">
            <input
              disabled={couponResponse}
              placeholder="Promo Code"
              className={`${
                couponResponse ? 'bg-green-100' : ''
              } p-2 rounded-l-lg  border border-1 border-green   w-max webkitFillAvalible`}
              onChange={(e) => setCoupon(e.target.value)}
              defaultValue={couponResponse ? couponResponse.coupon : ''}
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
            <div class="text-red-500 text-xs font-messina mt-1">
              {userError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Cupon;
