import React, { useState } from 'react';

function Form({ updateData, units, updateUnits }) {
    const [ city, setCity ] = useState('');

    function changeHandler(event) {
        setCity(event.target.value);
    }

    function retrieveWeatherData(input, units) {
        const location = encodeURI(input);
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${ location }&units=${ units }&APPID=`;

        fetch(`${ URL }${ getKey() }`, { mode: 'cors' })
            .then((response) => {
                console.log('Called api');
                return response.json();
            })
            .then((response) => {
                return response;   
            })
            .then((response) => {
                if (response.cod != 200) {
                    updateData(response);
                    //console.clear();
                } else {
                    updateData(response);
                }
                return response;
                //errorMessageDisplay(response);
            })
            .catch((error) => {
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
