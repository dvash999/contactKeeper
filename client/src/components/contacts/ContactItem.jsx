import React, { Fragment } from 'react';

const ContactItem = ({ contact, onDeleteContact, onEditContact }) => {
  const { id, name, phone, email, type } = contact;

  return (
    <Fragment>
      <div className='card bg-light'>
        <h3 className='text-primary text-left'></h3>
        {name}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>

        <ul className='list'>
          {phone && (
            <li>
              <i className='fa fa-phone'></i> {phone}
            </li>
          )}

          {email && (
            <li>
              <i className='fa fa-envelope-open'></i> {email}
            </li>
          )}
        </ul>
        <p>
          <button onClick={() => onEditContact(contact)}className='btn btn-dark btn-sm'>Edit</button>
          <button onClick={() => onDeleteContact(id)} className='btn btn-danger btn-sm'>Delete</button>
        </p>
      </div>
    </Fragment>
  );
};

export default ContactItem;
