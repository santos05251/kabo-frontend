import React, { Component } from 'react';
import LoadingCircle from '../../components/partials/loading';
import MealPlanSelect from '../../components/meal-plan/meal-plan-select';

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
      <div className='w-full flex flex-col lg:py-9 items-center bg-white'>
        <div className='w-full'>
          <>
            <div>
              <div className='font-messina font-bold pt-5 text-black bg-white text-2xl customContainer mx-auto pb-5'>
                What's in {dog && dog.name}'s Box (Choose up to 2 and click Save Changes):
              </div>
            </div>
            <div className='grid w-full mx-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 grid-cols-1 gap-6'>
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

        {/* {showKibble && (
            <div>
              {!user.kibble_recipes ? (
                <LoadingCircle />
              ) : (
                showKibble && (
                  <>
                    <div className='w-11/12 mx-auto'>
                      <div className='mb-6 text-xl text-center md:text-left'>Kibble</div>
                    </div>
                    <div className='grid w-11/12 mx-auto  grid-cols-2 md:grid-cols-3 gap-6 '>
                      <MealPlanSelect
                        type='kibble'
                        recipes={user.kibble_recipes}
                        selectedKibbleRecipe={handleSelectedKibbleRecipe}
                        selectedKibble={selectedKibble}
                        selectedCookedRecipes={selectedCookedRecipes}
                        toggleKibble={toggleKibble}
                        isKibble={isKibble}
                        selectedDog={selectedDog}
                        selectedLength={selectedLength}
                      />
                    </div>
                  </>
                )
              )}
            </div>
          )} */}
      </div>
    );
  }
}

export default RecipeSelection;
