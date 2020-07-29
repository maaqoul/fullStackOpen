import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Countries from './components/Countries';

const URL = process.env.REACT_APP_COUNTRIES_API

function App() {

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(
    () => {
      axios.get(`${URL}/all`).then(({ data }) => {
        setCountries(data)
      })
    },
    []
  );

  const handleFilterCountries = ({ target }) => {
    if (target.value) {
      const fCountries = countries.filter(country => country.name.toLowerCase().includes(target.value.trim().toLowerCase()))
      setFilteredCountries(fCountries)
    } else {
      setFilteredCountries([])
    }
  }

  return (
    <div style={{padding: '10px'}}>
      <div className="filter">
        find countries <input type="text" onChange={handleFilterCountries} />
      </div>
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
