import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WEATHER_API = process.env.REACT_APP_WEATHER_API;
const SUBSCRIPTION_KEY = process.env.REACT_APP_API_KEY;

const SingleCountry = ({ country }) => {
    const [countryWeather, setCountryWeather] = useState(null);
    const { name, capital, population, languages, flag } = country;

    useEffect(
        () => {
            axios.get(`${WEATHER_API}?access_key=${SUBSCRIPTION_KEY}&query=${name}`).then(
                result => {
                    console.log(result.data.current)
                    setCountryWeather(result.data.current)
                }
            )
        },
        [name]
    )
    return (
        <div>
            <h1>{name}</h1>
            <div>capital: {capital}</div>
            <div>population: {population}</div>
            <h3>Languages : </h3>
            <ul>
                {languages.map(language => (<li key={language.iso639_1}> {language.name}</li>))}
            </ul>
            <img alt={name} src={flag} width='100px' />
            <h3>weather in {name}</h3>
            <p><strong>temperature:</strong> {countryWeather?.temperature} Celsius</p>
            <img alt={name} src={countryWeather?.weather_icons[0]} width='100px' />
            <p><strong>wind:</strong>{countryWeather?.wind_speed} mph, direction {countryWeather?.wind_dir}</p>
        </div>
    )
}
export default SingleCountry;