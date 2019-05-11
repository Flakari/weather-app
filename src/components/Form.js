import React, { useState } from 'react';

function Form({ updateData, units }) {
    const [ city, setCity ] = useState('');

    function changeHandler(event) {
        setCity(event.target.value);
    }

    function retrieveWeatherData(input, units) {
        const location = encodeURI(input);
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${ location }&units=${ units }&APPID=`;

        fetch(`${ URL }${ getKey() }`, { mode: 'cors' })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                return response;   
            })
            .then((response) => {
                if (response.cod != 200) {
                    updateData(response);
                    console.clear();
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
            <form onSubmit={ (e) => { e.preventDefault(); retrieveWeatherData(city, units); }}>
                <input 
                    name="Location"
                    value={ city }
                    onChange={ changeHandler }
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Form;
