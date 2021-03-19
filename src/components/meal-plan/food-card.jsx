import React, { useState, useEffect } from 'react';
import OrderItemModal from '../order/order-item-modal';
import chevron from '../../assets/images/chevron.svg';
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
}) => {
  if (!selectedCookedRecipes && !kibble) return null;

  const [details, openDetails] = useState(false);

  const kibbleOnlyNull = kibble.some(function (el) {
    return el !== null;
  });

  const selectedText =
    'bg-green-100 border border-green  focus:outline-none text-primary text-sm md:text-base font-bold p-1 md:py-2 md:px-5 w-4/5 rounded mt-2 foodcard-add-button';
  const unSelectedText =
    'bg-transparent border border-green-700 hover:border-transparent focus:outline-none hover:bg-green-700 text-primary hover:text-white font-bold sm:text-xs md:text-sm md:text-base w-4/5 p-1 md:py-2 md:px-5 rounded border-green  mt-2 foodcard-add-button';
  return (
    <div>
      <div
        className={`hidden sm:block rounded-6md  w-full mb-4  md:flex-row flex-col overflow-hidden foodcard ${
          selected ? `border-3 border-${food.recipe}` : `border-2 border-gray-200`
        }`}
      >
        <div
          className={
            type === 'kibble'
              ? `bg-kibble-${food.recipe} rounded-tr-5md rounded-tl-5md p-5 w-auto  h-full flex items-center justify-center h-1/2 md:h-auto relative mealplan-meal-image`
              : `bg-${food.recipe} w-auto rounded-tr-5md rounded-tl-5md p-5 h-full flex items-center justify-center h-1/2 md:h-auto relative mealplan-meal-image`
          }
        >
          {food.new && (
            <div className='bg-label text-white px-6 py-1 rounded-tr-md text-sm font-semibold rounded-br-md absolute left-0 top-4 recipeBadge'>
              <span className='font-messina'>NEW</span>
            </div>
          )}

          <img src={food.image_url} className='h-4/5 max-h-28 md:mx-h-none' />
        </div>
        <div
          className={
            selected
              ? 'w-full rounded-br-lg rounded-bl-lg bg-white focus:bg-green-100 py-5 flex flex-col items-center justify-between'
              : 'w-full rounded-br-lg rounded-bl-lg bg-white focus:bg-green-100 py-5 flex flex-col items-center justify-between'
          }
        >
          <div className='font-mackinac text-2xl text-black text-center pb-2'>{food.name}</div>
          <div
            onClick={() => {
              openDetails(true);
            }}
            className='text-primary text-sm mt-2 md:mt-1 font-messina cursor-pointer font-normal	 mealplan-choose-details'
          >
            See Details
          </div>
          <div className='text-fadeGrey font-normal py-2 px-4 text-sm foodCardDesc'>{food.ingredients}</div>
          {type !== 'kibble' && user.kibble_recipes && (
            <select
              className='w-11/12 mx-auto px-3 py-3 bg-white border border-gray-100 rounded-0 opacity-0 '
              disabled
            >
              {user.kibble_recipes &&
                user.kibble_recipes.map((item, index) => {
                  return <option value={index}>{item.name}</option>;
                })}
            </select>
          )}

          {type === 'kibble' && user.kibble_recipes && (
            <select
              className='w-11/12 mx-auto px-3 py-3 bg-white border border-gray-100 rounded-0'
              onChange={(e) => handleKibbleChange(e.target.value)}
            >
              {user.kibble_recipes &&
                user.kibble_recipes.map((item, index) => {
                  return <option value={index}>{item.name}</option>;
                })}
            </select>
          )}

          {type === 'kibble' ? (
            <button
              className={`${selected ? selectedText : unSelectedText} md:mt-4`}
              onClick={() => selectKibbleRecipe(food)}
              disabled={selectedLength >= 2 && !selected && !kibbleOnlyNull}
            >
              {selected ? 'Remove from box' : `Add to ${dog && dog.name}'s box`}
            </button>
          ) : (
            <button
              className={`${selected ? selectedText : unSelectedText} md:mt-4`}
              onClick={() => selectCookedFood(food)}
              disabled={selectedLength >= 2 && !selected}
            >
              {selected ? 'Remove from box' : `Add to ${dog && dog.name}'s box`}
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
        className={`sm:hidden rounded-6md  w-full mb-4 flex flex-row overflow-hidden  ${
          selected ? `border-3 border-${food.recipe}` : `border-2 border-gray-200`
        }`}
      >
        <div
          className={
            type === 'kibble'
              ? `bg-kibble-${food.recipe}  rounded-tl-5md p-4  w-auto  flex items-center justify-center md:h-auto relative`
              : `bg-${food.recipe} w-auto  rounded-tl-5md p-4  flex items-center justify-center h-1/2 md:h-auto relative`
          }
        >
          {food.new && (
            <div className='bg-label text-white px-6 py-1 rounded-tr-md text-sm font-semibold rounded-br-md absolute left-0 top-4 recipeBadge'>
              <span className='font-messina'>NEW</span>
            </div>
          )}
          <div className="h-20 w-20 bg-contain	" style={{backgroundImage: `url(${food.image_url})`}}></div>
        </div>
        <div
          className={
            selected
              ? 'w-full rounded-br-lg rounded-bl-lg bg-white focus:bg-green-100  flex flex-col  px-2 relative'
              : 'w-full rounded-br-lg rounded-bl-lg bg-white focus:bg-green-100  flex flex-col  px-2 relative'
          }
        >
          <div className="flex justify-between items-center mt-4">
          <div className='font-normal md:text-xl text-xs meal-name text-black '>{food.name}</div>
          <div
            onClick={() => {
              openDetails(true);
            }}
            className='text-primary text-xs md:text-base font-messina cursor-pointer'
          >
            See Details
          </div>
          </div>

          {type === 'kibble' && user.kibble_recipes && (
            <select
              className='w-11/12 px-3 py-3 bg-white border border-gray-100 rounded-0 my-1'
              onChange={(e) => handleKibbleChange(e.target.value)}
            >
              {user.kibble_recipes &&
                user.kibble_recipes.map((item, index) => {
                  return <option value={index}>{item.name}</option>;
                })}
            </select>
          )}

          {type === 'kibble' ? (
            <button
              className={`${selected ? selectedText : unSelectedText} margin-bottom-4`}
              onClick={() => selectKibbleRecipe(food)}
              disabled={selectedLength >= 2 && !selected && !kibbleOnlyNull}
            >
              {selected ? 'Remove from box' : `Add to ${dog && dog.name}'s box`}
            </button>
          ) : (
            <button
              className={`${selected ? selectedText : unSelectedText} md:mt-4`}
              onClick={() => selectCookedFood(food)}
              disabled={selectedLength >= 2 && !selected}
            >
              {selected ? 'Remove from box' : `Add to ${dog && dog.name}'s box`}
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
    </div>
  );
};

export default FoodCard;
