import React, { useState, useEffect } from 'react';

function Forecast({ forecastData, tempUnits, getIcon, getTime, timezone, windowSetup }) {
    const [ narrowForecast, setNarrowForecast ] = useState([]);
    const [ wideForecast, setWideForecast ] = useState([]);

    useEffect(() => {
        setNarrowForecast(formatNarrowForecast());
        setWideForecast(formatWideForecast());
    }, [ forecastData ]);

    function formatNarrowForecast() {
        let data = formatForecastData();
        
        return data.map((item) => {
            return (
                <article key={ item.date } className="forecast-day">
                    <h3>{item.date}</h3>
                    <img 
                        className="forecast-icon" src={`./src/icons/${getIcon(item.weather, item.id)}.svg`}
                        alt={item.weather}
                    ></img>
                    <p>{item.highTemp}</p>
                    <p>{item.lowTemp}</p>
                </article>
            )
        });
    }

    function formatWideForecast() {
        let data = formatForecastData();
        
        return data.map((item) => {
            return (
                <article key={ item.date } className="forecast-day">
                    <h3>{ `${ item.day }, ${ item.month } ${ item.date }` }</h3>
                    <img 
                        className="forecast-icon" src={`./src/icons/${getIcon(item.weather, item.id)}.svg`}
                        alt={item.weather}
                    ></img>
                    <p>{item.weather}</p>
                    <p>{ `High: ${item.highTemp}` }</p>
                    <p>{ `Low: ${item.lowTemp}` }</p>
                </article>
            )
        });
    }

    function formatForecastData() {
        let data = findForecastDayRange();
        let filteredData = [];
        
        // Finds highest temperature and weather associated for each day in forecast
        for (let i = 0; i < data.length; i++) {
            const date = data[i][0];
            const temp = data[i][1];
            const weather = data[i][2];
            const id = data[i][3];
            const month = data[i][4];
            const day = data[i][5];
            const lastIndex = filteredData.length - 1;
            
            if (filteredData.length == 0 || filteredData[lastIndex].date != date) {
                filteredData.push({date: date, highTemp: temp, lowTemp: temp, weather: weather, id: id, month: month, day: day});
            } else {
                if (temp > filteredData[lastIndex].highTemp) {
                    filteredData[lastIndex].highTemp = temp;
                    filteredData[lastIndex].weather = weather;
                    filteredData[lastIndex].id = id;
                }

                if (temp < filteredData[lastIndex].lowTemp) {
                    filteredData[lastIndex].lowTemp = temp;
                }
            }
        }

        return filteredData;
    }

    function findForecastDayRange() {
        let data = [];
        const daySet = new Set;
        const time = getTime(new Date(+ new Date() + (timezone * 1000)), 'forecast');
        const todaysDate = time.date;
        const currentHour = time.hour;
        
        if (forecastData.list) {
            data = forecastData.list.map(item => {
                const date = getTime(new Date((item.dt * 1000) + (timezone * 1000)), 'forecast');
                return [date.date, Math.floor(item.main.temp), item.weather[0].main, item.weather[0].id, date.month, date.day];
            });
        }

        data.forEach(item => {
            daySet.add(item[0]);
        });

        let rangeArray = [...daySet];

        if (currentHour >= 18 && rangeArray[0] == todaysDate) {
            rangeArray.shift();
        } else if (rangeArray.length > 5) {
            rangeArray.pop();
        }

        data = data.filter(item => {
            return rangeArray.includes(item[0]);
        });

        return data;
    }

    return (
        <section id="forecast">
            { windowSetup == 'narrow' ? narrowForecast : wideForecast }
        </section>
    )
}

export default Forecast;
