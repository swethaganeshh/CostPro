// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const linkStyle = {
    marginRight: '20px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontFamily: 'Times New Roman',
  };

  return (
    <nav style={{
      padding: '1rem 2rem',
      backgroundColor: '#1d2737',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'Times New Roman' }}>
        🧱 CostCalc Pro
      </div>
      <div>
        <NavLink to="/" style={({ isActive }) => ({ ...linkStyle, fontWeight: isActive ? 'bold' : 'normal' })}>Home</NavLink>
        <NavLink to="/dashboard" style={({ isActive }) => ({ ...linkStyle, fontWeight: isActive ? 'bold' : 'normal' })}>Dashboard</NavLink>
        <NavLink to="/optimize" style={({ isActive }) => ({ ...linkStyle, fontWeight: isActive ? 'bold' : 'normal' })}>Cost Optimizer</NavLink>
      </div>
      <div>
      </div>
    </nav>
  );
};

export default Navbar;
