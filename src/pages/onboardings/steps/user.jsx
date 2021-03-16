import React, { Component } from "react";

class UserStep extends Component {
  state = {};
  render() {
    const { user, handleUserChange, selectedDogs } = this.props;
    const bMany = selectedDogs.dogs.length > 1;
    const strDogNames = this.props.selectedDogs.dogs.map(item => item.name).join(' and ');

    return (
      <section className="flex flex-col items-center py-5 md:py-10">
        <div className="flex justify-content-center">
          <svg
            height="41"
            viewBox="0 0 43 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M35.3214 37.5812L35.3214 23.3759C35.3214 22.7398 35.8371 22.2241 36.4732 22.2241C37.1093 22.2241 37.625 22.7398 37.625 23.3759L37.625 36.8865C37.625 38.7242 36.1353 40.2139 34.2976 40.2139H31.7381C29.9004 40.2139 28.4107 38.7242 28.4107 36.8865L28.4107 25.7377L28.4106 25.7303C28.4105 25.721 28.4102 25.7039 28.4095 25.6796C28.4081 25.6308 28.405 25.5533 28.3986 25.451C28.3858 25.246 28.3597 24.9447 28.3064 24.5795C28.199 23.843 27.9863 22.8812 27.5725 21.9352C27.1609 20.9944 26.5616 20.0937 25.6842 19.4252C24.814 18.7622 23.602 18.2751 21.8839 18.2751C18.5229 18.2751 16.7534 20.1485 15.7689 22.0238C15.2632 22.987 14.9632 23.9617 14.7904 24.7023C14.7045 25.0701 14.6516 25.3735 14.6207 25.5796C14.6053 25.6825 14.5954 25.7606 14.5897 25.8097L14.5893 25.8131V36.8865C14.5893 38.7242 13.0996 40.2139 11.2619 40.2139L8.70238 40.2139C6.86472 40.2139 5.375 38.7242 5.375 36.8865L5.375 23.3759C5.375 22.7398 5.89067 22.2241 6.52679 22.2241C7.1629 22.2241 7.67857 22.7398 7.67857 23.3759L7.67857 37.5812L12.2857 37.5812V25.6686L12.2914 25.6033L13.4375 25.7343C12.2914 25.6033 12.2914 25.6033 12.2914 25.6033L12.292 25.5966L12.2929 25.5867L12.2958 25.5573C12.2983 25.5335 12.3017 25.5015 12.3063 25.4618C12.3156 25.3823 12.3297 25.2719 12.3503 25.1348C12.3913 24.861 12.4584 24.4788 12.5646 24.024C12.7757 23.1191 13.1475 21.8999 13.7936 20.6693C15.1126 18.1569 17.5664 15.6425 21.8839 15.6425C24.0051 15.6425 25.6726 16.2523 26.962 17.2347C28.2442 18.2116 29.0846 19.5048 29.6329 20.7579C30.1788 22.0058 30.4461 23.2378 30.5786 24.1467C30.6454 24.6043 30.6792 24.9885 30.6964 25.2634C30.705 25.4011 30.7094 25.5121 30.7118 25.5919C30.7129 25.6318 30.7136 25.664 30.7139 25.6879L30.7142 25.7175L30.7143 25.7275L30.7143 25.7288C30.7143 25.7305 30.7135 25.7314 30.7118 25.7314C30.6951 25.732 30.5656 25.7343 29.5625 25.7343H30.7143L30.7143 37.5812H35.3214Z"
              fill="#071F16"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.3417 1.69825L42.1693 20.4516C42.6399 20.9466 42.6555 21.7186 42.2055 22.2323C41.6934 22.8168 40.7899 22.8352 40.2545 22.272L22.5934 3.69378C21.7674 2.82479 20.4587 2.83942 19.649 3.72669L2.75902 22.234C2.23613 22.807 1.33404 22.807 0.811146 22.234C0.351669 21.7306 0.351669 20.9599 0.811146 20.4564L17.8639 1.77067C19.6453 -0.181336 22.5243 -0.213519 24.3417 1.69825Z"
              fill="#071F16"
            />
          </svg>
        </div>
        <div className="py-5">
          <h3 className="m-0 font-semibold text-2xl">
            Let’s make sure {strDogNames}’s profile{bMany ? 's' : ''} {bMany ? 'are' : 'is'} saved
          </h3>
        </div>
        <form className="w-full md:w-6/12">
          <div className="mt-5 md:mt-10 px-4 md:px-9 bg-white rounded-lg">
            <div className="flex flex-col mb-5 md:mb-10">
              <label className="font-semibold my-3">
                Your first name (optional)
              </label>
              <input
                placeholder="Type your name here"
                className=" input border border-gray-400 rounded-lg py-3"
                defaultValue={user.first_name}
                onChange={(e) => handleUserChange("first_name", e.target.value)}
              />
              <div className="flex items-center">
                <p className="text-gray-400 text-xs"></p>
              </div>
            </div>

            <div className="flex flex-col mb-5 md:mb-10">
              <label className="font-semibold my-3">
                Your email address (optional)
              </label>
              <input
                type="email"
                placeholder="Type your email address"
                className=" input border border-gray-400 rounded-lg py-3"
                defaultValue={user.email}
                onChange={(e) => handleUserChange("email", e.target.value)}
              />
              <div className="flex items-center">
                <p className="text-gray-400 text-xs"></p>
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

export default UserStep;
