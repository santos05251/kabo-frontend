import React, { useEffect } from 'react';
import Button from '../global/button.jsx';
import PwdModal from './pwd-modal';

import AccountDetailsModal from './account-details-modal';
import AccountDetailsIcon from '../../assets/images/account-details.svg';
import PadLockIcon from '../../assets/images/pad-lock.svg';

const AccountDetails = ({ user = null, dogs = null }) => {
  const [showUpdatePwdModal, setShowUpdatePwdModal] = React.useState(false);
  const [showAccountDetailsModal, setShowAccountDetailsModal] = React.useState(
    false
  );

  const dogsName = user.dogs.map((dog) => {
    return dog.name;
  });

  const dogsBreed = user.dogs.map((dog) => {
    return dog.breed;
  });

  const dogsGender = user.dogs.map((dog) => {
    return dog.gender;
  });

  const dogsWeight = user.dogs.map((dog) => {
    return dog.weight + '' + dog.weight_unit;
  });

  const dogsAge = user.dogs.map((dog) => {
    return parseDogAge(dog).month + 'month';
  });

  return (
    <>
      <div className="rounded-xl shadow-md bg-white">
        <div className="flex shadow-sm text-2xl font-cooper font-semibold mb-3 border-b px-5 py-3">
          <img src={AccountDetailsIcon} />
          <span className="ml-2">Account Details</span>
        </div>
        <div className="px-5 py-5">
          <div className="mb-3">
            <h5 className="text-xl font-bold mb-3">{capitalizeFirstLetter(user.user.first_name)} Details</h5>
            <p className="text-sm leading-5">{user.user.email}</p>
            <p className="text-sm leading-5">{user.billing_address.phone}</p>
            <div className="py-4">
              <Button
                text="Edit"
                onClick={() => setShowAccountDetailsModal(true)}
                styles="focus:outline-none w-full"
              />
            </div>
            <div className="flex py-4">
              <img src={PadLockIcon} />
              <button
                type="button"
                onClick={() => setShowUpdatePwdModal(true)}
                className="text-primary font-bold ml-2"
              >
                Update My Password
              </button>
            </div>
          </div>
          <div>
            <h5 className="text-xl font-bold mb-4">Dog Details</h5>
            <table className="w-full">
              <tbody>
                <tr className="mb-1">
                  <th className="text-left text-sm font-bold">Doggos:</th>
                  <td className="text-sm">{dogsName.join(' and ')}</td>
                </tr>
                <tr className="mb-1">
                  <th className="text-left text-sm font-bold">Age:</th>
                  <td className="text-sm">{dogsAge.join(' and ')}</td>
                </tr>
                <tr className="mb-1">
                  <th className="text-left text-sm font-bold">Weight:</th>
                  <td className="text-sm">{dogsWeight.join(' and ')}</td>
                </tr>
                <tr className="mb-1">
                  <th className="text-left text-sm font-bold">Gender:</th>
                  <td className="text-sm">{dogsGender.join(' and ')}</td>
                </tr>
                <tr className="mb-1">
                  <th className="text-left text-sm font-bold">Breed:</th>
                  <td className="text-sm">{dogsBreed.join(' and ')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PwdModal
        showModal={showUpdatePwdModal}
        onCloseModal={() => {
          setShowUpdatePwdModal(false);
        }}
      />
      <AccountDetailsModal
        user={user}
        isOpen={showAccountDetailsModal}
        toggle={() => setShowAccountDetailsModal(false)}
      />
    </>
  );
};

export default AccountDetails;

function parseDogAge(dog) {
  var date = new Date();
  date.setMonth(date.getMonth() - dog.age_in_months);
  return {
    year: date.getFullYear(),
    month: date.toLocaleString('default', { month: 'long' }),
    day: date.getDay(),
  };
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
