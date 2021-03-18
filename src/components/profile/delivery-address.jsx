import React from 'react';
import Button from "../global/button.jsx";
import DeliveryAddressModal from "./delivery-address-modal";
import DeliveryAddressIcon from '../../assets/images/delivery-address.svg';

class DeliveryAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryAddress: {
        first_name: '',
        last_name: '',
        line1: '',
        line2: '',
        city: '',
        zip: '',
        delivery_instructions: '',
      },
      isAddressModalOpen: false,
    };
    this.editDeliveryAddress = this.editDeliveryAddress.bind(this);
  }

  componentDidMount() {
    this.setState({
      deliveryAddress: {
        ...this.state.deliveryAddress,
        ...this.props.deliveryAddress,
      },
    });
  }

  editDeliveryAddress() {
    this.setState({ isAddressModalOpen: true });
  }

  toggleAddressModal = () => {
    this.setState({ isAddressModalOpen: !this.state.isAddressModalOpen });
  };

  render() {
    const { deliveryAddress } = this.state;
    return (
      <>
        <div className="rounded-xl shadow-md bg-white">
          <div className="flex shadow-sm text-2xl font-cooper font-semibold mb-3 border-b px-5 py-3">
            <img src={DeliveryAddressIcon} />
            <span className="ml-2">Delivery Address</span>
          </div>
          <div className="px-5 py-3">
            <div>
              {deliveryAddress.line2 && (
                <span className="inline-block">
                  Apt #{deliveryAddress.line2},
                </span>
              )}

              {deliveryAddress.line1 && (
                <span className="inline-block">{deliveryAddress.line1},</span>
              )}

              {deliveryAddress.city && (
                <span className="inline-block">{deliveryAddress.city}</span>
              )}
            </div>

            {deliveryAddress.delivery_instructions && (
              <div>
                Special Instructions: {deliveryAddress.delivery_instructions}
              </div>
            )}

            <div className="py-2">
              <Button
                text="Edit"
                onClick={this.editDeliveryAddress}
                styles="focus:outline-none w-full"
              />
            </div>
            <DeliveryAddressModal
              isOpen={this.state.isAddressModalOpen}
              toggle={this.toggleAddressModal}
              deliveryAddress={deliveryAddress}
            />
          </div>
        </div>
      </>
    );
  }
}

export default DeliveryAddress;
