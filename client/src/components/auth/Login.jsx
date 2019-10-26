import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../context/alert/AlertContext';
import AuthContext from '../context/auth/AuthContext';

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { isAuthenticated, error, setAlert, clearErrors } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    validateFields();

    authContext.loginUser(user);
  };

  const validateFields = () => {
    if (!user.email || !user.password) {
      alertContext.setAlert('please enter mail and password', 'danger');
    }
  };

  return (
    <div className='form-container'>
      <h2 className='text-primary'>Sign-In to ContactKeeper</h2>

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input type='text' name='email' onChange={onChange} />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='text' name='password' onChange={onChange} />
        </div>

        <input
          type='submit'
          value='login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
