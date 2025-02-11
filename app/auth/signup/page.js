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
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const[disabledtext,setDisabledtext] = useState('');

  const[Disabled,setDisabled] = useState(false);

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
      const response = await axios.post('/api/auth/signup', { fullname,phone,email,password });
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


  
  const checkEmailValid = async()=>{
    try {
      if(email!=''){
      // Send POST request using axios
      const response = await axios.post('/api/auth/checkEmail', { email });
      
      // Check response and update disabled state
      if (response.data.account === true) {
        setDisabled(false);
      }
      else if(response.data.message=='Email is blacklisted'){
        setDisabled(true);
        setDisabledtext('Cannot use Email.')
      } else {
        setDisabled(true);
        setDisabledtext('Email Already Registered.')
      }
    }
    } catch (err) {
      console.error('Error checking email:', err);
    }
  }

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
                     <label>Fullname*</label>
                     <input 
                     className="theme-input" 
                     type="text"
                     value={fullname}
                     onChange={(e) => setFullname(e.target.value)}
                     required/>
                 </div>

                 {/* <div className="form-row">
                     <label>Phone No*</label>
                     <input 
                     className="theme-input" 
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     required/>
                 </div> */}

                  <div className="form-row">
                    <label>Phone No*</label>
                    <input
                      className="theme-input"
                      type="text"
                      value={phone}
                      onChange={(e) => {
                        // Remove any non-digit characters
                        const value = e.target.value.replace(/\D/g, '');
                        // Allow only up to 12 digits
                        if (value.length <= 12) {
                          setPhone(value);
                        }
                      }}
                      required
                    />
                    {/* Custom error message if phone number is not 12 digits */}
                    {phone && phone.length < 6 && (
                      <span className='text-danger'>Please enter Valid Number.</span>
                    )}
                  </div>

                 <div className="form-row">
                     <label>Email*</label>
                     <input 
                     className="theme-input" 
                     type='email'
                     value={email}
                     onKeyUp={checkEmailValid()}
                     onChange={(e) => setEmail(e.target.value)}
                     required/>
                     {Disabled? <p className='text-danger'>{disabledtext}</p>:'' }
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

                    {!Disabled?
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
                    :<button type="submit" className="btn-theme" disabled={true}> Submit </button>}

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
