'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import DarkTheme from '@/app/components/body/darkTheme';

export default function DynamicLogout() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const paramsPage = searchParams?.get('route');
  const { logout } = useAuth();

  const [showError,setShowError] = useState(false)


    const handleLogout = async () => {
      setLoading(true); // Set loading at the start of the logout process
      
      try {
        const response = await fetch('/api/auth/signout', { method: 'POST' });
        if (!response.ok) {
          throw new Error(`Logout failed with status: ${response.status}`);
        }

        logout();

        // Redirect based on provided param, else default to home page
        router.push(paramsPage || '/');
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        setLoading(false); // Ensure loading is reset regardless of success or error
      }
    };

    


  return (
    <>
    <DarkTheme/>
    <div className="logout-window">

      <div className="contact-alert-box">
          <div className="contact-alert">
              <h1>Are you sure, You want to log out?</h1>
              <p></p>
              <div className='d-flex w-100 justify-content-center' style={{gap:'8px'}}>
                <button type="button" className='btn btn-outline-light ' onClick={()=>{router.back()}}>Back</button>
                <button className="btn btn-light px-4" onClick={()=>{handleLogout()}}>Logout</button>
              </div>
              <div className='w-100 text-center'>
                {showError?
                <p className='text-danger'>Something went Wrong. Please try again.</p>
                :''}
              </div>
          </div>
      </div>
 

    </div>
    </>
  );
}
