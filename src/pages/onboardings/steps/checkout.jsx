import React, { Component } from "react";
import { connect } from "react-redux";
import qs from 'qs';
import { onboardingActions } from "../../../actions";
import { onboardingService } from '../../../services';
import { ReactComponent as FilledCircle } from "../../../assets/images/filled-circle.svg";
import Star from "../../../assets/images/star.png";
import StarGreen from "../../../assets/images/stargreen.png";
import CreateAccount from "../../../assets/images/create-account.svg";
import ShippingInfo from "../../../assets/images/shipping-info.svg";
import Billing from "../../../assets/images/billing.svg";
import ImgTrusted from "../../../assets/images/verisign-trusted.png";
import ImgCreditCard from "../../../assets/images/credit-card.png";
import Divider from "../../../components/divider";
import LoadingCircle from "../../../components/partials/loading";
import CreditCardInput from "../../../components/onboardings/credit-card-input";
import ExpirationInput from "../../../components/onboardings/expiration-input";
import { validate } from "../../../utils";

class CheckoutStep extends Component {
  state = {
    email: '',
    password: '',
    shippingFirstName: '',
    shippingLastName: '',
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
    billingFirstName: '',
    billingLastName: '',
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
    this.setState({shippingFirstName: account.details.first_name});
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
        billingFirstName: '',
        billingLastName: '',
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
      email,
      password,
      shippingFirstName,
      shippingLastName,
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
      billingFirstName,
      billingLastName,
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
    if (!validate.validateEmail(email)) {
      this.setState({ isLoading: false });
      alert("Please fill correct e-mail!");
      return;
    }
    if (password.length < 6) {
      this.setState({ isLoading: false });
      alert("Password should be at least 6 characters!");
      return;
    }
    if (shippingFirstName.length <= 0 || shippingLastName.length <= 0 || shippingAddress.length <= 0 || shippingCity.length <= 0 || shippingPostalCode.length <= 0 || shippingPhoneNumber.length <= 0) {
      this.setState({ isLoading: false });
      alert("Please fill shipping details!");
      return;
    }
    const validatePostalCode = await onboardingService.validatePostalCode({postal_code: shippingPostalCode});
    if (!validatePostalCode || !validatePostalCode.valid) {
      this.setState({ isLoading: false });
      alert("We're not in your area yet!");
      return;
    }
    if (!validate.validateCreditCard(creditCard.replace(/ /g, ''))) {
      this.setState({ isLoading: false });
      alert("Credit card number is not correct!");
      return;
    }
    if (!validate.validateExpireDate(billingExpiration)) {
      this.setState({ isLoading: false });
      alert("Billing expiration date is not correct!");
      return;
    }
    if (!validate.validateCvc(billingCVC)) {
      this.setState({ isLoading: false });
      alert("Billing CVC is not correct!");
      return;
    }
    if (!sameBillingAddress) {
      if (billingFirstName.length <= 0 || billingLastName.length <= 0 || billingAddress.length <= 0 || billingCity.length <= 0 || billingPostalCode.length <= 0 || billingPhoneNumber.length <= 0) {
        this.setState({ isLoading: false });
        alert("Please fill billing details!");
        return;
      }
      const validatePostalCode2 = await onboardingService.validatePostalCode({postal_code: billingPostalCode});
      if (!validatePostalCode2 || !validatePostalCode2.valid) {
        this.setState({ isLoading: false });
        alert("We're not in your area yet!");
        return;
      }
    }

    let details = {
      email,
      password,
      shipping_first_name: shippingFirstName,
      shipping_last_name: shippingLastName,
      shipping_street_address: shippingAddress,
      shipping_apt_suite: shippingApt,
      shipping_city: shippingCity,
      shipping_postal_code: shippingPostalCode,
      shipping_phone_number: shippingPhoneNumber,
      shipping_delivery_instructions: shippingInstructions,
      same_as_billing_address: sameBillingAddress,
      billing_first_name: billingFirstName,
      billing_last_name: billingLastName,
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

  render() {
    const { applied_referral_code, temp_dogs } = this.props.temp_user;
    const { isLoading } = this.state;
    
    return (
      <main className="h-auto md:flex md:px-12 px-0 md:py-10 py-0">
        { isLoading &&
          <LoadingCircle />
        }
        <div className="md:flex-1 md:px-5 px-0">
          <div className="bg-white md:rounded-md md:shadow-lg md:border outline-none px-3 md:px-8 pt-3 md:py-6">
            <div className="text-2xl font-sans text-gray-700 px-6 text-center">
              Try risk free for 30 days - money back guarantee
            </div>
            
            <div className="my-5 px-5">
              <hr className="text-gray-300" />
            </div>

            <div className="w-full py-4 px-10 my-6 flex items-center justify-center text-indigo-100 transition-colors duration-150 bg-yellow-300 rounded-md cursor-pointer hover:bg-yellow-400" onClick={this.openPaypalRedirect}>
              <img
                src="/static/media/paypal-logo.23de6718.png"
                alt="PayPal"
                width="100px"
              />
            </div>

            <div className="my-4">
              <Divider text="or" />
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="flex my-3">
                  <img className="pr-3" src={CreateAccount} alt="" />
                  <span className="text-gray-700 text-lg">
                    Create an Account
                  </span>
                </div>

                <div className="my-3">
                  <label className="text-gray-700">
                    Email <span className="text-red-500 pl-1">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full text-gray-700 rounded border-gray-300 border px-3 py-2 outline-none focus:border-black"
                    value={this.state.email}
                    onChange={(event) => this.setState({email: event.target.value})} />
                </div>

                <div className="my-3">
                  <label className="text-gray-700">
                    Password <span className="text-red-500 pl-1">*</span>
                  </label>
                  <input
                    type="password"
                    className="w-full text-gray-700 rounded border-gray-300 border px-3 py-2 outline-none focus:border-black"
                    value={this.state.password}
                    onChange={(event) => this.setState({password: event.target.value})}
                  />
                </div>

                <div className="my-5">
                  <hr className="text-gray-300" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex my-3">
                  <img className="pr-3" src={ShippingInfo} alt="" />

                  <span className="text-gray-700 text-lg">
                    Shipping Information
                  </span>
                </div>

                <div className="flex justify-between my-3">
                  <div className="flex-1">
                    <label className="text-gray-700">
                      First Name<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input
                      className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                      value={this.state.shippingFirstName}
                      onChange={(event) => this.setState({shippingFirstName: event.target.value})}
                    />
                  </div>

                  <div className="flex-1 pl-3">
                    <label className="text-gray-700">
                      Last Name<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input
                      className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                      value={this.state.shippingLastName}
                      onChange={(event) => this.setState({shippingLastName: event.target.value})}
                    />
                  </div>
                </div>

                <div className="my-3">
                  <label className="py-3 text-gray-700">
                    Street Address<span className="text-red-500 pl-1">*</span>
                  </label>
                  <input
                    className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                    value={this.state.shippingAddress}
                    onChange={(event) => this.setState({shippingAddress: event.target.value})}
                  />
                </div>

                <div className="flex justify-between my-3">
                  <div className="flex-1">
                    <label className="text-gray-700">Apt/Suite</label>
                    <input
                      className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                      value={this.state.shippingApt}
                      onChange={(event) => this.setState({shippingApt: event.target.value})}
                    />
                  </div>

                  <div className="flex-1 pl-3">
                    <label className="text-gray-700">
                      City<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input
                      className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                      value={this.state.shippingCity}
                      onChange={(event) => this.setState({shippingCity: event.target.value})}
                    />
                  </div>
                </div>

                <div className="flex justify-between my-3">
                  <div className="flex-1">
                    <label className="py-3 text-gray-700">
                      Postal Code<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input
                      className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                      value={this.state.shippingPostalCode}
                      onChange={(event) => this.setState({shippingPostalCode: event.target.value})}
                    />
                  </div>

                  <div className="flex-1 pl-3">
                    <label className="py-3 text-gray-700">
                      Phone Number<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input
                      className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                      value={this.state.shippingPhoneNumber}
                      onChange={(event) => this.setState({shippingPhoneNumber: event.target.value})}
                    />
                  </div>
                </div>
                <div className="my-3">
                  <label className="text-gray-700">
                    Special Delivery Instructions
                  </label>
                  <p className="text-gray-500 pb-1">
                    (i.e. buzzer,leave with security, etc)
                  </p>
                  <input
                    className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                    value={this.state.shippingInstructions}
                    onChange={(event) => this.setState({shippingInstructions: event.target.value})}
                  />
                </div>

                <div className="my-5">
                  <hr className="text-gray-300" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex my-3">
                  <img className="pr-3" src={Billing} alt="" />
                  <span className="text-gray-700 text-lg">
                    Billing
                  </span>
                </div>

                <div className="flex justify-between my-3 h-7">
                  <img src={ImgCreditCard} alt="" />
                  <img className="float-right" src={ImgTrusted} alt="" />
                </div>

                <div className="my-3">
                  <label className="text-gray-700">
                    Credit Card Number
                  </label>
                  <CreditCardInput
                    className="w-full text-gray-700 rounded border-gray-300 border px-3 py-2 outline-none focus:border-black"
                    value={this.state.creditCard}
                    placeholder="1234 1234 1234 1234"
                    setValue={(value) => this.setState({creditCard: value})}
                  />
                </div>

                <div className="flex justify-between my-3">
                  <div className="flex-1">
                    <label className="text-gray-700">
                      Expiration
                    </label>
                    <ExpirationInput
                      className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                      value={this.state.billingExpiration}
                      placeholder="MM/YY"
                      setValue={(value) => this.setState({billingExpiration: value})}
                    />
                  </div>

                  <div className="flex-1 pl-3">
                    <label className="text-gray-700">
                      CVC
                    </label>
                    <input
                      className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                      value={this.state.billingCVC}
                      placeholder="CVC"
                      maxLength="4"
                      onChange={(event) => this.setState({billingCVC: event.target.value})}
                    />
                  </div>
                </div>

                <div className="my-3">
                  <label className="py-3 text-gray-700">
                    Billing Address
                  </label>
                  <div className="pt-2 w-full">
                    <input
                      type="checkbox"
                      className="rounded text-gray-700 border-gray-300 border mr-3 px-3 py-2 outline-none focus:border-black"
                      defaultChecked={this.state.sameBillingAddress}
                      onClick={(event) => this.updateBilling(event.target.checked)}
                    />
                    <label>Same as shipping address</label>
                  </div>
                </div>

                { !this.state.sameBillingAddress &&
                <div>
                  <div className="flex justify-between my-3">
                    <div className="flex-1">
                      <label className="text-gray-700">
                        First Name<span className="text-red-500 pl-1">*</span>
                      </label>
                      <input
                        className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                        value={this.state.billingFirstName}
                        onChange={(event) => this.setState({billingFirstName: event.target.value})}
                      />
                    </div>

                    <div className="flex-1 pl-3">
                      <label className="text-gray-700">
                        Last Name<span className="text-red-500 pl-1">*</span>
                      </label>
                      <input
                        className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                        value={this.state.billingLastName}
                        onChange={(event) => this.setState({billingLastName: event.target.value})}
                      />
                    </div>
                  </div>

                  <div className="my-3">
                    <label className="py-3 text-gray-700">
                      Street Address<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input
                      className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                      value={this.state.billingAddress}
                      onChange={(event) => this.setState({billingAddress: event.target.value})}
                    />
                  </div>

                  <div className="flex justify-between my-3">
                    <div className="flex-1">
                      <label className="text-gray-700">Apt/Suite</label>
                      <input
                        className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                        value={this.state.billingApt}
                        onChange={(event) => this.setState({billingApt: event.target.value})}
                      />
                    </div>

                    <div className="flex-1 pl-3">
                      <label className="text-gray-700">
                        City<span className="text-red-500 pl-1">*</span>
                      </label>
                      <input
                        className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                        value={this.state.billingCity}
                        onChange={(event) => this.setState({billingCity: event.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between my-3">
                    <div className="flex-1">
                      <label className="py-3 text-gray-700">
                        Postal Code<span className="text-red-500 pl-1">*</span>
                      </label>
                      <input
                        className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                        value={this.state.billingPostalCode}
                        onChange={(event) => this.setState({billingPostalCode: event.target.value})}
                      />
                    </div>

                    <div className="flex-1 pl-3">
                      <label className="py-3 text-gray-700">
                        Phone Number<span className="text-red-500 pl-1">*</span>
                      </label>
                      <input
                        className="w-full rounded text-gray-700 border-gray-300 border px-3 py-2 outline-none focus:border-black"
                        value={this.state.billingPhoneNumber}
                        onChange={(event) => this.setState({billingPhoneNumber: event.target.value})}
                      />
                    </div>
                  </div>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex-1 md:px-5 px-3">
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
