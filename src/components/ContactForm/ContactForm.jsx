import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const initialValues = { name: '', number: '' };

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces.'
    ),
  number: yup
    .string()
    .required('Number is required')
    .matches(
      /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with "+".'
    ),
});
const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <p className={css.error__message}>{message}</p>}
    />
  );
};

const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label} htmlFor="name">
          <span className={css.input__name}>Name</span>
          <div className={css.field}>
            <Field className={css.input__data} type="text" name="name" />
            <FormError name="name" />
          </div>
        </label>
        <label className={css.label} htmlFor="number">
          <span className={css.input__name}>Phone</span>

          <div className={css.field}>
            <Field className={css.input__data} type="tel" name="number" />
            <FormError name="number" />
          </div>
        </label>

        <button className={css.add__button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default ContactForm;
