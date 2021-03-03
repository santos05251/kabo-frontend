import React from "react";
import "./style.css";

const Steps = ({ completePercent }) => {
  return (
    <section className="flex flex-col items-center">
      <div className="on-boarding-form-container md:px-0 px-4 pt-6 md:pt-4">
        <div className="flex justify-between pb-3">
          {[
            { title: "Sign up" },
            { title: "Recipes & Portions" },
            { title: "Checkout" },
          ].map((item, idx) => {
            return (
              <div key={idx}>
                <p className="text-xs">{item.title}</p>
              </div>
            );
          })}
        </div>
        <div id="myProgress" className="rounded-lg">
          <div id="myBar" className={`rounded-lg w-${completePercent}`} />
        </div>
      </div>
    </section>
  );
};

export default Steps;
