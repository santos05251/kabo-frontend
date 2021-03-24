import React, { useState } from 'react';
import CouponsIcon from '../../assets/images/coupons.svg';
import DogSelector from '../../components/account/dog-selector';
import SpinButton from '../../components/global/spinButton';
const Cupon = ({ applyCouponPerDog, couponResponsePerDog, userError, dogs, isApplying, couponResponse }) => {
  const [coupon, setCoupon] = useState(couponResponse && couponResponse.coupon ? couponResponse.coupon : '');
  const [dogIndex, setDogIndex] = useState(0);

  const handleSubmit = () => {
    if (coupon) {
      const data = {
        dog_id: dogs[dogIndex].id,
        details: {
          coupon_code: coupon,
        }
      };
      applyCouponPerDog(data);
    }
  };

  return (
    <div className="rounded-xl shadow-md bg-white">
      <div className="flex shadow-sm text-2xl font-cooper font-semibold mb-3 border-b px-5 py-3">
        <img src={CouponsIcon} />
        <span className="ml-2">Coupons</span>
      </div>

      <div className="px-5 pt-3 pb-8">
        <label>Enter coupon code below</label>
        <div className="my-2">
          {dogs &&
            dogs.length > 1 && (
              <DogSelector
                dogs={dogs}
                setDog={setDogIndex}
                dogIndex={dogIndex}
              />
            )}
        </div>
        <div className="w-full flex mt-2">
          <input
            disabled={couponResponsePerDog}
            placeholder="Promo Code"
            className={`${couponResponsePerDog ? 'bg-green-100' : ''
              } p-2 rounded-l-lg  border border-1 border-green   w-max webkitFillAvalible`}
            onChange={(e) => setCoupon(e.target.value)}
            defaultValue={coupon}
          />
          <SpinButton
            text="Apply"
            loadingText="Applying"
            disabled={couponResponsePerDog}
            className="py-2 px-4 md:py-4 md:px-6 rounded-r-lg text-base font-bold bg-primary text-white"
            isFinished={!isApplying}
            handleClick={handleSubmit}
          />
        </div>
        {couponResponsePerDog && (
          <div class="text-primary text-xs font-messina mt-1">
            Your coupon has been successfully applied! See on your next billing
          </div>
        )}
        {userError && (
          <div class="text-red-500 text-xs font-messina mt-1">
            {userError}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cupon;
