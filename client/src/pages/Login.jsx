import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email.trim().toLowerCase()));
      const snap = await getDocs(q);

      if (snap.empty) {
        setError('Incorrect email or password. Please try again or create an account.');
        return;
      }

      const userData = snap.docs[0].data();
      const isPasswordValid = await bcrypt.compare(password, userData.password);

      if (!isPasswordValid) {
        setError('Incorrect email or password. Please try again or create an account.');
        return;
      }

      navigate('/');
    } catch (err) {
      setError('An error occurred while logging in: ' + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-280px)] p-6 bg-gray-50">
      <div className="relative w-full max-w-sm p-6 bg-white border border-gray-300 rounded shadow-sm">
        <Link
          to="/signup"
          className="absolute top-4 right-4 text-xs text-blue-600 border border-blue-400 px-2 py-0.5 rounded hover:bg-blue-50"
        >
          Sign up
        </Link>
        <h2 className="mb-6 text-xl font-semibold text-gray-800">Login</h2>

        {error && (
          <div className="p-2 mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Your password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}