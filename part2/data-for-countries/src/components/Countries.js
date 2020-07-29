import React from 'react';
import SingleCountry from './SingleCountry';

const Countries = ({ countries }) => {
    if (countries.length === 1) {
        return <SingleCountry country={countries[0]} />
    } else {
        return (
            <div>
                {
                    countries.length < 10 ?
                        countries?.map(country => (<div key={country.alpha2Code}>
                            {country.name} <button>show</button>
                            </div>)) :
                        'Too many matches, specify another filter'
                }
            </div>
        )
    }

}

export default Countries;