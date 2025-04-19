import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpeg';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className='heading'>Honest Bike Care</h1>
        </Link>
      </div>
     
    </header>
  );
};

export default Header;
