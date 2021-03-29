import React, { useState } from "react";
import OrderItemModal from "../order/order-item-modal";
import "./style.css";

const FoodCard = ({
  type,
  food,
  icons,
  kibble,
  selectCookedFood,
  selectedCookedRecipes,
  selectKibbleRecipe,
  selected,
  selectedLength,
  dog,
  user,
  handleKibbleChange,
  className,
  noFixedHeight,
  customSelectButton,
  customBgImage,
}) => {
  if (!selectedCookedRecipes && !kibble) return null;

  const recipeImage = require(`../../assets/images/recipe/${food.name.split(" ").join("-")}.png`);
  const [details, openDetails] = useState(false);
  const kibbleOnlyNull = kibble.some((el) => el !== null);

  const selectedText = `bg-green-600 btn-text-white border border-green focus:outline-none p-1 md:py-0.25 w-11/12 sm:w-10/12 rounded-5lg mt-2.5 foodcard-add-button ${noFixedHeight && 'relative-button'} font-normal sm:font-bold  ${customSelectButton || 'text-sm lg:absolute lg:bottom-2 ml-0 px-2.5 py-2.5 sm:py-0.25 sm:px-1.25'}`;
  const unSelectedText = `bg-transparent border border-green-700 hover:border-transparent focus:outline-none hover:bg-green-700 hover:text-white w-11/12 sm:w-10/12 p-1 md:py-0.25 rounded-5lg border-green mt-2.5 foodcard-add-button ${noFixedHeight && 'relative-button'} font-normal sm:font-bold  ${customSelectButton || 'text-sm lg:absolute lg:bottom-2 ml-0 px-2.5 py-2.5 sm:py-0.25 sm:px-1.25'}`;
  return (
    <div>
      <div
        className={`hidden sm:block rounded-6md w-full mb-4 md:flex-row flex-col overflow-hidden ${!noFixedHeight && 'foodcard'} ${
          selected ? 'border-2 border-green bg-recipeSelection' : 'border-2 border-gray-100 bg-white'
        } ${className}`}
      >
        <div
          className={
            type === 'kibble'
              ? `bg-kibble-${food.recipe} rounded-tr-5md rounded-tl-5md p-5 w-auto  h-full flex items-center justify-center h-1/2 md:h-auto relative mealplan-meal-image`
              : `bg-${food.recipe} w-auto rounded-tr-5md rounded-tl-5md p-5 h-full flex items-center justify-center h-1/2 md:h-auto relative mealplan-meal-image`
          }
        >
          {food.new && (
            <div className="bg-label text-white px-6 py-1 rounded-tr-md text-sm font-semibold rounded-br-md absolute left-0 top-4 recipeBadge">
              <span className="font-messina">NEW</span>
            </div>
          )}

          <img src={recipeImage.default} className="h-4/5 max-h-28 md:mx-h-none" />
        </div>
        <div
          className={
            selected
              ? 'w-full rounded-br-lg rounded-bl-lg focus:bg-green-100 py-5 md:pt-4.75 flex flex-col items-center justify-between'
              : 'w-full rounded-br-lg rounded-bl-lg focus:bg-green-100 py-5 md:pt-4.75 flex flex-col items-center justify-between'
          }
        >
          <div className="font-cooper text-lg text-black leading-4 text-center">{food.name}</div>
          <div
            onClick={() => {
              openDetails(true);
            }}
            className="text-primary text-xs font-messina cursor-pointer font-medium mealplan-choose-details mt-3.25 md:mt-5 leading-none font-bold"
          >
            See Details
          </div>
          <div className="text-black font-messina font-normal pt-3.5 px-7.25 foodCardDesc text-xs md:pt-4 md:leading-4.5">{food.ingredients}</div>
          {type !== 'kibble' && user.kibble_recipes && (
            <select
              className="w-11/12 mx-auto px-3 py-3 bg-transparent border border-gray-400 rounded-0 opacity-0 hidden"
              disabled
            >
              {user.kibble_recipes
                && user.kibble_recipes.map((item, index) => <option value={index}>{item.name}</option>)}
            </select>
          )}

          {type === 'kibble' && user.kibble_recipes && (
            <select
              className="w-11/12 mx-auto px-3 py-3 bg-transparent border border-gray-400 rounded-0"
              onChange={(e) => handleKibbleChange(e.target.value)}
            >
              {user.kibble_recipes
                && user.kibble_recipes.map((item, index) => <option value={index}>{item.name}</option>)}
            </select>
          )}

          {type === 'kibble' ? (
            <button
              type="button"
              className={`${selected ? selectedText : unSelectedText} md:mt-4`}
              onClick={() => selectKibbleRecipe(food)}
              disabled={selectedLength >= 2 && !selected && !kibbleOnlyNull}
            >
              {selected ? "Remove from box" : `Add to ${ dog && dog.name }'s box`}
            </button>
          ) : (
            <button
              type="button"
              className={`${selected ? selectedText : unSelectedText} md:mt-4`}
              onClick={() => selectCookedFood(food)}
              disabled={selectedLength >= 2 && !selected}
            >
              {selected ? "Remove from box" : `Add to ${ dog && dog.name }'s box`}
            </button>
          )}
          <OrderItemModal
            item={food}
            showModal={details}
            onClose={() => {
              openDetails(false);
            }}
          />
        </div>
      </div>

      {/* -----mobile card */}
      <div
        className={`sm:hidden rounded-6md w-full h-full mb-4 flex flex-row overflow-hidden  ${
          selected ? 'border border-green bg-recipeSelection' : 'border border-gray-200 bg-white'
        } ${className || ''}`}
      >
        <div
          className={
            type === 'kibble'
              ? `bg-kibble-${food.recipe}  rounded-tl-5md p-4 px-7 h-full  flex items-center justify-center md:h-auto relative`
              : `bg-${food.recipe} h-full  rounded-tl-5md p-4 px-7 flex items-center justify-center h-1/2 md:h-auto relative`
          }
        >
          {food.new && (
            <div className="bg-label text-white px-6 py-1 rounded-tr-md text-sm font-semibold rounded-br-md absolute left-0 top-4 recipeBadge">
              <span className="font-messina">NEW</span>
            </div>
          )}
          <div
            className={`h-20 w-20 bg-contain bg-image ${customBgImage}`}
            style={{ backgroundImage: `url(${food.image_url})` }}
          />
        </div>
        <div
          className={
            selected
              ? 'w-full rounded-br-lg rounded-bl-lg focus:bg-green-100  flex flex-col  px-2 relative'
              : 'w-full rounded-br-lg rounded-bl-lg focus:bg-green-100  flex flex-col  px-2 relative'
          }
        >
          <div className="flex flex-col justify-center items-center mt-2.5">
            <div className="font-normal text-xl font-cooper text-copyPrimary">{food.name}</div>
            <div
              onClick={() => {
                openDetails(true);
              }}
              className="text-primary text-sm font-bold md:text-base font-messina cursor-pointer mt-1.25"
            >
              See Details
            </div>
          </div>

          {type === 'kibble' && user.kibble_recipes && (
            <select
              className="w-11/12 px-3 py-3 bg-transparent border border-gray-400 rounded-0 m-auto my-1"
              onChange={(e) => handleKibbleChange(e.target.value)}
            >
              {user.kibble_recipes
                && user.kibble_recipes.map((item, index) => <option value={index}>{item.name}</option>)}
            </select>
          )}

          <div className="flex justify-center">
            {type === 'kibble' ? (
              <button
                type="button"
                className={`${selected ? selectedText : unSelectedText} margin-bottom-4`}
                onClick={() => selectKibbleRecipe(food)}
                disabled={selectedLength >= 2 && !selected && !kibbleOnlyNull}
              >
                {selected ? "Remove from box" : `Add to ${ dog && dog.name }'s box`}
              </button>
            ) : (
              <button
                type="button"
                className={`${selected ? selectedText : unSelectedText} md:mt-4`}
                onClick={() => selectCookedFood(food)}
                disabled={selectedLength >= 2 && !selected}
              >
                {selected ? "Remove from box" : `Add to ${ dog && dog.name }'s box`}
              </button>
            )}
          </div>
          <OrderItemModal
            item={food}
            showModal={details}
            onClose={() => {
              openDetails(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
