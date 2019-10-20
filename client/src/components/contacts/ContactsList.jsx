import React, { Fragment, useContext } from 'react';
import ContactContext from '../context/contact/ContactContext';
import ContactItem from './ContactItem';

const ContactsList = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, deleteContact, editContact, filtered } = contactContext;

  const onDeleteContact = id => {
    deleteContact(id);
  };

  const onEditContact = contact => {
    editContact(contact);
  };

  return (
    <Fragment>
      <ul className='list-unstyled'>
        {(filtered || contacts).map(contact => (
          <ContactItem
            key={contact.id}
            onEditContact={onEditContact}
            onDeleteContact={onDeleteContact}
            contact={contact}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default ContactsList;
