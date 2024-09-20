// app/auth/login/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import Link from 'next/link';
import DarkTheme from '@/app/components/body/darkTheme';
import NavbarIntroPage from '@/app/components/NavbarIntroPage';

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

    <>    
        <NavbarIntroPage/>
        <DarkTheme/>
        <div class="auth-full">
        <form className='w-100' onSubmit={handleSubmit}>
        <div className="contact-form-box">
             <div>
                <h2 className="text-center">Login</h2>
                 <div className="form-row">
                     <label>Email*</label>
                     <input 
                     className="theme-input" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)} 
                     required/>
                 </div>

                 <div className="form-row">
                     <label>Password*</label>
                     <input className="theme-input"
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required/>
                 </div>

                 <div className='form-row'>
                  <button
                      type="submit"
                      className="btn-theme d-block mx-auto px-4"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          Logging in...
                        </>
                      ) : (
                        <>
                          Sign In
                        </>
                      )}
                    </button>
                    {error && <p className="text-danger text-center">{error}</p>}
                    <div className="text-center mt-3 text-secondary">
                      Not a member? <Link href={'/auth/signup'} className="fw-bold text-white">Sign up</Link>
                    </div>    

                 </div>
              </div>

        </div>
        </form>
        </div>

    </>
  );
}
