import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const URL = 'http://localhost:3001';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setNewSearch] = useState('');
  const [id, setId] = useState(5);

  const handlePersonsResponse = (response) => {
    if (response) {
      console.log(response);
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
    const index = persons.findIndex(person => person.name === newName);
    if (index !== -1) {
      alert(`${newName} already exists`);
      return;
    }
    const person = { name: newName, number: newNumber, id };
    setPersons([...persons, person])
    setNewName('');
    setNewNumber('');
    setId(id + 1);
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

  useEffect(
    () => {
      axios.get(`${URL}/persons`).then(({data}) => handlePersonsResponse(data))
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
      <Persons persons={!filteredPersons ? persons : filteredPersons} />
    </div>
  )
}

export default App