import React from "react";

class SubscriptionCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title = "", icon, buttonText, buttonAction } = this.props;

    return (
      <div className="flex flex-col rounded-lg bg-white shadow-lg border border-gray-100">
        <div className="flex flex-row items-center px-4 py-3">
          { icon &&
            <img src={icon} className="w-14 pr-3" />
          }
          <h2 className="font-messina text-lg">{ title }</h2>
        </div>
        <hr />
        <div className="flex flex-col flex-1 px-4 py-3">
          <div className="flex-1">
            { this.props.children }
          </div>
          {
            buttonAction &&
            <button
              className="w-full border border-green px-3 py-2 md:px-4 py-3 rounded-lg focus:outline-none text-base text-primary font-messina"
              onClick={buttonAction}
            >
              { buttonText }
            </button>
          }
        </div>
      </div>
    );
  }
}

export default SubscriptionCard;
