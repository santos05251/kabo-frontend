import React, { Component } from "react";
import Modal from "../global/modal";
import EditPlan from "../../pages/meal-plan";
import ArrowBack from "../../assets/images/arrow.png";

class SelectMealPlanModal extends Component {
  state = {};
  render() {
    const { isOpen, toggle, dogIndex } = this.props;
    return (
      <Modal
        title={
          <p className="flex">
            {" "}
            <img
              src={ArrowBack}
              alt="Back Arrow"
              width="20px"
              height="20px"
              className="mr-2 cursor-pointer"
              onClick={toggle}
            />{" "}
            Select a Meal Plan
          </p>
        }
        isOpen={isOpen}
        onRequestClose={toggle}
        isLarge={true}
      >
        <EditPlan match={{ params: { id: dogIndex } }} />
      </Modal>
    );
  }
}

export default SelectMealPlanModal;
