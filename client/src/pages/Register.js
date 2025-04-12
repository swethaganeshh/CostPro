// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
      });
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4',
      fontFamily: 'Times New Roman',
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2rem 3rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>📝 Register</h2>
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '1rem',
              backgroundColor: '#1d2737',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
