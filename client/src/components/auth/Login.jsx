import React, { useState } from 'react';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onChange = () => {
    console.log('onchange');
  };

  const onSubmit = () => {
    console.log('submit');
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
