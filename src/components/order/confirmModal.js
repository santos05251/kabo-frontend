import Modal from '../../components/global/modal';
import moment from 'moment'
const ConfirmModal = ({ onClose, showModal, dog, user, onConfirm,estimate}) => {
  return (
    <Modal isOpen={showModal} onRequestClose={onClose} bgColor='bg-green-700' isSmall={true}>
      <div className='bg-green-700 p-4'>
        <p className='text-white text-3xl font-bold font-messina'>
          Starting{' '}
          {user &&
            user.subscription_phase &&
            moment(user.subscription_phase.changes_applied_delivery_date).format('MMM Do')}
          ,{dog && dog.name} will recive a 56% Cooked portion of Hearty Turkey.Your new price will
          be <u>{estimate && estimate}</u>
        </p>
        <p className='mt-4 text-lg font-bold text-white'>
          Please email help@kabo.co for any question
        </p>
        <button
          onClick={() => onConfirm()}
          className='btn bg-white rounded text-green-700 w-full py-3 mt-4 font-cooper'
        >
          Yes, Confirm Change
        </button>
        <p className='w-full text-center text-white font-cooper mt-4' onClick={onClose}>
          Nevermind
        </p>
      </div>
    </Modal>
  );
};
export default ConfirmModal;
