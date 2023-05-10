import React from 'react';
import Contact from '../Contact/Contact';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(contact => {
      return (
        <Contact
          key={contact.id}
          contact={contact}
          onClick={() => onDeleteContact(contact.id)}
        />
      );
    })}
  </ul>
);
export default ContactList;
