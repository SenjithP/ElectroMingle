import React from "react";
import { Navigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import PropTypes from "prop-types";

function ElectricianPrivateRoute({ children }) {

  const { electricianInfo } = useSelector( (state) => state.auth );
  return electricianInfo ? <>{children}</> : <Navigate to="/electrician_login" />;
}
ElectricianPrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ElectricianPrivateRoute;