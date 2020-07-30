import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/personService';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setNewSearch] = useState('');
  const [notification, setNotification] = useState({ message: null, type: null })

  const handlePersonsResponse = (response) => {
    if (response) {
      setPersons(response)
    }
  }

  const handleNewName = ({ target }) => {
    setNewName(target.value);
  }

  const handleNewNumber = ({ target }) => {
    setNewNumber(target.value);
  }

  const showNotification = (type, message) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    let personFound = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

    if (personFound) {
      const answer = window.confirm(`${newName} is already added to phone book, replace the old number with new one!`);
      if (answer) {
        personFound = { ...personFound, number: newNumber }
        personService.updatePerson(personFound.id, personFound).then(
          returnedPerson => {
            setPersons(persons.map(person => person.id !== personFound.id ? person : returnedPerson))
            showNotification(`${returnedPerson.number} updated with success`, 'success');
          }
        ).catch(error => {
          showNotification(`an error has been occurred please try again later!`, 'error');
        })
      } else {
        return;
      }
    } else {
      const person = { name: newName, number: newNumber };
      personService.createPerson(person).then((response) => {
        setPersons(persons.concat(response))
        setNewName('');
        setNewNumber('');
        showNotification(`${response.name} added with success`, 'success');
      })
        .catch(error => {
          showNotification(`an error has been occurred please try again later!`, 'error');
        })
    }


  }

  const handleOnSearch = ({ target }) => {
    if (!!target.value) {
      setNewSearch(target.value)
      const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(target.value.toLowerCase()))
      setFilteredPersons(filteredPersons)
    } else {
      setNewSearch('')
      setFilteredPersons(null)
    }
  }

  const deletePerson = (id, name) => {
    const answer = window.confirm(`delete ${name} ?`);
    if (answer) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          showNotification(`${name} added with success`, 'success');
        })
        .catch(error => {
          showNotification(`an error has been occurred please try again later!`, 'error');
        })
    } else {
      return;
    }
  }

  useEffect(
    () => {
      personService
        .getAllPersons()
        .then(response => handlePersonsResponse(response))
        .catch(error => {
          showNotification(`an error has been occurred please try again later!`, 'error');
        })
    }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notification.type} message={notification.message} />
      <Filter search={search} handleOnSearch={handleOnSearch} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={!filteredPersons ? persons : filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App