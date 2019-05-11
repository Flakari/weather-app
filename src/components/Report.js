import React from 'react';

function Report( { weatherData }) {
    return (
        <article>
            <p>Weather Report</p>
            <p>{ weatherData.name }</p>
            <p id="temp">{ weatherData.main.temp }</p>
        </article>
    )
}

export default Report;
