import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../context/contact/ContactContext';
import ContactItem from './ContactItem';

const ContactsList = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, deleteContact, editContact, filtered } = contactContext;

  if (contacts.length === 0) return <h4>Please add a contact</h4>;

  const onDeleteContact = id => {
    deleteContact(id);
  };

  const onEditContact = contact => {
    editContact(contact);
  };

  return (
    <Fragment>
      {/* <TransitionGroup> */}
        <ul>
          {(filtered || contacts).map(contact => (
            <CSSTransition key={contact.id} timeout={500} classNames='item'>
              <ContactItem
                onEditContact={onEditContact}
                onDeleteContact={onDeleteContact}
                contact={contact}
              />
            </CSSTransition>
          ))}
        </ul>
      {/* </TransitionGroup> */}
    </Fragment>
  );
};

export default ContactsList;
