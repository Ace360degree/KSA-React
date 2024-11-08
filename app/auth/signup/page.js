// app/auth/signup/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import Link from 'next/link';
import DarkTheme from '@/app/components/body/darkTheme';
import NavbarIntroPage from '@/app/components/NavbarIntroPage';

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
    <>
          <DarkTheme/>
          <NavbarIntroPage active={true}/>
          <div className='auth-full'>
           <form className='w-100' onSubmit={handleSubmit}>
          <div className="contact-form-box">
             <div>
                <h2 className="text-center">Sign Up</h2>
                 <div className="form-row">
                     <label>Email*</label>
                     <input 
                     className="theme-input" 
                     type='email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required/>
                 </div>

                 <div className="form-row">
                     <label>Password*</label>
                     <input 
                     type='password'
                     className="theme-input" 
                     value={password}
                      onChange={(e) => setPassword(e.target.value)}
                     required/>
                 </div>

                 <div className="form-row">
                    <button
                      type="submit"
                      className="btn-theme"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          Signing Up...
                        </>
                      ) : (
                        <>
                          Sign Up
                        </>
                      )}
                    </button>
                    {error && <p className="text-danger text-center">{error}</p>}
                    <div className="text-center mt-3 text-secondary">
                      Already a member? <Link href={'/auth/login'} className="text-white fw-bold">Sign In</Link>
                    </div>
                 </div>  
             </div>
          </div>
          </form> 
          </div>
    </>
  );
}
