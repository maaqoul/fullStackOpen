import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';
import personService from './services/personService';

const URL = 'http://localhost:3001';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setNewSearch] = useState('');

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

  const addPerson = (event) => {
    event.preventDefault()

    let personFound = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

    if (personFound) {
      const answer = window.confirm(`${newName} is already added to phone book, replace the old number with new one!`);
      if (answer) {
        personFound = { ...personFound, number: newNumber }
        personService.updatePerson(personFound.id, personFound).then(
          returnedPerson => setPersons(persons.map(person => person.id !== personFound.id ? person : returnedPerson))
        ).catch(error => alert(error))
      } else {
        return;
      }
    } else {
      const person = { name: newName, number: newNumber };
      personService.createPerson(person).then((response) => {
        setPersons(persons.concat(response))
        setNewName('');
        setNewNumber('');
      })
        .catch(error => alert(error))
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
        .then(() => setPersons(persons.filter(person => person.id !== id)))
        .catch(error => alert(error))
    } else {
      return;
    }
  }

  useEffect(
    () => {
      personService
        .getAllPersons()
        .then(response => handlePersonsResponse(response))
        .catch(error => alert(error))
    }, [])


  return (
    <div>
      <h2>Phonebook</h2>
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