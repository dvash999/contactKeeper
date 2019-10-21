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

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };

    case EDIT_CONTACT:
      return {
        ...state,
        current: action.payload
      };

    case CLEAR_CURRENT_CONTACT:
      return {
        ...state,
        current: null
      };

    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        current: null
      };

    case FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter(
          contact =>
            contact.name.match(action.payload, 'gi') ||
            contact.email.match(action.payload, 'gi')
        )
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };

    default:
      return state;
  }
};
