import React from 'react';
import css from './Contact.module.css';
import PropTypes from 'prop-types';

const Contact = ({ contact, onClick }) => {
  const { name, number } = contact;

  return (
    <li className={css.contact}>
      <span className={css.name}>{name}:</span>
      <span className={css.number}>{number}</span>
      <button className={css.button} type="button" onClick={onClick}>
        Delete
      </button>
    </li>
  );
};
Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Contact;
