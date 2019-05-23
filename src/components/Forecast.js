import React, { useState, useEffect } from 'react';

function Forecast({ forecastData, tempUnits, getIcon }) {
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

        console.log(dataArray);

        return dataArray.map((data) => {
            return (
                <article key={ data[0] } className="forecast-day">
                    <h3>{data[0]}</h3>
                    <img className="forecast-icon" src={`./src/icons/${getIcon(data[1][1], data[1][2])}.svg`}></img>
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
                return [date.getDate(), Math.floor(item.main.temp), item.weather[0].main, item.weather[0].id];
            });
        }

        let time = new Date()
        let todaysDate = time.getDate();
        let currentHour = time.getHours();

        console.log(currentHour);

        // Finds highest temperature and weather associated for each day in forecast
        for (let i = 0; i < data.length; i++) {
            const date = data[i][0];
            const temp = data[i][1];
            const weather = data[i][2];
            const id = data[i][3];
            
            // 5 day forecast advances at 6 pm
            if (currentHour >= 18) {
                if (date != todaysDate) {
                    if (!formatObj.hasOwnProperty(date)) {
                        formatObj[date] = [temp, weather];
                    } else {
                        if (temp > formatObj[date][0]) {
                            formatObj[date] = [temp, weather, id];
                        }
                    }
                }
            } else {
                if (date != todaysDate + 5) {
                    if (!formatObj.hasOwnProperty(date)) {
                        formatObj[date] = [temp, weather];
                    } else {
                        if (temp > formatObj[date][0]) {
                            formatObj[date] = [temp, weather, id];
                        }
                    }
                }
            }
        }
        return formatObj;
    }

    return (
        <article id="forecast">
            { formattedForecast }
        </article>
    )
}

export default Forecast;
