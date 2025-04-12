// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      fontFamily: 'Times New Roman',
      backgroundColor: '#f4f6f8',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏗️ Construction Cost Estimator</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          Welcome to your all-in-one solution for cost-effective construction planning!
          Estimate expenses, optimize material and labor costs, and download detailed reports instantly.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link to="/register">
            <button style={{
              padding: '0.8rem 2rem',
              fontSize: '1rem',
              backgroundColor: '#1d2737',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}>
              ✍️ Register
            </button>
          </Link>

          <Link to="/login">
            <button style={{
              padding: '0.8rem 2rem',
              fontSize: '1rem',
              backgroundColor: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}>
              🔐 Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
