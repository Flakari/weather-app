const fahrButton = document.querySelector('#fahr');
const celButton = document.querySelector('#cel');
const submitButton = document.querySelector('#submit');

const measurementUnits = (() => {
    let units = 'imperial';

    function getUnits() {
        return units;
    }

    function changeUnits(unitType) {
        units = unitType;
    }

    return { getUnits, changeUnits };
})();

function getWeather(units) {
    const city = document.querySelector('#weather-city').value;
    const error = document.querySelector('#error');

    const location = encodeURI(city);
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${ location }&units=${ units }&APPID=`;

    fetch(`${ URL }${ getKey() }`, { mode: 'cors' })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response);
            return response;   
        })
        .then((response) => {
            if (response.cod != 200) {
                console.clear();
                error.textContent = `Error: ${ capitalize(response.message) }`;
            } else {
                error.textContent = '';
                console.log(getTempString(response, units));
                console.log(getWeatherString(response));
                console.log(getWindString(response, units));
            }
            errorMessageDisplay(response);
        })
        .catch((error) => {
            console.log(error);
        });

    function getKey() {
        return window.atob('MTExODcxNTRkYTcyZTNlNGY1MDUzOWEzNWRkYzgxNDQ=');
    }
}

function getTempString(response, units) {
    const tempSymbol = getUnitSymbol(units);
    return 'Current temperature in ' + response.name + ': ' + response.main.temp + ' ' + tempSymbol;
}

function getWeatherString(response) {
    return 'Current weather: ' + response.weather[0].main;
}

function getWindString(response, units) {
    const windMeasurement = getWindMeasurement(units);
    const windDirection = getWindDirection(response.wind.deg);
    return 'Wind: ' + response.wind.speed + windMeasurement + ' ' + windDirection;
}

function getUnitSymbol(units) {
    if (units === 'imperial') {
        return 'F';
    } else {
        return 'C';
    }
}

function getWindMeasurement(units) {
    if (units === 'imperial') {
        return 'mph';
    } else {
        return 'km/h';
    }
}

function getWindDirection(deg) {
    if (deg >= 348.75 || deg <= 11.25) {
        return 'N';
    } else if (deg > 11.25 && deg < 33.75) {
        return 'NNE';
    } else if (deg >= 33.75 && deg <= 56.25) {
        return 'NE';
    } else if (deg > 56.25 && deg < 78.75) {
        return 'ENE';
    } else if (deg >= 78.75 && deg <= 101.25) {
        return 'E';
    } else if (deg > 101.25 && deg < 123.75) {
        return 'ESE';
    } else if (deg >= 123.75 && deg <= 146.25) {
        return 'SE';
    } else if (deg > 146.25 && deg < 168.75) {
        return 'SSE';
    } else if (deg >= 168.75 && deg <= 191.25) {
        return 'S';
    } else if (deg > 191.25 && deg < 213.75) {
        return 'SSW';
    } else if (deg >= 213.75 && deg <= 236.25) {
        return 'SW';
    } else if (deg > 236.25 && deg < 258.75) {
        return 'WSW';
    } else if (deg >= 258.75 && deg <= 281.25) {
        return 'W';
    } else if (deg > 281.25 && deg < 303.75) {
        return 'WNW';
    } else if (deg >= 303.75 && deg <= 326.25) {
        return 'NW';
    } else if (deg > 326.25 && deg < 348.75) {
        return 'NNW';
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function errorMessageDisplay(response) {
    const errorCont = document.querySelector('#error-container');

    if (response.cod != 200) {
        errorCont.classList.add('error-unhidden');
    } else {
        errorCont.classList.remove('error-unhidden');
    }
}

submitButton.addEventListener('click', () => {
    getWeather(measurementUnits.getUnits());
});

fahrButton.addEventListener('click', () =>{
    measurementUnits.changeUnits('imperial');
});

celButton.addEventListener('click', () => {
    measurementUnits.changeUnits('metric');
});
