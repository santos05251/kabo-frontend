import * as React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { userActions } from "../../actions";
import NotificationCard from "../../components/notifications/NotificationCard";

class NotificationsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: "General",
      filters: ["General", "Promotions", "Delivery"],
    };
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    this.props.getUserNotifications();
  }

  handleOuterClick = (event) => {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.props.closeNotifications();
    }
  };

  componentDidMount() {
    setTimeout(() => {
      document.addEventListener("click", this.handleOuterClick);
    }, 1000);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOuterClick);
  }

  render() {
    const { user_notifications } = this.props;
    return (
      <div className="notifications-overlay" ref={this.wrapperRef}>
        <span className="notifications-overlay-triangle"></span>
        {/* <div className="rounded-md overflow-hidden flex h-9 mb-7 border border-gray-200">
            {this.state.filters.map(f => (
                <div
                    key={f}
                    onClick={() => this.setState({selectedFilter: f})}
                    className={`inline-flex cursor-pointer justify-center items-center ${
                      this.state.selectedFilter === f ? 'bg-primary text-white' : 'bg-white text-charcoal'} w-1/2`}
            >
                  {f}
            </div>
            ))}

          </div> */}
        <div className="flex flex-col items-center py-x max-h-96 overflow-y-auto">
          {user_notifications &&
            user_notifications.length > 0 &&
            user_notifications.map((n, i) => (
              <NotificationCard key={i} item={n} />
            ))}
          <hr className="border-1 p-1" style={{ width: "70%" }} />
          <small className="self-center opacity-50">End of messages</small>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOrderData: () => dispatch(userActions.getOrderData()),
});

const mapStateToProps = (state) => {
  console.log("state in mapstate to props", state);
  const {
    subscriptions,
    dogs,
    user,
    loading_notifications,
    user_notifications,
  } = state.user;

  return {
    subscriptions,
    userData: user,
    dogs,
    loading_notifications,
    user_notifications,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList);
