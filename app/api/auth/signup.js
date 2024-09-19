// app/auth/signup/page.js
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Import the useRouter hook

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Optional: Handle error messages
  const router = useRouter(); // Initialize useRouter for redirection

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the sign-up request
      const response = await axios.post('/api/auth/signup', { email, password });
      console.log('Sign-up successful:', response.data);

      // Redirect to login or home page after signup
      router.push('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError(error.response?.data?.message || 'Sign-up failed'); // Set the error message
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if exists */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
