import React, {useEffect} from 'react';
import Modal from '../global/modal';
import { connect } from 'react-redux';
import { userActions } from '../../actions/index.js';

import Input from '../global/input.jsx';

const AccountDetailsModal = ({
  user = null,
  updateUserPhoneEmail,
  isOpen,
  toggle
}) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [submitted,setSubmitted] = React.useState(false);

  useEffect(() => {
    if (user.shipping_address) {
      setPhoneNumber(user.billing_address.phone);
      setEmail(user.billing_address.email);
    }
  }, [user]);

  const phoneEmailSubmitHandler = () => {
    let apiObject = {
      email: email,
      phone_number: phoneNumber,
    };
    updateUserPhoneEmail(apiObject) && setSubmitted(true);
  };

  return (
    <Modal title="Account Details" isOpen={isOpen} onRequestClose={toggle}>
      <div className="p-5">
        <Input
          inputValue={user.user.email}
          name="EMAIL ADDRESS"
          size="md:w-2/5 w-full mb-2"
          styles="mr-2.5"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="tel"
          inputValue={phoneNumber}
          name="PHONE NUMBER"
          size="w-full md:w-2/5"
          onChange={setPhoneNumber}
        />
        <button
          type="submit"
          className="bg-primary text-white rounded-xl font-semibold py-2.5 px-6 mt-8"
          onClick={phoneEmailSubmitHandler}
        >
          Save Changes
        </button>
        {submitted && <div className="text-primary text-xs font-messina mt-1" >Your changes have been saved</div>}
      </div>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserPhoneEmail: (data) =>
      dispatch(userActions.updateUserPhoneEmail(data)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AccountDetailsModal);
