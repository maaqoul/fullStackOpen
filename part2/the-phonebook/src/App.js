import React, { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 0 },
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [filteredPersons, setFilteredPersons] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setNewSearch] = useState('');
  const [id, setId] = useState(5);

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