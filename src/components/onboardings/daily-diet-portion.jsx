import React, { Component } from "react";
import { connect } from "react-redux";
import DailyDietPortionCard from "./daily-diet-portion-card";
import { onboardingService } from '../../services';
import "./style.css";

class DailyDietPortion extends Component {
  state = {
    dietPortion: {},
    dailyPortions: {}
  };

  componentDidMount() {
    const { dietPortion } = this.props;
    this.setState({dietPortion});
  }
  
  componentWillReceiveProps(newProps) {
    const { dogId } = this.props;
    const { recipes_selected } = newProps;
    if (recipes_selected.dogId === dogId) {
      this.loadDietPortion(recipes_selected);
    }
  }

  async loadDietPortion(recipes_selected) {
    const {
      cookedRecipes,
      kibbleRecipes,
      dogId
    } = recipes_selected;
    
    const data = {
      cooked_recipes: cookedRecipes == undefined ? []: cookedRecipes,
      dog_id: dogId,
      kibble_recipe: kibbleRecipes == undefined ? null : kibbleRecipes
    };
    
    const daily_portions = await onboardingService.getDogDietPortion(data);
    this.setState({ dailyPortions: daily_portions });
  }
  
  handleSelect = (item) => {
    const { dogId } = this.props;

    this.setState({ dietPortion: item });

    let dietPortion = { title: item.title };
    if (item.kibble_portion && item.cooked_portion) {
      dietPortion = {
        ...dietPortion,
        cooked_portion: item.cooked_portion,
        kibble_portion: item.kibble_portion,
      };
    } else if (item.cooked_portion) {
      dietPortion = {
        ...dietPortion,
        cooked_portion: item.cooked_portion
      }
    } else if (item.kibble_portion) {
      dietPortion = {
        ...dietPortion,
        kibble_portion: item.kibble_portion
      }
    }
    this.props.handleDietPortion(
      dogId,
      dietPortion
    );
  }

  render() {
    const combinedWrapper =
      "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5";
    const separateWrapper =
      "md:w-1/2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 text-center";
    
    const {
      separateVersion
    } = this.props;

    const { dietPortion, dailyPortions } = this.state;

    return (
      <React.Fragment>
        <div className="w-full flex flex-col items-center">
          <div className="container flex flex-col">
            <div className="mb-3 text-center text-3xl font-normal">
              2. Select portions
            </div>
            <div className="flex justify-center">
              <div
                className={separateVersion ? separateWrapper : combinedWrapper}
              >
                { dailyPortions &&
                  dailyPortions.portions &&
                  dailyPortions.portions.map((item, idx) => (
                    <DailyDietPortionCard
                      key={idx}
                      item={item}
                      handleSelect={this.handleSelect}
                      dietPortion={dietPortion}
                      separateVersion={separateVersion}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};


const mapDispatchToProps = (dispatch) => ({
});

function mapStateToProps(state) {
  return {
    recipes_selected: state.onboarding.recipes_selected
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyDietPortion);
