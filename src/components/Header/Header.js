import React from 'react';
import './Header.css'; 
import MapLogo from './sidequest.png';

const Header = () => {
    return (
        <header className="header">
            <img src={MapLogo} alt="Logo" className="header-logo" />
        </header>
    );
};

export default Header;
