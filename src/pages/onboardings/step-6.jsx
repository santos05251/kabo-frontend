import React from "react";
import { ReactComponent as FilledCircle } from "../../assets/images/filled-circle.svg";
import Star from "../../assets/images/star.png";
import StarGreen from "../../assets/images/stargreen.png";

const FinalStep = () => {
  return (
    <main className=" h-auto bg-lightgray lg:flex xl:flex px-12  pt-12">
      <div className=" w-full lg:w-5/12 xl:w-5/12  lg:px-5 xl:px-5 px-2">
        {/* colmn 1 */}
        <div className=" w-full ">
          <div
            className=" ReactModal__Content ReactModal__Content--after-open w-full  bg-white lg:rounded-xl shadow-modal outline-none"
            tabindex="-1"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between">
              <h3 className="text-xl">Change Payment Method</h3>
              <img
                className="cursor-pointer"
                src="/static/media/modal-close.10005edf.svg"
              />
            </div>
            <div>
              <div className="py-9 px-5 overflow-x-hidden">
                <button className="w-full py-2 px-6 flex flex-col focus:outline-none items-center content-center text-indigo-100 transition-colors duration-150 bg-yellow-300 rounded-lg focus:shadow-outline hover:bg-yellow-400">
                  <img
                    src="/static/media/paypal-logo.23de6718.png"
                    alt="PayPal"
                    width="100px"
                  />
                </button>
                <div className="mt-5">
                  <hr className="hr-text" data-content="OR" />
                </div>
                <div>
                  <form>
                    {/* <div>
        <h3 className="text-2xl text-gray-600">Create an Account</h3>
      </div> */}
                    <div className="flex ">
                      <span className="text-2xl pr-3">
                        {" "}
                        <svg
                          id="Layer_1"
                          enable-background="new 0 0 512 512"
                          height="25"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m467.534 112.088c-23.073-29.237-57.683-64.088-91.534-64.088-10.27 0-20.622 7.034-34.594 20.191-19.785-8.821-63.312-20.191-85.406-20.191-22.113 0-65.64 11.378-85.406 20.191-13.972-13.157-24.324-20.191-34.594-20.191-33.851 0-68.461 34.851-91.534 64.088-17.192 21.785-44.466 62.743-44.466 79.912 0 32.247 1.043 46.724 27.2 81.6 19.966 26.621 22.082 65.4 35.475 86.458 8.763 13.779 21.977 19.27 37.206 15.464 15.176-3.794 25.03-16.588 29.396-38.087 16.89 23.263 14.047 36.937 15.162 44.849 1.123 30.142 52.694 81.716 111.561 81.716 58.77 0 110.436-51.52 111.561-81.715 1.109-7.873-1.828-21.567 15.148-44.913 4.463 22.044 16.021 39.329 38.588 39.329 42.297 0 35.241-65.418 63.502-103.1 26.157-34.876 27.2-49.353 27.2-81.6.001-17.17-27.273-58.128-44.465-79.913zm-211.534 231.912c-8.33 0-18.196-12.575-22.268-20.516 11.83-4.646 32.698-4.648 44.535 0-4.071 7.941-13.937 20.516-22.267 20.516zm-.001 63.962c10.396 7.852 23.978 12.591 37.934 14.341-25.229 12.909-50.609 12.923-75.867 0 13.955-1.75 27.538-6.489 37.933-14.341zm203.201-153.562c-25.193 33.589-29.058 82.236-38.207 90.281-5.711-.52-7.822-17.966-8.331-23.682-2.622-29.497 3.338-71.64 3.338-96.999 0-43.279-32.313-108.404-33.689-111.155-3.952-7.904-13.564-11.106-21.466-7.156-7.904 3.952-11.107 13.563-7.156 21.466 8.431 16.862 30.311 67.13 30.311 96.845 0 16.692-3.052 43.399-3.821 69.035-8.651 7.456-44.179 40.656-44.179 82.965 0 19.833-55.647 19.892-65.865.533-.43-.816-1.023-1.751-1.658-2.544 24.039-7.67 43.523-37.929 43.523-53.989 0-42.948-112-42.948-112 0 0 16.054 19.418 46.297 43.523 53.989-.627.782-1.22 1.713-1.658 2.543-10.253 19.418-65.865 19.266-65.865-.532 0-42.309-35.528-75.509-44.179-82.965-.741-24.706-3.821-52.753-3.821-69.035 0-29.642 21.882-79.961 30.311-96.845 3.952-7.903.748-17.514-7.156-21.466-7.903-3.952-17.515-.748-21.466 7.156-1.376 2.751-33.689 67.876-33.689 111.155 0 25.372 5.958 67.523 3.337 96.999-.508 5.716-2.619 23.161-8.331 23.682-9.245-8.129-12.925-56.572-38.207-90.281-20.578-27.437-20.797-34.916-20.8-61.529 1.856-7.371 17.018-35.5 39.828-63.768 24.049-29.805 47.328-47.966 62.735-49.051 4.727 2.375 14.519 11.658 22.124 19.262 6.059 6.06 15.832 6.27 22.146.462 7.95-5.427 55.776-19.776 77.168-19.776s69.218 14.349 77.168 19.776c6.307 5.801 16.08 5.604 22.146-.462 13.201-13.201 19.307-17.838 22.126-19.262 15.407 1.087 38.685 19.249 62.732 49.051 22.81 28.268 37.972 56.397 39.828 63.768-.002 26.613-.222 34.092-20.8 61.529z" />
                          <circle cx="180" cy="212" r="20" />
                          <circle cx="332" cy="212" r="20" />
                        </svg>
                      </span>

                      <span> Shipping Information</span>
                    </div>

                    <div className="py-3">
                      <label className="py-3">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input className="w-full rounded border-gray-300 border px-3 py-2 outline-none" />
                    </div>

                    <div className="py-3">
                      <label className="py-3">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input className="w-full rounded border-gray-300 border px-3 py-2 outline-none" />
                    </div>

                    <div className="py-5">
                      <hr className="text-gray-300" />
                    </div>

                    <div className="flex ">
                      <span className="text-2xl pr-3">
                        {" "}
                        <svg
                          height="25"
                          viewBox="0 0 43 41"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M35.3214 37.5812L35.3214 23.3759C35.3214 22.7398 35.8371 22.2241 36.4732 22.2241C37.1093 22.2241 37.625 22.7398 37.625 23.3759L37.625 36.8865C37.625 38.7242 36.1353 40.2139 34.2976 40.2139H31.7381C29.9004 40.2139 28.4107 38.7242 28.4107 36.8865L28.4107 25.7377L28.4106 25.7303C28.4105 25.721 28.4102 25.7039 28.4095 25.6796C28.4081 25.6308 28.405 25.5533 28.3986 25.451C28.3858 25.246 28.3597 24.9447 28.3064 24.5795C28.199 23.843 27.9863 22.8812 27.5725 21.9352C27.1609 20.9944 26.5616 20.0937 25.6842 19.4252C24.814 18.7622 23.602 18.2751 21.8839 18.2751C18.5229 18.2751 16.7534 20.1485 15.7689 22.0238C15.2632 22.987 14.9632 23.9617 14.7904 24.7023C14.7045 25.0701 14.6516 25.3735 14.6207 25.5796C14.6053 25.6825 14.5954 25.7606 14.5897 25.8097L14.5893 25.8131V36.8865C14.5893 38.7242 13.0996 40.2139 11.2619 40.2139L8.70238 40.2139C6.86472 40.2139 5.375 38.7242 5.375 36.8865L5.375 23.3759C5.375 22.7398 5.89067 22.2241 6.52679 22.2241C7.1629 22.2241 7.67857 22.7398 7.67857 23.3759L7.67857 37.5812L12.2857 37.5812V25.6686L12.2914 25.6033L13.4375 25.7343C12.2914 25.6033 12.2914 25.6033 12.2914 25.6033L12.292 25.5966L12.2929 25.5867L12.2958 25.5573C12.2983 25.5335 12.3017 25.5015 12.3063 25.4618C12.3156 25.3823 12.3297 25.2719 12.3503 25.1348C12.3913 24.861 12.4584 24.4788 12.5646 24.024C12.7757 23.1191 13.1475 21.8999 13.7936 20.6693C15.1126 18.1569 17.5664 15.6425 21.8839 15.6425C24.0051 15.6425 25.6726 16.2523 26.962 17.2347C28.2442 18.2116 29.0846 19.5048 29.6329 20.7579C30.1788 22.0058 30.4461 23.2378 30.5786 24.1467C30.6454 24.6043 30.6792 24.9885 30.6964 25.2634C30.705 25.4011 30.7094 25.5121 30.7118 25.5919C30.7129 25.6318 30.7136 25.664 30.7139 25.6879L30.7142 25.7175L30.7143 25.7275L30.7143 25.7288C30.7143 25.7305 30.7135 25.7314 30.7118 25.7314C30.6951 25.732 30.5656 25.7343 29.5625 25.7343H30.7143L30.7143 37.5812H35.3214Z"
                            fill="#071F16"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M24.3417 1.69825L42.1693 20.4516C42.6399 20.9466 42.6555 21.7186 42.2055 22.2323C41.6934 22.8168 40.7899 22.8352 40.2545 22.272L22.5934 3.69378C21.7674 2.82479 20.4587 2.83942 19.649 3.72669L2.75902 22.234C2.23613 22.807 1.33404 22.807 0.811146 22.234C0.351669 21.7306 0.351669 20.9599 0.811146 20.4564L17.8639 1.77067C19.6453 -0.181336 22.5243 -0.213519 24.3417 1.69825Z"
                            fill="#071F16"
                          />
                        </svg>
                      </span>

                      <span> Shipping Information</span>
                    </div>

                    <div className="lg:flex xl:flex lg:justify-between xl:justify-between">
                      <div className="py-3 lg:w-6/12 xl:w-6/12">
                        <label className="py-3">
                          First Name<span className="text-red-500">*</span>
                        </label>
                        <input className="w-full rounded border-gray-300 border px-3 py-2 outline-none" />
                      </div>

                      <div className="py-3 lg:w-6/12 xl:w-6/12 lg:pl-3 xl:pl-3">
                        <label className="py-3">
                          Last Name<span className="text-red-500">*</span>
                        </label>
                        <input className="w-full rounded border-gray-300 border px-3 py-2 outline-none" />
                      </div>
                    </div>

                    <div className="py-3">
                      <label className="py-3">
                        Street Address<span className="text-red-500">*</span>
                      </label>
                      <input className="w-full rounded border-gray-300 border px-3 py-2 outline-none" />
                    </div>

                    <div className="lg:flex xl:flex lg:justify-between xl:justify-between">
                      <div className="py-3 lg:w-6/12 xl:w-6/12">
                        <label className="py-3">Apt/Suite</label>
                        <input className="w-full rounded border-gray-300 border px-3 py-2 outline-none" />
                      </div>

                      <div className="py-3 lg:w-6/12 xl:w-6/12 lg:pl-3 xl:pl-3">
                        <label className="py-3">
                          City<span className="text-red-500">*</span>
                        </label>
                        <input className="w-full rounded border-gray-300 border px-3 py-2 outline-none" />
                      </div>
                    </div>

                    <div className="lg:flex xl:flex lg:justify-between xl:justify-between">
                      <div className="py-3 lg:w-6/12 xl:w-6/12">
                        <label className="py-3">
                          Postal Code<span className="text-red-500">*</span>
                        </label>
                        <input className="w-full rounded border-gray-300 border px-3 py-2 outline-none" />
                      </div>

                      <div className="py-3 lg:w-6/12 xl:w-6/12 lg:pl-3 xl:pl-3">
                        <label className="py-3">
                          Phone Number<span className="text-red-500">*</span>
                        </label>
                        <input className="w-full rounded border-gray-300 border px-3 py-2 outline-none" />
                      </div>
                    </div>
                    <div className="py-3">
                      <label className="py-3">
                        Spectial Delivery Instructions
                      </label>
                      <p className="text-gray-500 pb-1">
                        (i.e. buzzer,leave with security, etc)
                      </p>
                      <input className="w-full rounded border-gray-300 border px-3 py-2 outline-none" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* column 2 */}
      <div className=" w-full lg:w-5/12 xl:w-5/12 px-2 lg:px-5 xl:px-5 py-5 lg:py-0 xl:py-0">
        <div class="w-full">
          {/* <!-- title , input and button --> */}
          <div>
            <h5>Have a coupan code?</h5>
            <div class="lg:flex xl:flex lg:justify-between xl:justify-between">
              <div class="w-12/12 lg:w-10/12 xl:w-10/12">
                <input
                  class="w-full rounded border-gray-300 border px-3 py-2 outline-none"
                  placeholder="40Off"
                />
              </div>
              <div class="py-2 lg:pl-2 xl:pl-2 lg:py-0 xl:py-0 w-12/12 lg:w-2/12 xl:w-2/12">
                <button class="w-full py-2 px-6 text-center text-white focus:outline-none transition-colors duration-150 bg-green-600 rounded-md focus:shadow-outline hover:bg-green-700">
                  Apply
                </button>
              </div>
            </div>
          </div>
          {/* <!-- discount --> */}
          <div class="py-1 w-12/12">
            <div class="bg-green-100 py-3">
              <h1 class="text-center text-1xl">
                40 off used. 40% discount applied!
              </h1>
            </div>
          </div>
          {/* <!-- hr --> */}
          <div class="flex justify-center py-5">
            <div class="w-10/12">
              <hr class="text-gray-300" />
            </div>
          </div>
          {/* <!-- heading --> */}
          <div>
            <h3 class="text-center text-2xl">Test's first box</h3>
            <h3 class="text-center py-2">
              Arrives Feb 5,2021 if you purchase by jan 23, 2021
            </h3>
          </div>
          {/* <!-- box1 --> */}
          <div class="flex justify-center">
            <div class="w-10/12 bg-white rounded border border-gray-300 px-3 py-5">
              {/* <!-- 1st row --> */}
              <div class="flex justify-between">
                <h3 class="text-gray-600">Freshly Cooked:Turkey</h3>
                <h3 class="text-green-500">Change</h3>
              </div>
              {/* <!-- 2nd row --> */}
              <div class="flex justify-between">
                <h3 class="text-gray-600">Portion: 100% cooked</h3>
              </div>
              {/* <!-- 3rd row --> */}
              <div class="flex justify-between">
                <h3 class="text-gray-600">Amount: 2 weeks worth of food</h3>
              </div>
            </div>
          </div>
          {/* <!-- box2 --> */}
          <div class="flex justify-center py-2">
            <div class="w-10/12 py-5">
              {/* <!-- 1st row --> */}
              <div class="flex justify-between">
                <h3 class="text-gray-600">Hearty Turkey</h3>
                <h3 class="text-gray-600">$63.33</h3>
              </div>
              {/* <!-- 2nd row --> */}
              <div class="flex justify-between">
                <h3 class="text-gray-600">First order discount (40%)</h3>
                <h3 class="text-gray-600">-$25.44</h3>
              </div>
              {/* <!-- 3rd row --> */}
              <div class="flex justify-between">
                <h3 class="text-gray-600">Shipping</h3>
                <h3 class="text-gray-600">Free</h3>
              </div>
              {/* <!-- 4rd row --> */}
              <div class="flex justify-between">
                <h3 class="text-gray-600">Tax</h3>
                <h3 class="text-gray-600">--</h3>
              </div>
            </div>
          </div>
          {/* <!-- hr --> */}
          <div class="flex justify-center py-5">
            <div class="w-10/12">
              <hr class="text-gray-300" />
            </div>
          </div>
          {/* <!-- box2 --> */}
          <div class="flex justify-center py-2">
            <div class="w-10/12">
              {/* <!-- content header --> */}
              <div class="flex justify-between">
                <h3 class="text-black text-3xl">Total Due</h3>
                <h3 class="text-black text-3xl">$38.16</h3>
              </div>
              {/* <!-- content body --> */}
              <div class="py-7">
                <div class="py-2 flex">
                  <FilledCircle className="rounded-full  h-5 w-5" />
                  <p class="text-gray-600 px-3">
                    No Commitment. Pause or cancel at any time after your trial.
                  </p>
                </div>
                <div className="flex">
                  <FilledCircle className=" rounded-full  h-5 w-5" />
                  <p class="text-gray-600 px-3">
                    We'll refund your order 100% if your dog doesn't like the
                    food.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Purchase --> */}
          <div class="py-1 w-12/12">
            <div class="bg-gray-800 py-3">
              <h1 class="text-center text-white text-2xl">Purchase</h1>
            </div>
          </div>
          {/* <!-- paragrph --> */}
          <div>
            <p class="text-center text-gray-600 px-5 py-5">
              By Clicking "Purchase" you'r agreeing to a no-comitment, requrring
              subscription. After your trial feel free to email us at any time
              should you need to pause or cancel your order
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
          </div>
          <div className="flex justify-center py-5  text-2xl">
            Related &nbsp; <span className="font-bold ">Execellent</span>{" "}
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
};

export default FinalStep;
