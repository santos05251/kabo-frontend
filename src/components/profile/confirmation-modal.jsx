import React from 'react';
import Modal from '../global/modal';
import DogHumanIcon from '../../assets/images/dog-human.svg';

const ConfirmationModal = ({ isOpen, toggle, handleStep }) => {
    
    const navigateToPauseOptions = () => {
        handleStep(2)
        toggle()
    }

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

                <div className="mt-10 mb-10 text-center">
                    <p className="text-3xl font-bold font-sans">We can Help!</p>
                    <p className="mt-4 font-normal">Reach out to us to let us know how we can <br /> assist you.</p>
                    <button className="rounded-md mt-10 py-2 px-10 border-2 border-green-600 text-green-600 font-medium focus:outline-none">
                        Contact Us
                    </button>
                    <br/>
                    <button 
                        className="text-green-600 mt-3 font-medium"
                        onClick={navigateToPauseOptions}
                    >
                    No, I want to still pause
                    </button>
                </div>
            </div>
        </Modal>
    </React.Fragment> 
    );
}
 
export default ConfirmationModal;