import React from 'react';

function Header() {
    return (
        <header>
            <button id="header-icon"><img src="./src/icons/hamburger2.svg"></img></button>
            <h1>Weather!</h1>
            <div style={{height: `37px`, width: `32px`, visibility: 'hidden'}}></div>
        </header>
    )
}

export default Header;
