import React, { Component } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css';

// const dataContacts = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    if (localContacts) {
      this.setState({ contacts: JSON.parse(localContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('this.state.contacts', this.state.contacts);
    // console.log(' prevState.contacts', prevState.contacts);
    // console.log(this.state.contacts.length === prevState.contacts.length);

    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  formSubmitHandler = values => {
    const { name, number } = values;
    const { contacts } = this.state;

    if (
      contacts.some(
        el => el.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
    ) {
      return alert(`Contact with name "${name}" is already in contacts`);
    }

    const existNumber = contacts.find(el => el.number === number);
    if (existNumber) {
      return alert(
        `Contact with number ${existNumber.number} is already in  ${existNumber.name}`
      );
    }
    this.addNewContact(name, number);
  };

  addNewContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => {
      return { contacts: [contact, ...prevState.contacts] };
    });
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2 className={css.title__contacts}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        {this.state.contacts.length > 0 && (
          <ContactList
            contacts={this.getVisibleContacts()}
            onDeleteContact={this.deleteContact}
          />
        )}
      </div>
    );
  }
}

export default App;
