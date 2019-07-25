import React, { useState, useEffect } from 'react';
import Header from './Header';
import Weather from './Weather';
import Footer from './Footer';

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

    return (
        <main id="container">
            <Header windowSetup={ windowSetup } formVisibility={ formVisibility } formVisible={ formVisible }/>
            <Weather windowSetup={ windowSetup } formVisibility={ formVisibility } formVisible={ formVisible }/>
            { windowSetup !== 'narrow' ? <Footer /> : null }
        </main>
    )
}

export default App;
