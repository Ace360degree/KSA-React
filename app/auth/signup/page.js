// app/auth/signup/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  // Add animation on component mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/signup', { email, password });
      if (response.data.error) {
        setError(response.data.error);
      } else {
        router.push('/auth/login'); // Redirect to the login page after successful sign-up
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div
        className={`card p-4 shadow-lg ${animate ? 'animate__animated animate__fadeIn' : ''}`}
        style={{ width: '350px', borderRadius: '15px', backgroundColor: '#1f1f1f', color: 'white' }}
      >
        <h2 className="text-center mb-3"><i className="fas fa-user-plus"></i> Sign Up</h2>

        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <div className="input-group">
              <span className="input-group-text bg-dark text-light">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control bg-dark text-light"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <div className="input-group">
              <span className="input-group-text bg-dark text-light">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control bg-dark text-light"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg mt-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Signing Up...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i> Sign Up
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          Already a member? <a href="/auth/login" className="text-primary">Sign In</a>
        </div>
      </div>
    </div>
  );
}
