import React, { useState, useEffect } from 'react';

function Forecast({ forecastData, getIcon, getTime, timezone, windowSetup }) {
    const [ narrowForecast, setNarrowForecast ] = useState([]);
    const [ middleForecast, setMiddleForecst ] = useState([]);
    const [ wideForecast, setWideForecast ] = useState([]);

    useEffect(() => {
        setNarrowForecast(formatForecastDisplay('narrow'));
        setMiddleForecst(formatForecastDisplay('middle'));
        setWideForecast(formatForecastDisplay('wide'));
    }, [ forecastData ]);

    function formatForecastDisplay(setup) {
        if (setup === 'narrow' || setup === 'middle') {
            return formatForecastData().map(item => {
                return (
                    <article key={ item.date } className="forecast-day">
                        { setup === 'narrow' ? <h3>{ item.date }</h3> : <h3>{ `${ item.day }` }<br/>{ `${ item.month } ${ item.date }` }</h3> }
                        { setup === 'middle' ? <p>{item.weather}</p> : null }
                        <img 
                            className="forecast-icon" src={`./src/icons/${getIcon(item.weather, item.id)}.svg`}
                            alt={item.weather}
                        ></img>
                        <p>{ setup === 'narrow' ? item.highTemp : `High: ${item.highTemp}` }</p>
                        <p>{ setup === 'narrow' ? item.lowTemp : `Low: ${ item.lowTemp }` }</p>
                    </article>
                )
            });
        } else if (setup === 'wide') {
            return formatForecastData().map(item => {
                return (
                    <div key={ item.date }>
                        <div className="forecast-title">
                            <h3>{ `${ item.day }, ${ item.month } ${ item.date }` }</h3>
                        </div>
                        <article className="forecast-day">
                            <p>{item.weather}</p>
                            <img 
                                className="forecast-icon" src={`./src/icons/${getIcon(item.weather, item.id)}.svg`}
                                alt={item.weather}
                            ></img>
                            <p>{ `High: ${item.highTemp}` }</p>
                            <p>{ `Low: ${item.lowTemp}` }</p>
                        </article>
                    </div>
                )
            });
        }
    }

    function formatForecastData() {
        let forecastDataRange = findForecastDayRange();
        let filteredData = [];
        
        // Finds highest temperature and weather associated for each day in forecast
        for (let forecastTime of forecastDataRange) {
            const [date, temp, weather, id, month, day] = forecastTime;
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
            { windowSetup == 'narrow' ? narrowForecast : windowSetup == 'middle' ? middleForecast : wideForecast }
        </section>
    )
}

export default Forecast;
