import React, { useState, useEffect } from 'react';
import Header from './Header';
import Weather from './Weather';

function App() {
    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
    const [ windowSetup, setWindowSetup ] = useState('');

    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
    });

    useEffect(() => {
        if (windowWidth <= 750) {
            setWindowSetup('narrow');
        } else {
            setWindowSetup('wide');
        }
    }, [ windowWidth ]);

    return (
        <main id="container">
            <Header windowSetup={ windowSetup }/>
            <Weather windowSetup={ windowSetup }/>
            <p>{ windowWidth }</p>
            <p>{ windowSetup }</p>
        </main>
    )
}

export default App;
