import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../context/contact/ContactContext';

const ContactForm = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const contactContext = useContext(ContactContext);

  const { addContact, clearCurrentContact, updateContact, current } = contactContext;

  const { name, email, phone, type } = contact;


  useEffect(() => {
    if (current) setContact(current);
  }, [contactContext, current]);

  const clearForm = () => {
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    !current ? addContact(contact) : updateContact(contact);

    clearForm();
  };

  const onClearContact = () => {
    clearCurrentContact();
    clearForm();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <div style={{ marginTop: '35px' }}>
        <h5>Contact Type</h5>
        <span style={{ marginRight: '20px' }}>
          <input type='radio' name='type' value='personal' defaultChecked />
          Personal
        </span>

        <span>
          <input type='radio' name='type' value='professional' />
          Professional
        </span>
      </div>
      <div>
        <input
          type='submit'
          value={current || contact ? 'Save Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button onClick={onClearContact} className='btn btn-light btn-block'>
            Clear Form
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
