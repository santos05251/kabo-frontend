import React from 'react';
import Modal from '../global/modal';
import { connect } from 'react-redux';
import { userActions } from '../../actions/index.js';

import Input from '../global/input.jsx';

class DeliveryAddressModal extends React.Component {
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
      clean: true,
      submitted: false,
    };
    this.changeAddress = this.changeAddress.bind(this);
    this.mySubmit = this.mySubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      deliveryAddress: {
        ...this.state.deliveryAddress,
        ...newProps.deliveryAddress,
      },
    });
  }

  changeAddress(e, target) {
    this.setState({
      deliveryAddress: {
        ...this.state.deliveryAddress,
        [target]: e.target.value,
      },
      clean: false,
    });
  }
  mySubmit(e) {
    e.preventDefault();
    const { deliveryAddress } = this.state;
    const apiObject = {
      shipping_first_name: deliveryAddress.first_name,
      shipping_last_name: deliveryAddress.last_name,
      shipping_street_address: deliveryAddress.line1,
      shipping_apt_suite: deliveryAddress.line2,
      shipping_city: deliveryAddress.city,
      shipping_postal_code: deliveryAddress.zip,
      shipping_delivery_instructions: deliveryAddress.delivery_instructions,
    };
    this.props.updateAddress(apiObject) && this.setState({ submitted: true });
  }

  render() {
    const { isOpen, toggle } = this.props;
    const { deliveryAddress, clean, submitted } = this.state;

    return (
      <Modal title="Delivery Address" isOpen={isOpen} onRequestClose={toggle}>
        <div className="p-5">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                required
                name="FIRST NAME"
                onChange={(e) => this.changeAddress(e, 'first_name')}
                inputValue={deliveryAddress.first_name}
              />
              <Input
                required
                name="LAST NAME"
                onChange={(e) => this.changeAddress(e, 'last_name')}
                inputValue={deliveryAddress.last_name}
              />
              <Input
                required
                name="STREET ADDRESS"
                onChange={(e) => this.changeAddress(e, 'line1')}
                inputValue={deliveryAddress.line1}
              />
              <Input
                name="APT/SUITE"
                onChange={(e) => this.changeAddress(e, 'line2')}
                inputValue={deliveryAddress.line2}
              />
              <Input
                required
                name="CITY"
                inputValue={deliveryAddress.city}
                onChange={(e) => this.changeAddress(e, 'city')}
              />
              <Input
                required
                name="POSTAL CODE"
                inputValue={deliveryAddress.zip}
                onChange={(e) => this.changeAddress(e, 'zip')}
              />
            </div>
            <Input
              name="SPECIAL DELIVERY INSTRUCTIONS"
              type="large"
              inputValue={deliveryAddress.delivery_instructions}
              onChange={(e) => this.changeAddress(e, 'delivery_instructions')}
            />
            {submitted && (
              <div className="text-primary text-xs font-messina mt-1">
                Your changes have been saved
              </div>
            )}
            <button
              type="submit"
              className="bg-primary text-white rounded-xl font-semibold py-2.5 px-6 mt-8"
              onClick={this.mySubmit}
              disabled={clean}
            >
              Save Changes
            </button>
          </form>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAddress: (data) => dispatch(userActions.updateDeliveryAddress(data)),
  };
};

export default connect(null, mapDispatchToProps)(DeliveryAddressModal);
