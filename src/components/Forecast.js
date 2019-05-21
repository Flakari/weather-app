import React, { useState, useEffect } from 'react';

function Forecast({ forecastData, tempUnits }) {
    const [ formattedForecast, updateFormattedForecast ] = useState([]);

    useEffect(() => {
        updateFormattedForecast(formatForecast());
    }, [ forecastData ]);

    function formatForecast() {
        let dataObj = formatForecastData();
        let dataArray = [];
        
        // Formats forecast data into array for map
        Object.keys(dataObj).forEach((key) => {
            dataArray.push([key, dataObj[Number(key)]]);
        });

        return dataArray.map((data) => {
            return (
                <article key={ data[0] } className="forecast-day">
                    <h3>{data[0]}</h3>
                    <p>{data[1][0]}</p>
                    <p>{data[1][1]}</p>
                </article>
            )
        });
    }

    function formatForecastData() {
        let formatObj = {};
        let data = [];
        
        // Singles out day, temp, and weather for that day
        if (forecastData.list) {
            data = forecastData.list.map(item => {
                const date = new Date(item.dt * 1000);
                return [date.getDate(), Math.floor(item.main.temp), item.weather[0].main];
            });
            console.log(data);
        }

        let todaysDate = new Date().getDate();
        console.log(todaysDate);

        /* Finds highest temperature and weather associated for each day that's not
           the current date */
        for (let i = 0; i < data.length; i++) {
            if (data[i][0] != todaysDate) {
                if (!formatObj.hasOwnProperty(data[i][0])) {
                    formatObj[data[i][0]] = [data[i][1], data[i][2]];
                } else {
                    if (data[i][1] > formatObj[data[i][0]][0]) {
                        formatObj[data[i][0]] = [data[i][1], data[i][2]];
                    }
                }
            }
        }
        console.log(formatObj);
        return formatObj;
    }

    return (
        <article id="forecast">
            { formattedForecast }
        </article>
    )
}

export default Forecast;
