// app/auth/login/page.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import Link from 'next/link';
import DarkTheme from '@/app/components/body/darkTheme';
import NavbarIntroPage from '@/app/components/NavbarIntroPage';
import { signIn } from 'next-auth/react';

import '../../authButton.css';


export default function DynamicLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsPage = searchParams.get('route');

  const [showSuccess,setShowSuccess] = useState(false);

  // Add animation on component mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      // Use NextAuth's signIn method with credentials provider
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      // Handle the result of the signIn function
      if (result.error) {
        setError(result.error);
      } else {
        setShowSuccess(true);
        setTimeout(() => {
          if (paramsPage) {
            router.push(paramsPage);
          } else {
            router.push('/');
          }
        }, 2000);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignIn = () => {
    if(paramsPage){
      signIn('google',{ callbackUrl: paramsPage});
    }
    else{
      signIn('google',{ callbackUrl: '/'});
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

                    {showSuccess?
                        <p className='fw-normal text-success'>Logged in Successfully. Please Wait...</p>
                      :''}

                    <div>
                    <button type='button' className="login-with-google-btn mt-4 w-100" onClick={handleGoogleSignIn}>Sign in with Google</button>
                    </div>  

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
