import React, { Component } from 'react';
import LoadingCircle from '../../components/partials/loading';
import MealPlanSelect from '../../components/meal-plan/meal-plan-select';
import "./style.css";

class RecipeSelection extends Component {
  handleChange = (selectedDog) => {
    this.props.selectedDog(selectedDog);
  };
  state = {
    localkribbleRecipies: [],
    selecTedKbRecipie: [],
  };
  componentDidMount() {
    let { user,selectedKibble } = this.props;
    if (user && user.kibble_recipes) {
      let oneItem = [];
      oneItem.push(user.kibble_recipes[0]);
      this.setState({ localkribbleRecipies: user.kibble_recipes, selecTedKbRecipie: oneItem });
    }

  }
  handleKibbleChange = (index) => {
    let oneItem = [];
    oneItem.push(this.state.localkribbleRecipies[index]);
    this.setState({selecTedKbRecipie: oneItem})
  };
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
      <div className='w-full flex flex-col lg:py-1 items-center bg-white'>
        <div className='w-full'>
          <>
            <div>
              <div className='font-sofiaPro text-fadeGrey font-extrabold pt-5 bg-white text-2xl customContainer mx-auto pb-5'>
                What's in {dog && dog.name}'s Box (Choose up to 2 and click Save Changes):
              </div>
            </div>
            <div className='grid w-full mx-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 grid-cols-1 xl:gap-6'>
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
        </div>
      </div>
    );
  }
}

export default RecipeSelection;
