import React, { useState } from 'react';

function Form({ updateData, updateForecast, units, updateUnits }) {
    const [ city, setCity ] = useState('');

    function changeHandler(event) {
        setCity(event.target.value);
    }

    function retrieveWeatherData(input, units) {
        const location = encodeURI(input);
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${ location }&units=${ units }&APPID=`;
        const fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?q=${ location }&units=${ units }&APPID=`;

        Promise.all([
            fetch(`${ URL }${ getKey() }`, { mode: 'cors' }),
            fetch(`${ fiveDayURL }${ getKey() }`, { mode: 'cors' })
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([res1, res2]) => {
            console.log('Called apis');
            if (res1.cod != 200) {
                updateData(res1);
                updateForecast(res2);
                //console.clear();
            } else {
                updateData(res1);
                updateForecast(res2)
            }   
        })
        .catch(error => {
            console.log(error);
        });

        function getKey() {
            return window.atob('MTExODcxNTRkYTcyZTNlNGY1MDUzOWEzNWRkYzgxNDQ=');
        }
    }

    return (
        <div>
            <form id="weather-form" onSubmit={ (e) => { e.preventDefault(); retrieveWeatherData(city, units); }}>
                <input 
                    name="Location"
                    id="weather-input"
                    value={ city }
                    onChange={ changeHandler }
                />
                <input id="submit" type="submit" value="Submit" />
            </form>
            <input id="fahr" name="imperial" type="button" value ="F&deg;" onClick={ updateUnits }/>
            <input id="cel" name="metric" type="button" value ="C&deg;" onClick={ updateUnits } />
        </div>
    )
}

export default Form;
