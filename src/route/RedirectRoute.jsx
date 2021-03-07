import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const RedirectRoute = ({ location }) => {
  const redirectLocation = location.search.length ? location.search.split('?location=')[1] : '';
  if (redirectLocation) {
    window.location = redirectLocation.indexOf('http') >= 0 ? redirectLocation : `https://${redirectLocation}`;
    return window.location;
  }
  return <Redirect to="/" />;
};

RedirectRoute.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
