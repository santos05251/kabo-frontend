import React, { useState } from "react";
import OrderItemModal from "../order/order-item-modal";

const FoodCard = ({
  type,
  food,
  selectedKibble,
  handleSelectedCookedRecipes,
  selectedCookedRecipes,
  handleSelectedKibbleRecipe,
  selected,
  selectedLength
}) => {
  if (!selectedCookedRecipes && !selectedKibble) return null

  const [details, openDetails] = useState(false);
  const kibbleOnlyNull = selectedKibble.some(function (el) {
    return el !== null;
  });

  const selectedText = "bg-green-700 border border-green-700 hover:border-transparent focus:outline-none text-white text-sm md:text-base font-bold p-1 md:py-2 md:px-5 w-4/5 rounded-xl mt-2"
  const unSelectedText = "bg-transparent border border-green-700 hover:border-transparent focus:outline-none hover:bg-green-700 text-primary hover:text-white font-bold text-sm md:text-base w-4/5 p-1 md:py-2 md:px-5 rounded-xl border-green  mt-2"
  return (
    <div className={`rounded-6md  w-full mb-4  md:flex-row flex-col overflow-hidden  ${selected ? `border-3 border-${food.recipe}`: `border-2 border-gray-200`}`}>
      <div
        className={
          type === "kibble"
            ? `bg-kibble-${food.recipe} rounded-tr-5md rounded-tl-5md p-5 w-auto  h-full flex items-center justify-center h-1/2 md:h-auto relative`
            : `bg-${food.recipe} w-auto rounded-tr-5md rounded-tl-5md p-5 h-full flex items-center justify-center h-1/2 md:h-auto relative`
        }
      >
        {food.new && (
          <div className="bg-label text-white px-6 py-1 rounded-tr-md text-sm font-semibold rounded-br-md absolute left-0 top-4 recipeBadge">
            <span className="font-messina">NEW</span>
          </div>
        )}

        <img src={food.image_url} className="h-4/5 max-h-28 md:mx-h-none" />
      </div>
      <div
        className={
          selected
            ? "w-full rounded-br-lg rounded-bl-lg bg-green-100 focus:bg-green-100 py-5 flex flex-col items-center justify-between"
            : "w-full rounded-br-lg rounded-bl-lg bg-white focus:bg-green-100 py-5 flex flex-col items-center justify-between"
        }
      >
        <div className="font-normal md:text-xl text-sm text-black text-center">
          {food.name}
        </div>
        <div onClick={() => { openDetails(true) }} className="text-primary font-bold text-sm md:text-base mt-2 md:mt-1 font-messina cursor-pointer">See Details</div>
        {type === "kibble" ? (
          <button
            className={`${selected ? selectedText : unSelectedText} md:mt-3`}
            onClick={() => handleSelectedKibbleRecipe(food)}
            disabled={selectedLength >= 2 && !selected && !kibbleOnlyNull}
          >
            {selected ? 'Remove Recipe' : 'Add Recipe'}
          </button>
        ) : (
            <button
              className={`${selected ? selectedText : unSelectedText} md:mt-3`}
              onClick={() => handleSelectedCookedRecipes(food)}
              disabled={selectedLength >= 2 && !selected}
            >
              {selected ? 'Remove Recipe' : 'Add Recipe'}
            </button>
          )}
        <OrderItemModal item={food} showModal={details} onClose={() => { openDetails(false) }} />
      </div>
    </div>
  );
};

export default FoodCard;
