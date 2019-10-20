import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './ContactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  CLEAR_CURRENT_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT
} from '../types';
import { stat } from 'fs';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Richard Hendrix',
        email: 'richard@hendrix.com',
        phone: '0523906386',
        type: 'personal'
      },
      {
        id: 2,
        name: 'John Gillfoye',
        email: 'John@Gillfoye.com',
        phone: '0501123002',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Erlich Backman',
        email: 'Erlich@Backman.com',
        phone: '0523906386',
        type: 'personal'
      }
    ],
    current: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete Contact
  const deleteContact = id => {
dispatch({type: DELETE_CONTACT, payload: id})
  }

  // Edit Contact
  const editContact = (contact) => {
      dispatch({type: EDIT_CONTACT, payload: contact})
  }

  // Clear Current Contact
  const clearCurrentContact = () => {
    dispatch({type: CLEAR_CURRENT_CONTACT})
}

  // Update Contact
  const updateContact = (contact) => {
      dispatch({type: UPDATE_CONTACT, payload: contact})
  }

  // Filter Contact

  // Clear Contact

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        editContact,
        clearCurrentContact,
        updateContact
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;