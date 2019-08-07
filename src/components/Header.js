import React from 'react';

function Header({ windowSetup, formVisibility }) {
    return (
        <header>
            <button id="header-icon" onClick={ formVisibility }><img src="icons/hamburger2.svg"></img></button>
            <h1>Weather!</h1>
            <div style={{height: `60px`, width: `60px`, visibility: 'hidden'}}></div>
        </header>
    )
}

export default Header;
