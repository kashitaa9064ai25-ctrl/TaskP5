import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', isError: false });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus({ loading: false, message: 'Please enter an email address.', isError: true });
      return;
    }

    setStatus({ loading: true, message: '', isError: false });

    try {
      const response = await fetch(`${API_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, message: data.message, isError: false });
        setEmail('');
      } else {
        setStatus({ loading: false, message: data.error || 'Subscription failed.', isError: true });
      }
    } catch (err) {
      setStatus({ loading: false, message: 'Could not connect to the backend server.', isError: true });
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f0f0f0', textAlign: 'center', margin: '2rem 0' }}>
      <h3>SIGN UP FOR OUR DAILY INSIDER</h3>
      <form onSubmit={handleSubscribe} style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '1rem' }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.6rem 1rem', width: '280px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          disabled={status.loading}
          style={{ padding: '0.6rem 1.4rem', cursor: 'pointer', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          {status.loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {status.message && (
        <p style={{ marginTop: '1rem', color: status.isError ? 'red' : 'green', fontWeight: 'bold' }}>
          {status.message}
        </p>
      )}
    </div>
  );
}