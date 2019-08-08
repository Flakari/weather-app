import React, { useState, useEffect } from 'react';
import History from './History';
import Footer from './Footer';

function Form({ units, updateUnits, windowSetup, weatherData, formVisible, retrieveWeatherData, city, updateCity }) {
    
    function formChangeHandler(event) {
        updateCity(event.target.value);
    }

    return (
        <div 
            id="form-container" 
            className={(windowSetup == 'narrow' && formVisible == false) ? 'hidden' : undefined}
        >
            <form id="weather-form" onSubmit={ (e) => { e.preventDefault(); retrieveWeatherData(city, units); }}>
                <input 
                    name="Location"
                    id="weather-input"
                    type="text"
                    value={ city }
                    onChange={ formChangeHandler }
                />
                <input id="submit" type="submit" value="Submit" />
            </form>
            <div id="units-container">
                <input id="fahr" name="imperial" type="button" value ="F&deg;" onClick={ updateUnits }/>
                <input id="cel" name="metric" type="button" value ="C&deg;" onClick={ updateUnits } />
            </div>
            <div id="error-container">
                <div id="error"></div>
            </div>
            <div id="search-info">
                <p>Search by zipcode or city name, zipcode is not reliable. If the wrong city appears, search using city or zipcode and country code. Ex: San Francisco, US. Country codes can be found here: <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements" target="_blank" rel="noopener">Link</a></p>
            </div>
            <History updateCity={ updateCity } weatherData={ weatherData }/>
            { windowSetup === 'narrow' ? <Footer /> : null }
        </div>
    )
}

export default Form;
