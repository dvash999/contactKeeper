import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../context/alert/AlertContext';
import AuthContext from '../context/auth/AuthContext';

const Register = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors } = authContext;

  useEffect(() => {
    if ((error === 'User already exists')) {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const { name, email, password, repeatPassword } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    verifyFormFields();

    register({ name, email, password });

    setUser({
      name: '',
      email: '',
      password: '',
      repeatPassword: ''
    });
  };

  const verifyFormFields = () => {
    if (password.length < 5) {
      return setAlert('Password min length should be 6 characters', 'danger');
    }

    if (!name || !email || !password || !repeatPassword) {
      return setAlert('Please fill all fields', 'danger');
    }

    if (password !== repeatPassword) {
      return setAlert('Password dont match', 'danger');
    }
  };

  return (
    <div className='form-container'>
      <h2 className='text-primary'>Register Account</h2>

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input type='text' name='email' value={email} onChange={onChange} />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='repeatedPassword'>Repeat Password</label>
          <input
            type='text'
            name='repeatPassword'
            value={repeatPassword}
            onChange={onChange}
          />
        </div>

        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
