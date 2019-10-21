import React, { useReducer, useContext } from 'react';
import AuthContext from './AuthContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: null,
    loading: true,
    error: null,
  };

  const AuthState = useContext(AuthContext);

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User

  // Register User

  // Logging User

  // Logout

  // Clear Errors

  return (
  <AuthContext.Provider
  value={{
    token: state.token,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
  }}>
    {props.children}
  </AuthContext.Provider>
  );
};

export default AuthState;