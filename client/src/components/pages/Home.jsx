import React, { Fragment } from 'react';
import ContactList from '../contacts/ContactsList';
import ContactForm from '../contacts/ContactForm';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactList />
      </div>
    </div>
  );
};
export default Home;
