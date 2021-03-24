import React from 'react';
import Modal from '../global/modal';
import DogHumanIcon from '../../assets/images/dog-human.svg';
import Divider from '../../components/divider';

const ConfirmationModal = ({ isOpen, toggle }) => {

    return (
    <React.Fragment>
        <Modal
          isOpen={isOpen}
          onRequestClose={toggle}
        >
            <div className="grid grid-cols-1">
                <div className="bg-green-50 pt-10 text-center">
                    <img
                        src={DogHumanIcon}
                        alt="dog-human-icon"
                        width="150"
                        className="ml-auto mr-auto block"
                    />
                </div>

                <div className="mt-10 mb-10 lg:px-20 text-center">
                    <p className="text-3xl font-bold font-cooper text-copyPrimary">We can Help!</p>
                    <p className="mt-4 font-medium text-xl font-messina text-copyPrimary">Our Kabo FAQ has got you covered</p>
                    <button className="rounded-md mt-5 py-2 w-1/3 border-2 border-green text-primary font-messina focus:outline-none">
                        Go to FAQ
                    </button>
                    <p className="mt-3 font-messina">Reach out to our Care Team at &nbsp;
                        <a href="#" className="text-primary font-messina">help@kabo.co</a>
                    </p>
                    <Divider/>
                    <button
                        className="text-primary mt-3 font-messina"
                        onClick={toggle}
                    >
                    No, I want to still pause/cancel
                    </button>
                </div>
            </div>
        </Modal>
    </React.Fragment>
    );
}

export default ConfirmationModal;
