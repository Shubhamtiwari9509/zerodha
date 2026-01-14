// Signup.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL;

const Signup = () => {
  const [formData, setFormData] = useState({ userName: '', email: '', password: '' });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/signup`, formData, { withCredentials: true });
      setFeedbackMessage(res.data.message || "Signup successful");
      setIsError(false);

      // Store token if backend sends it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Redirect to dashboard
      if (DASHBOARD_URL) {
        window.location.href =DASHBOARD_URL;
      }
    } catch (err) {
      console.error(err);
      setFeedbackMessage(err.response?.data?.message|| "Signup failed");
      setIsError(true);
    }
  };

  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        setFeedbackMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f8fa',
      fontFamily: 'Segoe UI, sans-serif'
    },
    card: {
      width: '360px',
      padding: '40px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    heading: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#333'
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '14px'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#387ed1',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    feedback: {
      textAlign: 'center',
      marginBottom: '16px',
      fontSize: '14px',
      color: isError ? 'red' : 'green'
    }
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <div style={styles.heading}>Create your account</div>
        {feedbackMessage && <div style={styles.feedback}>{feedbackMessage}</div>}
        <input
          style={styles.input}
          type="text"
          name="userName"   // ✅ updated to match backend
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button style={styles.button} type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;