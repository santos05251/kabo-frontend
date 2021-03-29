import React from "react";
import { connect } from "react-redux";
import { slide as Menu } from "react-burger-menu";
import { authenticationActions, userActions } from "../../actions";
import "./style.css";
import "./nav-mobile.css"

import { ReactComponent as NavbarLogo } from "../../assets/images/kabo-logo-nav.svg";

class HorizontalNav extends React.Component {
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
      if (urlString.includes("checkout/success")) return;
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
      "text-primary font-cooper font-bold text-white rounded-md text-4xl font-medium";
    const inActive =
      "text-charcoal font-cooper hover:text-primary rounded-md text-sm font-medium";
    const mobileActive =
      "bg-primary text-white text-center px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium";
    const mobileInactive =
      "text-charcoal hover:bg-green-500 bg-mobileNav text-center  hover:text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm  font-medium";

    const loggedIn = user && user.token;

    return (
      <div
        className="flex md:block p-3 md:px-0 xl:px-6 2xl:px-0 md:top-8 md:left-9 bg-white z-50 w-full"
        id="outer-container"
      >
        <div className="md:pb-5 md:p-7 w-full pl-0 flex items-center sm:justify-between sm:items-stretch">
          <div className="sm:hidden">
            <Menu
              pageWrapId={"page-wrap"}
              noTransition={true}
              outerContainerId={"outer-container"}
            >
              <a
                href="/"
                className={inActive}
              >
                My Kabo
                </a>
              <a
                href="/orders"
                className={inActive}
              >
                Orders
              </a>
              <a
                id="support"
                className={inActive}
                href="https://kabo.zendesk.com/hc/en-us"
              >
                Support
              </a>
              <a
                id="blog"
                className={inActive}
                href="https://kabo.co/blog"
              >
                Blog
              </a>
              <a
                onClick={() => this.clickLogout()}
                className="menu-item font-semibold text-sm"
                href=""
              >
                Logout
              </a>
            </Menu>
          </div>
          <div
            className="flex items-center justify-between flex-wrap w-full "
            id="page-wrap"
          >
            <a href="/" className="self-start">
              <NavbarLogo className="block w-auto" />
            </a>
            <div className="md:flex hidden w-1/3 justify-between items-center">
              <a
                href="/"
                className={inActive}
              >
                My Kabo
                </a>
              <a
                href="/orders"
                className={inActive}
              >
                Orders
              </a>
              <a
                id="support"
                className={inActive}
                href="https://kabo.zendesk.com/hc/en-us"
              >
                Support
              </a>
              <a
                id="blog"
                className={inActive}
                href="https://kabo.co/blog"
              >
                Blog
              </a>
              <a
                onClick={() => this.clickLogout()}
                className="menu-item font-semibold text-sm"
                href=""
              >
                Logout
              </a>
            </div>
          </div>
        </div>

      </div>
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

const connectedNavbar = connect(mapStateToProps, mapDispatchToProps)(HorizontalNav);
export { connectedNavbar as HorizontalNav };
