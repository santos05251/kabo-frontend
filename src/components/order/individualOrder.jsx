import React from 'react';
import Modal from '../../components/global/modal';

export default function IndividualOrder({ item, dogs, coupon, shippingAddress, showModal, onClose }) {

  const getPets = (dogs) => {
    let returns = '';
    if (dogs.length > 0 ) {
      dogs.map((dog)=> {
        if (returns !== '') {
          returns += ' and ' + dog.name;
        } else {
          returns += dog.name;
        }
      });
    }
    return returns;
  }
  const pets = getPets(dogs);

  return (
    <Modal
      title={'Invoice'}
      isOpen={showModal}
      onRequestClose={onClose}
      isOrderLogo={true}
    >
      <div className="w-full p-5 font-messina">
        <div className="flex justify-between mb-10">
          <div className="w-2/5 uppercase font-bold">
            Invoice Id
          </div>
          <div className="w-3/5">
            {item && item.invoice_id}
          </div>
        </div>
        <div className="flex justify-between mb-10">
          <div className="w-2/5 uppercase font-bold">
            Amount
          </div>
          <div className="w-3/5">
            {item && item.total}
          </div>
        </div>
        <div className="flex justify-between mb-10">
          <div className="w-2/5 uppercase font-bold">
            Discount
          </div>
          <div className="w-3/5">
            {coupon !== '' && coupon}
          </div>
        </div>
        <div className="flex justify-between mb-10">
          <div className="w-2/5 uppercase font-bold">
            Summary
          </div>
          <div className="w-3/5">
            {item && item.plan}
          </div>
        </div>
        <div className="flex justify-between mb-10">
          <div className="w-2/5 uppercase font-bold">
            Order Date
          </div>
          <div className="w-3/5">
            {item && item.date}
          </div>
        </div>
        <div className="flex justify-between mb-10">
          <div className="w-2/5 uppercase font-bold">
            Pets
          </div>
          <div className="w-3/5">
            {pets}
          </div>
        </div>
        <div className="flex justify-between mb-10">
          <div className="w-2/5 uppercase font-bold">
            Shipping Address
          </div>
          <div className="w-3/5">
            <span>{shippingAddress.line1}</span>
            <br />
            <span>{shippingAddress.zip} {shippingAddress.city} {shippingAddress.country}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-2/5 uppercase font-bold">
            Status
          </div>
          <div className="w-3/5">
            {item && item.payment_status}
          </div>
        </div>
      </div>
    </Modal>
  );
}
