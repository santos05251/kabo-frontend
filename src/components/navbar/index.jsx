import React from "react";
import { connect } from "react-redux";
import { slide as Menu } from "react-burger-menu";
import { authenticationActions, userActions } from "../../actions";
import cartImage from "../../assets/images/cart-icon.svg";
import bellImage from "../../assets/images/notification-icon.svg";
import "./style.css";

import { ReactComponent as NavbarLogo } from "../../assets/images/kabo-logo-nav.svg";
import NotificationsList from "../../pages/notifications/NotificationsList";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navStep: 0,
      mobileOpen: false,
      notificationsOpen: false,
    };
    this.setNav = this.setNav.bind(this);
    this.openMobile = this.openMobile.bind(this);
  }

  setNav(index) {
    this.setState({
      navStep: index,
    });
  }

  openMobile() {
    this.setState({
      mobileOpen: !this.state.mobileOpen,
    });
  }
  closeNotifications = () => {
    this.setState({ notificationsOpen: false });
  };

  componentDidMount() {
    const urlString = window.location.href;
    if (urlString.includes("store")) {
      this.setNav(2);
    } else if (urlString.includes("orders")) {
      this.setNav(3);
    } else if (urlString.includes("profile")) {
      this.setNav(4);
    } else if (urlString.includes("edit-plan")) {
      this.setNav(0);
    } else {
      this.setNav(1);
    }
    // this.props.getUserNotifications();
  }

  clickLogout() {
    this.props.logout();
    window.location.replace("/");
  }

  render() {
    const { user, logout } = this.props;
    const { navStep } = this.state;

    const active =
      "bg-primary text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium";
    const inActive =
      "text-charcoal hover:bg-green-500 hover:text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm  font-medium";

    const loggedIn = user && user.token;

    return (
      <nav
        className="fixed mx-auto inset-x-0 top-0 px-4 md:px-0 xl:px-6 2xl:px-0 md:h-20 sm:h-14 h-24 bg-white z-50 md:w-11/12 xl:w-full"
        id="outer-container"
      >
        <div className="py-3 md:py-6 pl-0 flex items-center sm:justify-between sm:items-stretch">
          <div className="sm:hidden">
            <Menu
              pageWrapId={"page-wrap"}
              noTransition={true}
              outerContainerId={"outer-container"}
              right
            >
              <a id="home" className="menu-item" href="/">
                Kabo Homepage
              </a>
              {loggedIn && (
                <a id="account" className="menu-item" href="/profile">
                  Your Account
                </a>
              )}
              <a
                id="blog"
                className="menu-item"
                href="https://kabo.co/blog"
              >
                Blog
              </a>
              <a
                id="help"
                className="menu-item"
                href="https://kabo.zendesk.com/"
              >
                Help
              </a>
              <a
                id="support"
                className="menu-item"
                href="https://kabo.zendesk.com/hc/en-us"
              >
                Support
              </a>
              {loggedIn && (
                <a
                  onClick={() => this.clickLogout()}
                  className="menu-item"
                  href=""
                >
                  Logout
                </a>
              )}
            </Menu>
          </div>
          <div
            className="flex-shrink-0 flex flex-wrap w-4/5 items-center left-0"
            id="page-wrap"
          >
            <a href="/" className="self-start">
              <NavbarLogo className="block w-auto" />
            </a>
            {loggedIn && (
              <div>
                <div className="flex align-center just sm:ml-6 mt-1 sm:mt-0">
                  <div className="flex space-x-4">
                    <a href="/" className={navStep === 1 ? active : inActive}>
                      My Kabo
                    </a>
                    {/* <a href="/store" className={navStep === 2 ? active : inActive}>Store</a> */}
                    <a
                      href="/orders"
                      className={navStep === 3 ? active : inActive}
                    >
                      Orders
                    </a>
                    <a
                      href="/profile"
                      className={navStep === 4 ? active : inActive}
                    >
                      Account
                    </a>
                    <a
                      href="https://kabo.zendesk.com/hc/en-us"
                      className={`hidden md:block ${inActive}`}
                      target="_blank"
                    >
                      Support
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          {loggedIn && (
            <div className="flex flex-row center mr-20 sm:mr-0">
              {this.props.user_notifications && this.props.user_notifications.length > 0 &&
                <div
                  className="profile-box-icon"
                  onClick={() => this.setState({ notificationsOpen: true })}
                >
                  <img src={bellImage} />
                  <span
                    className={
                      true
                        ? "profile-box-unread-amount got-unread"
                        : "profile-box-unread-amount"
                    }
                  >
                    2
                  </span>
                  {this.state.notificationsOpen && (
                    <NotificationsList
                      closeNotifications={this.closeNotifications}
                      loading_notifications={this.props.loading_notifications}
                      user_notifications={this.props.user_notifications}
                    />
                  )}
                </div>
              }
              <button
                type="button"
                onClick={() => this.clickLogout()}
                className="hidden sm:block font-messina font-semibold text-base pb-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) =>
    dispatch(authenticationActions.login({ email, password })),
  logout: () => dispatch(authenticationActions.logout()),
  getNotifications: async () => dispatch(userActions.getNotificationsData()),
  getUserNotifications: () => dispatch(userActions.getUserNotifications()),
});

const mapStateToProps = (state) => {
  const {
    user,
    loading_notifications,
    user_notifications,
  } = state.authentication;
  return {
    user,
    user_notifications,
    loading_notifications,
  };
};

const connectedNavbar = connect(mapStateToProps, mapDispatchToProps)(Navbar);
export { connectedNavbar as Navbar };
