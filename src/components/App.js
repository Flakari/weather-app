import React, { useState, useEffect } from 'react';
import Header from './Header';
import Weather from './Weather';

function App() {
    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
    const [ windowSetup, setWindowSetup ] = useState('');
    const [ formVisible, setFormVisible ] = useState(true);

    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
    });

    useEffect(() => {
        if (windowWidth <= 650) {
            setWindowSetup('narrow');
        } else if (windowWidth > 650 && windowWidth <= 850) {
            setWindowSetup('middle');
        } else {
            setWindowSetup('wide');
        }
    }, [ windowWidth ]);

    function formVisibility() {
        setFormVisible(!formVisible);
    }

    useEffect(() => {
        console.log(formVisible);
    }, [formVisible])

    return (
        <main id="container">
            <Header windowSetup={ windowSetup } formVisibility={ formVisibility } formVisible={ formVisible }/>
            <Weather windowSetup={ windowSetup } formVisibility={ formVisibility } formVisible={ formVisible }/>
            <p>{ windowWidth }</p>
            <p>{ windowSetup }</p>
        </main>
    )
}

export default App;
