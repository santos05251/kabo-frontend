import React, { Component } from "react";
import { connect } from "react-redux";
import qs from 'qs';
import LoadingCircle from "../../../components/partials/loading";
import FormInput from "../../../components/onboardings/formInput";
import BillingMethodIcon from "../../../components/global/billingMethodIcon";
import { onboardingContstants } from "../../../constants";
import { validate } from "../../../utils";
import { onboardingActions } from "../../../actions";
import { onboardingService } from '../../../services';
import { ReactComponent as FilledCircle } from "../../../assets/images/filled-circle.svg";
import Star from "../../../assets/images/star.png";
import StarGreen from "../../../assets/images/stargreen.png";
import ImgNavbarLogo from "../../../assets/images/kabo-logo-nav.svg";
import IconDeliveryAddress from "../../../assets/images/delivery-address.svg";
import IconBilling from "../../../assets/images/billing-icon.svg";
import IconPaypal from "../../../assets/images/billingMethod/paypal-icon.svg";
import ImgPaypalLogo from "../../../assets/images/paypal-logo.png";
import IconGreenCheck from "../../../assets/images/green-check.svg";
import IconCart from "../../../assets/images/cart-icon.svg";
import IconChevron from "../../../assets/images/chevron.svg";

class CheckoutStep extends Component {
  state = {
    currentStep: 0,
    validationKeys: {},
    isCartOpen: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    shippingAddress: '',
    shippingApt: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingPhoneNumber: '',
    shippingInstructions: '',
    creditCard: '',
    billingExpiration: '',
    billingCVC: '',
    sameBillingAddress: true,
    billingAddress: '',
    billingApt: '',
    billingCity: '',
    billingPostalCode: '',
    billingPhoneNumber: '',
    coupon: '',
    paypalReferenceId: '',
  };

  componentDidMount() {
    const params = qs.parse(this.props.location.search.slice(1));
    if (params.token) {
      this.getPaymentDetails(params.token);
    }
    this.getProductDetails();
    this.updateUserDetail();
  }

  componentWillReceiveProps(newProps) {
    const { post_checkout_result, posting_checkout } = newProps;
    if (post_checkout_result.status === undefined) {
      return;
    }
    if (posting_checkout) {
      this.setState({ isLoading: true });
    } else {
      this.setState({ isLoading: false });
    }
    if (post_checkout_result.status && post_checkout_result.token) {
      const email = post_checkout_result.email ? post_checkout_result.email : this.state.email;
      const user = { email, token: post_checkout_result.token };
      localStorage.setItem('user', JSON.stringify(user));
      this.props.history.push('/checkout/success');
    } else if (!post_checkout_result.status) {
      if (post_checkout_result.error) {
        alert(post_checkout_result.error);
      } else {
        alert('Subscription failure, Please contact support!');
      }
    }
  }

  // from user step: first name, email
  updateUserDetail = () => {
    const account = JSON.parse(localStorage.getItem("account"));
    if (account == null || !account.details)
      return;
    
    this.setState({email: account.details.email});
    this.setState({firstName: account.details.first_name});
  }

  getPaymentDetails = (token) => {
    this._getPaymentDetails(token)
  }
  async _getPaymentDetails(token) {
    this.setState({ isLoading: true });
    const paymentMethodDetails = await onboardingService.getPaymentMethodDetails({token});
    if (paymentMethodDetails && paymentMethodDetails.reference_id) {
      this.setState({paypalReferenceId: paymentMethodDetails.reference_id});
    }
    this.setState({ isLoading: false });
  }

  openPaypalRedirect = () => {
    this._openPaypalRedirect()
  }
  async _openPaypalRedirect() {
    const { temp_user } = this.props;
    if (!temp_user.checkout_token) {
      alert("Checkout token is not set!");
      return;
    }

    this.setState({ isLoading: true });
    const paypal_redirect = await onboardingService.getPaypalRedirect({checkout_token: temp_user.checkout_token});
    if (paypal_redirect && paypal_redirect.url) {
      window.location.href = paypal_redirect.url;
    }
    this.setState({ isLoading: false });
  }

  getProductDetails = () => {
    const { coupon } = this.state;

    const account = JSON.parse(localStorage.getItem("account"));
    if (account == null || !account.details)
      return;

    const data = {
      id: account.id,
      details: {
        step: "account",
        first_name: account.details.first_name,
        email: account.details.email,
        referral_code: coupon.length <= 0 ? null : coupon
      }
    };
    this.props.updateTempUser(data);
  }

  updateBilling = (sameBillingAddress) => {
    this.setState({sameBillingAddress});

    if (sameBillingAddress) {
      this.setState({
        billingAddress: '',
        billingApt: '',
        billingCity: '',
        billingPostalCode: '',
        billingPhoneNumber: ''
      });
    }
  }

  purchase = () => {
    this._purchase();
  }
  async _purchase() {
    const {
      validationKeys,
      firstName,
      lastName,
      email,
      password,
      shippingAddress,
      shippingApt,
      shippingCity,
      shippingPostalCode,
      shippingPhoneNumber,
      shippingInstructions,
      creditCard,
      billingExpiration,
      billingCVC,
      sameBillingAddress,
      billingAddress,
      billingApt,
      billingCity,
      billingPostalCode,
      billingPhoneNumber,
      coupon,
      paypalReferenceId,
    } = this.state;
    const { temp_user } = this.props;
    if (!temp_user.checkout_token) {
      alert("Checkout token is not set!");
      return;
    }

    this.setState({ isLoading: true });

    validationKeys['first_name'] = firstName.length > 0;
    validationKeys['last_name'] = lastName.length > 0;
    validationKeys['email'] = validate.validateEmail(email);
    validationKeys['password'] = password.length >= 6;
    if (!validationKeys['first_name'] || !validationKeys['last_name'] || !validationKeys['email'] || !validationKeys['password']) {
      this.setState({ isLoading: false, validationKeys, currentStep: 0 });
      this.forceUpdate();
      return;
    }
    validationKeys['shipping_address'] = shippingAddress.length > 0;
    validationKeys['shipping_city'] = shippingCity.length > 0;
    validationKeys['shipping_postal_code'] = validate.validatePostalCode(shippingPostalCode);
    validationKeys['shipping_phone_number'] = shippingPhoneNumber.length > 0;
    if (!validationKeys['shipping_address'] && !validationKeys['shipping_city'] && !validationKeys['shipping_postal_code'] && !validationKeys['shipping_phone_number']) {
      this.setState({ isLoading: false, validationKeys, currentStep: 1 });
      this.forceUpdate();
      return;
    }
    validationKeys['credit_card'] = validate.validateCreditCard(creditCard.replace(/ /g, ''));
    validationKeys['billing_expiration'] = validate.validateExpireDate(billingExpiration);
    validationKeys['billing_cvc'] = validate.validateCvc(billingCVC);
    let bBillingAddress = true;
    if (!sameBillingAddress) {
      validationKeys['billing_address'] = billingAddress.length > 0;
      validationKeys['billing_city'] = billingCity.length > 0;
      validationKeys['billing_postal_code'] = validate.validatePostalCode(billingPostalCode);
      validationKeys['billing_phone_number'] = billingPhoneNumber.length > 0;
      if (validationKeys['billing_address'] && validationKeys['billing_city'] && validationKeys['billing_postal_code'] && validationKeys['billing_phone_number']) {
        bBillingAddress = true;
      }
      else {
        bBillingAddress = false;
      }
    }
    if (!validationKeys['credit_card'] || !validationKeys['billing_expiration'] | validationKeys['billing_cvc'] || !bBillingAddress) {
      this.setState({ isLoading: false, validationKeys, currentStep: 2 });
    }

    let details = {
      email,
      password,
      shipping_first_name: firstName,
      shipping_last_name: lastName,
      shipping_street_address: shippingAddress,
      shipping_apt_suite: shippingApt,
      shipping_city: shippingCity,
      shipping_postal_code: shippingPostalCode,
      shipping_phone_number: shippingPhoneNumber,
      shipping_delivery_instructions: shippingInstructions,
      same_as_billing_address: sameBillingAddress,
      billing_first_name: firstName,
      billing_last_name: lastName,
      billing_street_address: billingAddress,
      billing_apt_suite: billingApt,
      billing_city: billingCity,
      billing_postal_code: billingPostalCode,
      billing_phone_number: billingPhoneNumber,
      referral_code: coupon.length <= 0 ? null : coupon
    };
    if (paypalReferenceId.length <= 0) {
      details.payment_method = "stripe";
      details.stripe_type = "card";
      details.credit_number = creditCard.replace(/ /g, '');
      details.exp_date = billingExpiration;
      details.cvc = billingCVC
    } else {
      details.payment_method = "paypal";
      details.reference_id = paypalReferenceId;
    }

    const data = {
      checkout_token: temp_user.checkout_token,
      details
    };
    this.props.postCheckout(data);
    this.setState({ isLoading: false });
  }

  handleContactInformation = () => {
    const { validationKeys, firstName, lastName, email, password } = this.state;
    validationKeys['first_name'] = firstName.length > 0;
    validationKeys['last_name'] = lastName.length > 0;
    validationKeys['email'] = validate.validateEmail(email);
    validationKeys['password'] = password.length >= 6;
    if (validationKeys['first_name'] && validationKeys['last_name'] && validationKeys['email'] && validationKeys['password']) {
      this.setState({ validationKeys, currentStep: 1 });
    }
    else {
      this.forceUpdate();
    }
  };

  openShippingAddress = () => {
    const { currentStep } = this.state;
    if (currentStep < 1) return;
    this.setState({ currentStep: 1 });
  };

  handleShippingAddress = () => {
    const { validationKeys, shippingAddress, shippingCity, shippingPostalCode, shippingPhoneNumber } = this.state;
    validationKeys['shipping_address'] = shippingAddress.length > 0;
    validationKeys['shipping_city'] = shippingCity.length > 0;
    validationKeys['shipping_postal_code'] = validate.validatePostalCode(shippingPostalCode);
    validationKeys['shipping_phone_number'] = shippingPhoneNumber.length > 0;
    if (validationKeys['shipping_address'] && validationKeys['shipping_city'] && validationKeys['shipping_postal_code'] && validationKeys['shipping_phone_number']) {
      this.setState({ validationKeys, currentStep: 2 });
    }
    else {
      this.forceUpdate();
    }
  };

  openBillingInformation = () => {
    const { currentStep } = this.state;
    if (currentStep < 2) return;
    this.setState({ currentStep: 2 });
  };

  handleBillingInformation = () => {
    const { validationKeys, creditCard, billingExpiration, billingCVC, sameBillingAddress, billingAddress, billingCity, billingPostalCode, billingPhoneNumber } = this.state;
    validationKeys['credit_card'] = validate.validateCreditCard(creditCard.replace(/ /g, ''));
    validationKeys['billing_expiration'] = validate.validateExpireDate(billingExpiration);
    validationKeys['billing_cvc'] = validate.validateCvc(billingCVC);

    let bBillingAddress = true;
    if (!sameBillingAddress) {
      validationKeys['billing_address'] = billingAddress.length > 0;
      validationKeys['billing_city'] = billingCity.length > 0;
      validationKeys['billing_postal_code'] = validate.validatePostalCode(billingPostalCode);
      validationKeys['billing_phone_number'] = billingPhoneNumber.length > 0;
      if (validationKeys['billing_address'] && validationKeys['billing_city'] && validationKeys['billing_postal_code'] && validationKeys['billing_phone_number']) {
        bBillingAddress = true;
      }
      else {
        bBillingAddress = false;
      }
    }

    if (validationKeys['credit_card'] && validationKeys['billing_expiration'] && validationKeys['billing_cvc'] && bBillingAddress) {
      this.setState({ validationKeys, currentStep: 3 });
    }
    else {
      this.forceUpdate();
    }
  };

  handleCart = () => {
    const { isCartOpen } = this.state;
    this.setState({ isCartOpen: !isCartOpen });
  };

  render() {
    const { applied_referral_code, temp_dogs } = this.props.temp_user;
    const { currentStep, validationKeys, isCartOpen, isLoading } = this.state;
    return (
      <main className="h-auto flex flex-col md:flex-row">
        { isLoading &&
          <LoadingCircle />
        }
        <div className="md:flex-1 order-2 md:order-1 bg-white">
          <div className="px-2 md:px-20 py-4 md:py-10 flex flex-col gap-3">
            <div className="hidden md:flex items-center justify-center pb-2 md:pb-4">
              <img src={ImgNavbarLogo} alt="" />
            </div>
            <div className="flex flex-col border border-green border-opacity-20	rounded-lg shadow">
              <div
                className="p-4 flex bg-white cursor-pointer"
                onClick={ () => this.setState({ currentStep: 0 }) }
              >
                <span className="font-cooper font-bold text-lg">
                  Contact Information
                </span>
                { currentStep > 0 &&
                  <img className="ml-auto" src={IconGreenCheck} alt="" />
                }
              </div>
              { currentStep === 0 && 
                <div>
                  <hr className="text-gray-300" />
                  <div className="p-4 flex flex-col gap-3 bg-gray-50">
                    <div className="flex flex-col md:flex-row gap-3 justify-between">
                      <FormInput
                        className="flex-1 p-2 flex flex-col border rounded-md"
                        label="FIRST NAME"
                        required
                        validation={validationKeys['first_name']}
                        value={ this.state.firstName }
                        onChange={ (value) => this.setState({ firstName: value }) }
                      />
                      <FormInput
                        className="flex-1 p-2 flex flex-col border rounded-md"
                        label="LAST NAME"
                        required
                        validation={validationKeys['last_name']}
                        value={ this.state.lastName }
                        onChange={ (value) => this.setState({ lastName: value }) }
                      />
                    </div>
                    <FormInput
                      className="p-2 flex flex-col border rounded-md"
                      label="EMAIL ADDRESS"
                      type="email"
                      required
                      validation={validationKeys['email']}
                      value={ this.state.email }
                      onChange={ (value) => this.setState({ email: value }) }
                    />
                    <FormInput
                      className="p-2 flex flex-col border rounded-md"
                      label="PASSWORD"
                      type="password"
                      required
                      validation={validationKeys['password']}
                      validationText="Password should be at least 6 characters"
                      value={ this.state.password }
                      onChange={ (value) => this.setState({ password: value }) }
                    />
                    <button
                      className="w-full px-6 py-4 font-messina text-center text-white text-xl focus:outline-none transition-colors duration-150 bg-green-600 rounded-md focus:shadow-outline hover:bg-green-700 cursor-pointer"
                      onClick={this.handleContactInformation}>
                      Continue to shipping
                    </button>
                  </div>
                </div>
              }
            </div>

            <div className="flex flex-col border border-green border-opacity-20	rounded-lg shadow">
              <div
                className="p-4 flex items-center bg-white cursor-pointer"
                onClick={this.openShippingAddress}
              >
                <img className="pr-3" src={IconDeliveryAddress} alt="" />
                <span className="font-cooper font-bold text-lg">
                  Shipping Address
                </span>
                { currentStep > 1 &&
                  <img className="ml-auto" src={IconGreenCheck} alt="" />
                }
              </div>
              { currentStep === 1 &&
                <div>
                  <hr className="text-gray-300" />
                  <div className="p-4 flex flex-col gap-3 bg-gray-50">
                    <FormInput
                      className="p-2 flex flex-col border rounded-md"
                      label="STREET ADDRESS"
                      placeholder="Enter Street Address"
                      required
                      validation={validationKeys['shipping_address']}
                      value={ this.state.shippingAddress }
                      onChange={ (value) => this.setState({ shippingAddress: value }) }
                    />
                    <div className="flex flex-col md:flex-row gap-3 justify-between">
                      <FormInput
                        className="flex-1 p-2 flex flex-col border rounded-md"
                        label="APT / SUITE #"
                        placeholder="Optional"
                        validation={validationKeys['shipping_apt']}
                        value={ this.state.shippingApt }
                        onChange={ (value) => this.setState({ shippingApt: value }) }
                      />
                      <FormInput
                        className="flex-1 p-2 flex flex-col border rounded-md"
                        label="CITY"
                        placeholder="Enter City Name"
                        required
                        validation={validationKeys['shipping_city']}
                        value={ this.state.shippingCity }
                        onChange={ (value) => this.setState({ shippingCity: value }) }
                      />
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 justify-between">
                      <FormInput
                        className="flex-1 p-2 flex flex-col border rounded-md"
                        label="POSTAL CODE"
                        type="postal"
                        placeholder="Enter Postal Code"
                        required
                        validation={validationKeys['shipping_postal_code']}
                        validationText="Sorry! Kabo is not available in your area"
                        value={ this.state.shippingPostalCode }
                        onChange={ (value) => this.setState({ shippingPostalCode: value }) }
                      />
                      <FormInput
                        className="flex-1 p-2 flex flex-col border rounded-md"
                        label="PHONE NUMBER"
                        type="phone"
                        placeholder="Enter Phone Number"
                        required
                        validation={validationKeys['shipping_phone_number']}
                        value={ this.state.shippingPhoneNumber }
                        onChange={ (value) => this.setState({ shippingPhoneNumber: value }) }
                      />
                    </div>
                    <FormInput
                      className="p-2 flex flex-col border rounded-md"
                      label="SPECIAL DELIVERY INSTRUCTIONS"
                      type="instructions"
                      options={ onboardingContstants.SPECIAL_DELIVERY_INSTRUCTIONS }
                      placeholder="(i.e. buzzer, leave with security, etc.)"
                      validation={validationKeys['shipping_instructions']}
                      value={ this.state.shippingInstructions }
                      onChange={ (value) => this.setState({ shippingInstructions: value }) }
                    />
                    <button
                      className="w-full px-6 py-4 font-messina text-center text-white text-xl focus:outline-none transition-colors duration-150 bg-green-600 rounded-md focus:shadow-outline hover:bg-green-700 cursor-pointer"
                      onClick={this.handleShippingAddress}
                    >
                      Continue to shipping
                    </button>
                  </div>
                </div>
              }
            </div>

            <div className="flex flex-col border border-green border-opacity-20	rounded-lg shadow">
              <div
                className="p-4 flex flex-col md:flex-row bg-white cursor-pointer"
                onClick={ this.openBillingInformation }
              >
                <div className="flex items-center">
                  <img className="pr-3" src={IconBilling} alt="" />
                  <span className="font-cooper font-bold text-lg">
                    Billing Information
                  </span>
                </div>
                <div className="flex md:ml-auto">
                  <BillingMethodIcon />
                  <img className="w-12 ml-1 px-1" src={IconPaypal} alt="" />
                </div>
              </div>
              { currentStep === 2 &&
                <div>
                  <hr className="text-gray-300" />
                  <div className="p-4 flex flex-col gap-3 bg-gray-50">
                    <FormInput
                      className="p-2 flex flex-col border rounded-md"
                      label="CREDIT CARD NUMBER"
                      type="credit"
                      placeholder="1234 1234 1234 1234"
                      required
                      validation={validationKeys['credit_card']}
                      value={ this.state.creditCard }
                      onChange={ (value) => this.setState({ creditCard: value }) }
                    />
                    <div className="flex flex-col md:flex-row gap-3 justify-between">
                      <FormInput
                        className="flex-1 p-2 flex flex-col border rounded-md"
                        label="EXPIRATION"
                        type="expiration"
                        placeholder="MM / YY"
                        required
                        validation={validationKeys['billing_expiration']}
                        value={ this.state.billingExpiration }
                        onChange={ (value) => this.setState({ billingExpiration: value }) }
                      />
                      <FormInput
                        className="flex-1 p-2 flex flex-col border rounded-md"
                        label="CVC"
                        placeholder="CVC"
                        required
                        validation={validationKeys['billing_cvc']}
                        maxLength="4"
                        value={ this.state.billingCVC }
                        onChange={ (value) => this.setState({ billingCVC: value }) }
                      />
                    </div>
                    <div className="py-2 w-full">
                      <input
                        type="checkbox"
                        className="rounded font-light text-gray-700 border-gray-300 border mr-3 px-3 py-2 outline-none focus:border-black"
                        defaultChecked={this.state.sameBillingAddress}
                        onClick={(event) => this.updateBilling(event.target.checked)}
                      />
                      <label className="font-messina text-md">
                        My billing address is the same as my shipping address
                      </label>
                    </div>
                    { !this.state.sameBillingAddress && 
                      <div className="flex flex-col gap-3">
                        <FormInput
                          className="p-2 flex flex-col border rounded-md"
                          label="STREET ADDRESS"
                          placeholder="Enter Street Address"
                          required
                          validation={validationKeys['billing_address']}
                          value={ this.state.billingAddress }
                          onChange={ (value) => this.setState({ billingAddress: value }) }
                        />
                        <div className="flex flex-col md:flex-row gap-3 justify-between">
                          <FormInput
                            className="flex-1 p-2 flex flex-col border rounded-md"
                            label="APT / SUITE #"
                            placeholder="Optional"
                            validation={validationKeys['billing_apt']}
                            value={ this.state.billingApt }
                            onChange={ (value) => this.setState({ billingApt: value }) }
                          />
                          <FormInput
                            className="flex-1 p-2 flex flex-col border rounded-md"
                            label="CITY"
                            placeholder="Enter City Name"
                            required
                            validation={validationKeys['billing_city']}
                            value={ this.state.billingCity }
                            onChange={ (value) => this.setState({ billingCity: value }) }
                          />
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 justify-between">
                          <FormInput
                            className="flex-1 p-2 flex flex-col border rounded-md"
                            label="POSTAL CODE"
                            type="postal"
                            placeholder="Enter Postal Code"
                            validation={validationKeys['billing_postal_code']}
                            value={ this.state.billingPostalCode }
                            onChange={ (value) => this.setState({ billingPostalCode: value }) }
                          />
                          <FormInput
                            className="flex-1 p-2 flex flex-col border rounded-md"
                            label="PHONE NUMBER"
                            type="phone"
                            placeholder="Enter Phone Number"
                            required
                            validation={validationKeys['billing_phone_number']}
                            value={ this.state.billingPhoneNumber }
                            onChange={ (value) => this.setState({ billingPhoneNumber: value }) }
                          />
                        </div>
                      </div>
                    }
                    <button
                      className="w-full px-6 py-4 font-messina text-center text-white text-xl focus:outline-none transition-colors duration-150 bg-green-600 rounded-md focus:shadow-outline hover:bg-green-700 cursor-pointer"
                      onClick={this.handleBillingInformation}>
                      Continue to shipping
                    </button>
                    <div className="my-2 flex items-center">
                      <hr className="flex-1"/>
                      <span className="px-3 text-black">OR</span>
                      <hr className="flex-1"/>
                    </div>
                    <div
                      className="w-full py-4 px-10 my-2 flex items-center justify-center text-indigo-100 transition-colors duration-150 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500"
                      onClick={this.openPaypalRedirect}>
                      <img className="w-24" src={ImgPaypalLogo} alt="PayPal" />
                    </div>
                    <div className="text-sm font-light font-messina text-gray-400 text-center">
                      By clicking "Purchase", you're agreeing to a no-commitment, recurring subscription. After your trial, feel free to email us at any time should you need to pause or cancel your order.
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="md:flex-1 order-1 md:order-2">
          <div className="flex md:hidden flex-col">
            <div className="flex items-center justify-center px-4 py-4 bg-white">
              <img src={ImgNavbarLogo} alt="" />
            </div>
            <div
              className="flex items-center px-6 py-4 cursor-pointer border-t border-b border-gray-300"
              onClick={ this.handleCart }>
              <img src={IconCart} alt="" />
              <span className="ml-4 font-messina text-lg">Show Order Summary</span>
              <img className={`ml-4 transform ${isCartOpen ? 'rotate-180' : 'rotate-0'}`} src={IconChevron} alt="" />
              <span className="ml-auto font-messina font-medium text-base">
                {
                  temp_dogs &&
                  temp_dogs.length > 0 &&
                  temp_dogs[0].checkout_estimate.priceTotal.details ? temp_dogs[0].checkout_estimate.priceTotal.details : ''
                }
              </span>
            </div>
          </div>
          <div className={`${isCartOpen ? 'flex' : 'hidden'} md:flex flex-col gap-3 px-2 md:px-10 py-4 md:py-10`}>
            <div className="text-3xl font-cooper text-black text-center">
              Try risk free for 30 days
            </div>
            <div className="my-4 text-base font-messina text-black text-center font-light">
              Money back guarantee
            </div>
            <div className="flex flex-col">
              <div className="text-gray-700 text-md py-1">
                Have a coupon code?
              </div>
              <div className="flex justify-between">
                <div className="w-9/12">
                  <input
                    className="w-full rounded border-gray-300 border px-3 py-2 outline-none focus:border-black"
                    value={this.state.coupon}
                    onChange={(event) => this.setState({coupon: event.target.value})}
                  />
                </div>
                <div className="ml-2 flex-1">
                  <button className="w-full py-2 px-6 text-center text-white focus:outline-none transition-colors duration-150 bg-green-600 rounded-md focus:shadow-outline hover:bg-green-700" onClick={this.getProductDetails}>
                    Apply
                  </button>
                </div>
              </div>
              { applied_referral_code &&
                <div className="py-1 w-12/12">
                  <div className="bg-green-100 py-3">
                    <h1 className="text-center text-1xl">
                      { applied_referral_code }
                    </h1>
                  </div>
                </div>
              }
            </div>
            <div className="flex flex-col sticky top-0">
              <hr className="w-10/12 text-gray-300 mx-auto my-10" />
              {
                temp_dogs &&
                temp_dogs.length > 0 &&
                temp_dogs.map((dogItem, idx) => (
                  <div className="flex flex-col px-3" key={idx}>
                    <div className="flex flex-col">
                      <h3 className="text-center text-2xl">
                        {dogItem.name ? dogItem.name : ''}'s first box
                      </h3>
                      <h3 className="text-center py-2">
                        { dogItem.checkout_estimate.productDescription[0] ? dogItem.checkout_estimate.productDescription[0] : ''}
                      </h3>
                    </div>
                    {
                      dogItem.checkout_estimate.mealplanInfo &&
                      dogItem.checkout_estimate.mealplanInfo.length > 0 &&
                      <div className="flex justify-center">
                        <div className="w-full bg-white rounded border border-gray-300 px-3 py-5">
                          {
                            dogItem.checkout_estimate.mealplanInfo.map((item, idx) => (
                              <div className="flex justify-between mb-1" key={idx}>
                                <h3 className="text-gray-600">{item}</h3>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    }
                    <div className="flex justify-center py-2">
                      <div className="w-full py-5">
                        {
                          dogItem.checkout_estimate.priceDetails &&
                          dogItem.checkout_estimate.priceDetails.map((item, idx) => (
                            <div className="flex justify-between mb-1" key={idx}>
                              <h3 className="text-gray-600">{item.title}</h3>
                              <h3 className="text-gray-600">{item.details}</h3>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                ))
              }
              <div className="flex justify-center py-5">
                <div className="w-full">
                  <hr className="text-gray-300" />
                </div>
              </div>
              <div className="flex justify-between">
                <h3 className="text-black text-2xl">Total Due</h3>
                <h3 className="text-black text-2xl">
                  {
                    temp_dogs &&
                    temp_dogs.length > 0 &&
                    temp_dogs[0].checkout_estimate.priceTotal.details ? temp_dogs[0].checkout_estimate.priceTotal.details : ''
                  }
                </h3>
              </div>
              <div className="flex justify-center px-3 py-2">
                <div className="w-full">
                  <div className="py-7">
                    <div className="py-2 flex">
                      <FilledCircle className="rounded-full  h-5 w-5" />
                      <p className="text-gray-600 px-3">
                        No Commitment. Pause or cancel at any time after your trial.
                      </p>
                    </div>
                    <div className="flex">
                      <FilledCircle className=" rounded-full  h-5 w-5" />
                      <p className="text-gray-600 px-3">
                        We'll refund your order 100% if your dog doesn't like the
                        food.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-1 w-12/12">
                <button className="bg-gray-800 w-full py-3 text-center text-white text-2xl focus:outline-none focus:text-green-600	cursor-pointer" onClick={this.purchase}>
                  Purchase
                </button>
              </div>
              <div>
                <p className="text-center text-gray-600 px-5 py-5">
                  By clicking "Purchase", you're agreeing to a no-commitment, recurring subscription. After your trial, feel free to email us at any time should you need to pause or cancel your order.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="bg-green-300 py-1 px-1 mx-1">
                  <img src={Star} alt="" />
                </div>
                <div className="bg-green-300 py-1 px-1 mx-1">
                  <img src={Star} alt="" />
                </div>{" "}
                <div className="bg-green-300 py-1 px-1 mx-1">
                  <img src={Star} alt="" />
                </div>{" "}
                <div className="bg-green-300 py-1 px-1 mx-1">
                  <img src={Star} alt="" />
                </div>
                <div className="bg-green-300 py-1 px-1 mx-1">
                  <img src={Star} alt="" />
                </div>
              </div>
              <div className="flex justify-center py-5  text-2xl">
                Related &nbsp; <span className="font-bold ">Excellent</span>{" "}
                &nbsp;on &nbsp;
                <span className=" ">
                  {" "}
                  <img className="h-7" src={StarGreen} alt="" />{" "}
                </span>{" "}
                &nbsp;Trustpilot
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateTempUser: (payload) =>
    dispatch(onboardingActions.updateTempUser(payload)),
  postCheckout: (payload) =>
    dispatch(onboardingActions.postCheckout(payload)),
});

function mapStateToProps(state) {
  return {
    temp_user: state.onboarding.temp_user,
    post_checkout_result: state.onboarding.post_checkout_result,
    posting_checkout: state.onboarding.posting_checkout,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutStep);
