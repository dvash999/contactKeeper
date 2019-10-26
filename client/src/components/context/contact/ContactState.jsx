import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './ContactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  CONTACT_ERROR,
  CLEAR_CURRENT_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      console.log(res);
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: SET_ALERT });
    }
  };

  // Add Contact
  const addContact = async contact => {
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err
      });
    }
  };

  // Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`, id, config);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({
        type: SET_ALERT,
        payload: ('Failed to delete contact', 'danger')
      });
    }
  };

  // Edit Contact
  const editContact = async contact => {
    try {
      await axios.delete('/api/contacts', contact.id, config);
      dispatch({ type: EDIT_CONTACT, payload: contact });
    } catch (err) {
      dispatch({
        type: SET_ALERT,
        payload: ('Failed to edit contact', 'danger')
      });
    }
  };

  // Clear Current Contact
  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT_CONTACT });
  };

  // Update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Filter Contact
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        editContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
