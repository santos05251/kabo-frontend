import React, { Component } from "react";
import Modal from "../global/modal";
import doggo from '../../assets/images/doggo.svg';

class ReactivationSuccessModal extends Component {
  state = {};
  render() {
    const { isOpen, onRequestClose, onConfirmClick } = this.props;
    return (
      <Modal
        title={''}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 md:flex-row px-8 md:px-12">
          <div className="flex flex-col">
            <div className="text-3xl font-semibold font-messina">
              Welcome back!
            </div>
            <div className="mt-7 md:mt-3 text-sm font-messina">
              Can't wait for your doggos's next meal!
            </div>
            <button className="w-10/12 mt-10 md:mt-14 px-4 py-4 md:px-6 md:py-4 text-white text-center rounded-lg bg-green-600 focus:outline-none hover:bg-green-700" onClick={onConfirmClick}>
              Back to account settings
            </button>
          </div>
          <img src={doggo} className="mt-16 md:mt-0" />
        </div>
      </Modal>
    );
  }
}

export default ReactivationSuccessModal;
