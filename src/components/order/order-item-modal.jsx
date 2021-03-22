import React from "react";
import Modal from "../global/modal";

export default function OrderItemModal({
  item, showModal, onClose, type
}) {
  let recipeImage
  if (type === 'kibble') {
    recipeImage = require(`../../assets/images/recipe/Chicken.png`);
  } else {
    recipeImage = require(`../../assets/images/recipe/${item?.name?.split(" ")?.join("-")}.png`);
  }
  return (
    <Modal title={`${item?.name} Meal Plan`} isOpen={showModal} onRequestClose={onClose}>
      <div className="p-6 overflow-y-auto" style={{ maxHeight: "90vh" }}>
        <div className="flex md:flex-row flex-col">
          <div className={`w-full md:w-80 bg-${item?.recipe} flex justify-center items-center py-6`}>
            <img alt="" src={recipeImage?.default} alt="recipe image" className="w-2/3" />
          </div>
          <div className="p-5 flex-col text-center md:text-left">
            <div className="font-cooper text-2xl mb-4 ">{item?.name}</div>
            <div className="text-sm mb-2">Ingredients</div>
            <div className="text-base font-semibold">{item?.ingredients}</div>
          </div>
        </div>
        <div className="flex flex-col items-center my-8">
          <div className="text-center text-sm mb-6">Guarantee analysis</div>
          {item
            && item?.analysis
            && item?.analysis?.map((one, i) => (
              <div className="grid grid-cols-2 gap:2 w-2/3 my-2" key={i}>
                <div className="font-semibold">{one[0]}</div>
                <div className="font-semibold text-right">{one[1]}</div>
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
}
