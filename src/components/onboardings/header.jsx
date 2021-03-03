import React from "react";

const Header = ({coupon}) => {
  return (
    <div>
      { coupon != undefined && coupon != '' &&
        <div className="alert py-3 text-center">
          <h2>Surprise! We applied a {coupon}% discount to your first order</h2>
        </div>
      }
    </div>
  );
};

export default Header;
