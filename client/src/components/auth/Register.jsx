import React, { useState } from 'react';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    verifyFields();
    verifyRepeatedPassword();

    setUser({
      name: '',
      email: '',
      password: '',
      repeatPassword: ''
    });
  };

  const verifyRepeatedPassword = () => {
    if (user.repeatPassword !== user.password) return 'Password doesnt match';
  };

  const verifyFields = () => {
    return user.map(field => {
      if (!field) return 'error';
    });
  };

  return (
    <div className='form-container'>
      <h2 className='text-primary'>Register to ContactKeeper</h2>

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' onChange={onChange} />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input type='text' name='email' onChange={onChange} />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='text' name='password' onChange={onChange} />
        </div>

        <div className='form-group'>
          <label htmlFor='repeatedPassword'>Repeat Password</label>
          <input type='text' name='repeatPassword' onChange={onChange} />
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
