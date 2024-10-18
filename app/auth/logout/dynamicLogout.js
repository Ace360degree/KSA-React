'use client';

import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useUserAuthStore } from '@/app/states/store/userAuthStore';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DynamicLogout(){
    const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const paramsPage = searchParams.get('route');

  const {setLoggedOut} = useUserAuthStore();

  useEffect(() => {
    const handleLogout = async () => { 
      
      try {
        await signOut({ redirect: false }); // Perform sign out without immediate redirect
        // window.location.href = '/auth/login'; // Redirect manually after sign-out is complete
        setLoggedOut;
        if(paramsPage){
            
          router.push(paramsPage);
        }else{
          router.push('/');
        }
      } catch (error) {
        console.error('Logout error:', error);
        setLoading(false);
      }
    };

    handleLogout();
  }, []);

  return(<>

        <div className='logout-window'>
            {loading ? <div>Logging out.<br/>Please Wait...</div> : <div>Logout failed. Please try again.</div>}
        </div>

  </>);

}