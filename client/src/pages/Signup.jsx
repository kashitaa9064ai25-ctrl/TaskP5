import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email.trim().toLowerCase()));
      const snap = await getDocs(q);

      if (!snap.empty) {
        setError('An account with this email address already exists.');
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await addDoc(usersRef, {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });

      navigate('/login');
    } catch (err) {
      setError('Registration failed: ' + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-280px)] p-6 bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-300 rounded shadow-sm">
        <h2 className="mb-6 text-lg font-medium text-center text-blue-600">
          Create a DEV@Deakin Account
        </h2>

        {error && (
          <div className="p-2 mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password*</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm password*</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}