import React, { useState, useEffect } from 'react';

function History({ setCity, weatherData }) {
    const [ history, setHistory ] = useState(window.localStorage && window.localStorage.getItem('history') ? JSON.parse(window.localStorage.getItem('history')) : []);
    const [ formattedHistory, setFormattedHistory ] = useState([]);

    useEffect(() => {
        if (weatherData.hasOwnProperty('cod')) {
            if (weatherData.cod == 200) {
                historyChangeHandler();
            }
        }
    }, [ weatherData ]);

    useEffect(() => {
        formatHistory();
    }, [ history[0] ]);

    function formatHistory() {
        setFormattedHistory(history.map(item => {
            return (
                <li 
                    key={item} 
                    className="history"
                >
                    <button onClick={ historyClickHandler }>{ item }</button>
                </li>
            )
        }));
    }

    function historyClickHandler(event) {
        setCity(event.target.innerText);
    }

    function historyChangeHandler() {
        let newHistory = history;
        let city = `${ weatherData.name }, ${ weatherData.sys.country }`;

        if (newHistory.includes(city)) {
            newHistory = newHistory.filter(item => item !== city);
        }

        newHistory.unshift(city);

        if (newHistory.length > 3) { newHistory.pop(); }

        if (window.localStorage) {
            const localStorage = window.localStorage;
            localStorage.setItem('history', JSON.stringify(newHistory));
            setHistory(JSON.parse(localStorage.getItem('history')));
        } else {
            setHistory(newHistory);
        }
    }

    return (
        <div id="past-input-container">
            <ul>{ formattedHistory }</ul>
        </div>
    )
}

export default History;
