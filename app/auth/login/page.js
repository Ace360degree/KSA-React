// app/auth/login/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

export default function LoginPage() {
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
      // Send POST request to the login route
      const response = await axios.post('/api/auth/login', { email, password });
  
      // Handle response
      if (response.data.error) {
        setError(response.data.error);
      } else {
        // Redirect to the home page on successful login
        router.push('/');
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
        <h2 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i> Sign In</h2>

        {error && <p className="text-danger">{error}</p>}

        <button className="btn btn-outline-light w-100 mb-3">
          <i className="fab fa-google me-2"></i> Sign in with Google
        </button>

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
            <a href="#" className="float-end mt-1 text-light">Forgot?</a>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg mt-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Logging in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i> Sign In
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          Not a member? <a href="/auth/signup" className="text-primary">Sign up</a>
        </div>
      </div>
    </div>
  );
}
