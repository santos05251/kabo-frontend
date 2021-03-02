import React from "react";
import Modal from "../global/modal";
import { DeliveryAddress } from "../profile/delivery-address";

const DeliveryAddressModal = ({ isOpen, toggle }) => {
  return (
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggle}
        title="Update Mailing Address"
      >
        <div className="p-5">
          <DeliveryAddress />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default DeliveryAddressModal;
