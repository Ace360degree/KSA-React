'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DarkTheme from '@/app/components/body/darkTheme';
import { signOut, useSession } from 'next-auth/react';

export default function DynamicLogout() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const paramsPage = searchParams?.get('route');
  const [showError,setShowError] = useState(false);
  const [showSuccess,setShowSuccess] = useState(false);
  const [loggedout,setLoggedout] = useState(false);


  const {data:session} = useSession();

  console.log(session);

    const handleLogout = async () => {
      setLoading(true); // Set loading at the start of the logout process
      
      try {
        // Use NextAuth's signOut method with redirect: false to control routing manually
        await signOut({ redirect: false });
  
        setShowSuccess(true);
        setLoggedout(true);
        // Redirect based on provided param, else default to home page
        setTimeout(() => {
          
          router.push(paramsPage || '/');
        }, 2000);
      } catch (error) {
        console.error('Logout error:', error);
        setShowError(true);
      } finally {
        setLoading(false); // Ensure loading is reset regardless of success or error
      }
    };

    


  return (
    <>
    <DarkTheme/>
    <div className="logout-window">

      <div className="contact-alert-box">
          <div className="contact-alert signifier">
              {session?
              <h2>Hello, {session.user.name}</h2>:""}
              <h4 className='fw-light'>Are you sure, You want to log out?</h4>
              <p></p>
              {!loggedout?
              <div className='d-flex w-100 justify-content-center' style={{gap:'8px'}}>
                <button type="button" className='btn btn-outline-light ' onClick={()=>{router.back()}}>Back</button>
                <button className="btn btn-light px-4" onClick={()=>{handleLogout()}}>Logout</button>
              </div>
              :''}
              <div className='w-100 text-center'>
                {showError?
                <p className='text-danger small mt-4'>Something went Wrong. Please try again.</p>
                :''}

                {showSuccess?
                <p className='text-success small mt-4'>Logged out Successfully. You will be Redirected.</p>
                :''}
              </div>
          </div>
      </div>
 

    </div>
    </>
  );
}
