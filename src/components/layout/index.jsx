import React from "react";
import PropTypes from "prop-types";

import Footer from "./footer";

const Layout = ({ className, children, hideFooter }) => (
  <div className={`page ${className}`}>
    <div className="container padding-container flex mx-auto">
      <div className="page-routing">
        {children}
      </div>
    </div>
    {!hideFooter && <Footer />}
  </div>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hideFooter: PropTypes.bool,
  className: PropTypes.string,
}

Layout.defaultProps = {
  hideFooter: false,
  className: "",
}
