import React, { Component } from 'react';
import LoadingCircle from '../../components/partials/loading';
import Modal from "../../components/global/modal";
import MealPlanSelect from '../../components/meal-plan/meal-plan-select';
import "./style.css";

class RecipeSelection extends Component {
  state = {
    showMealPlanModal: null
  }

  handleChange = (selectedDog) => {
    this.props.selectedDog(selectedDog);
  };
  state = {
    localkribbleRecipies: [],
    selecTedKbRecipie: [],
  };

  componentDidMount() {
    let { user, selectedKibble } = this.props;
    if (user && user.kibble_recipes) {
      let oneItem = [];
      oneItem.push(user.kibble_recipes[0]);
      this.setState({ localkribbleRecipies: user.kibble_recipes, selecTedKbRecipie: oneItem });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedLength !== this.props.selectedLength && this.props.selectedLength > 1 && !this.state.showMealPlanModal) {
      this.setState({
        showMealPlanModal: true,
      })
    }
  }

  handleKibbleChange = (index) => {
    let oneItem = [];
    oneItem.push(this.state.localkribbleRecipies[index]);
    this.setState({ selecTedKbRecipie: oneItem })
  };

  onClose = () => {
    this.setState({
      showMealPlanModal: false,
    })
  }

  render() {
    const {
      user,
      index,
      selectedKibble,
      isKibble,
      toggleKibble,
      selectedDog,
      handleSelectedKibbleRecipe,
      handleSelectedCookedRecipes,
      selectedCookedRecipes,
      selectedLength,
      showCooked,
      showKibble,
      onConfirm,
      dog,
    } = this.props;

    return (
      <div className='w-full flex flex-col lg:py-1 items-center'>
        <div className='w-full'>
          <>
            <div>
              <div className='font-messina text-fadeGrey font-medium pt-1 sm:pt-5 sm:bg-white text-md mx-auto pb-4 sm:pb-8'>
                What's in {dog && dog.name}'s Box (Choose up to 2 and click Save Changes):
              </div>
            </div>
            <div className='grid w-full mx-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 grid-cols-1 gap-2 sm:gap-4'>
              {user.cooked_recipes && (
                <MealPlanSelect
                  dog={dog}
                  type='cooked'
                  index={index}
                  recipes={user.cooked_recipes}
                  handleSelectedCookedRecipes={handleSelectedCookedRecipes}
                  selectedCookedRecipes={selectedCookedRecipes}
                  selectedKibble={selectedKibble}
                  selectedDog={selectedDog}
                  selectedLength={selectedLength}
                  user={user}
                />
              )}

              {user.kibble_recipes && (
                <MealPlanSelect
                  type='kibble'
                  recipes={this.state.selecTedKbRecipie}
                  selectedKibbleRecipe={handleSelectedKibbleRecipe}
                  selectedKibble={selectedKibble}
                  selectedCookedRecipes={selectedCookedRecipes}
                  toggleKibble={toggleKibble}
                  isKibble={isKibble}
                  selectedDog={selectedDog}
                  selectedLength={selectedLength}
                  dog={dog}
                  user={user}
                  handleKibbleChange={this.handleKibbleChange}
                />
              )}
            </div>
          </>
          <Modal
            isOpen={this.state.showMealPlanModal}
            onRequestClose={this.onClose}
            noSpacingheader
            closeIconClassName="absolute top-4.5 right-3.5 md:top-4 md:right-3.25"
            modalClassName="max-w-137"
            customBorderRaduis="md:rounded-2.5xl"
          >
            <div className="min-h-screen md:min-h-0 meal-plan-modal">
              <div className="font-messina font-bold text-2xl text-copyPrimary leading-8 pt-6.75 pl-5.2 md:hidden">Edit Recipes</div>
              <div className="font-messina font-bold text-4xl text-copyPrimary leading-none pt-8.25 pl-5.2 hidden md:block md:px-9.25">Recipe Summary</div>
              <p className="font-messina font-bold text-sm md:text-lg leading-8 pl-5.2 md:px-9.25 md:pt-4 pt-1">*Please remove a recipe to select a new one</p>
              <div className="pt-3.5 px-3 md:pt-5 md:px-9.25 md:grid w-full mx-auto md:grid-cols-2 md:grid-cols-2 md:gap-12">
                {user.cooked_recipes && user.cooked_recipes.some((i) => selectedCookedRecipes.includes(i.recipe)) && (
                  <MealPlanSelect
                    dog={dog}
                    type='cooked'
                    index={index}
                    recipes={user.cooked_recipes.filter((i) => selectedCookedRecipes.includes(i.recipe))}
                    handleSelectedCookedRecipes={handleSelectedCookedRecipes}
                    selectedCookedRecipes={selectedCookedRecipes}
                    selectedKibble={selectedKibble}
                    selectedDog={selectedDog}
                    selectedLength={selectedLength}
                    user={user}
                    foodCardClassName="mb-6.75 md:mb-16.6 md:h-auto"
                    noFixedHeight
                    customSelectButton="md:relative md:bottom-0 lg:relative lg:bottom-0 text-xs leading-8 md:mt-0.75 p-0.25 sm:p-0.25 max-w-39.5"
                    customFoodCardBgImage="w-24 h-24"
                  />
                )}
                {user.kibble_recipes && user.kibble_recipes.some((i) => selectedKibble.includes(i.recipe)) && (
                <MealPlanSelect
                  type='kibble'
                  recipes={this.state.selecTedKbRecipie.filter((i) => selectedKibble.includes(i.recipe))}
                  selectedKibbleRecipe={handleSelectedKibbleRecipe}
                  selectedKibble={selectedKibble}
                  selectedCookedRecipes={selectedCookedRecipes}
                  toggleKibble={toggleKibble}
                  isKibble={isKibble}
                  selectedDog={selectedDog}
                  selectedLength={selectedLength}
                  dog={dog}
                  user={user}
                  handleKibbleChange={this.handleKibbleChange}
                  foodCardClassName="mb-6.75 md:mb-16.6"
                  noFixedHeight
                  customSelectButton="md:relative md:bottom-0 lg:relative lg:bottom-0 text-xs leading-8 md:mt-0.75 p-0.25 sm:p-0.25 max-w-39.5"
                  customFoodCardBgImage="w-24 h-24"
                />
              )}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default RecipeSelection;
