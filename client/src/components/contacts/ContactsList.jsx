import React, { Fragment, useContext } from 'react';
import ContactContext from '../context/contact/ContactContext';
import ContactItem from './ContactItem';

const ContactsList = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, deleteContact, editContact } = contactContext;

  const onDeleteContact = id => {
    deleteContact(id);
  };

  const onEditContact = contact => {
    console.log(contact);
    editContact(contact);
  };

  return (
    <Fragment>
      <ul className='list-unstyled'>
        {contacts.map(contact => (
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
