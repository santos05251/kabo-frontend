import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NonUserRoute = ({ component: Component, ...rest }) => (
  <Route
  /* eslint-disable react/jsx-props-no-spreading */
    {...rest}
    render={(props) => (!localStorage.getItem('user') ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ))}
  />
);

NonUserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
