import React, { Component } from "react";
import Modal from "../global/modal";
import doggo from '../../assets/images/doggo.svg';

class WelcomeModal extends Component {
  state = {};
  render() {
    const { isOpen, onRequestClose, onConfirmClick, userName } = this.props;
    return (
      <Modal
        title={''}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 md:flex-row px-8 md:px-12">
          <div className="flex flex-col">
            <div className="text-3xl font-semibold font-messina">
              Hi, {userName}!
            </div>
            <div className="mt-7 md:mt-3 text-sm font-messina">
              Welcome to Herbert's My Kabo account!
            </div>
            <button className="w-8/12 mt-10 md:mt-14 px-4 py-4 md:px-6 md:py-4 text-white text-center rounded-lg bg-green-600 focus:outline-none hover:bg-green-700" onClick={onConfirmClick}>
              Get Started
            </button>
          </div>
          <img src={doggo} className="mt-16 md:mt-0" />
        </div>
      </Modal>
    );
  }
}

export default WelcomeModal;
