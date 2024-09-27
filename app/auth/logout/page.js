// app/auth/logout/page.js
'use client';

import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useUserAuthStore } from '@/app/states/store/userAuthStore';

export default function LogoutPage() {
  const [loading, setLoading] = useState(true);

  const {setLoggedOut} = useUserAuthStore();

  useEffect(() => {
    const handleLogout = async () => {
      setLoggedOut();
      try {
        await signOut({ redirect: false }); // Perform sign out without immediate redirect
        window.location.href = '/auth/login'; // Redirect manually after sign-out is complete
      } catch (error) {
        console.error('Logout error:', error);
        setLoading(false);
      }
    };

    handleLogout();
  }, []);

  return loading ? <p>Logging out...</p> : <p>Logout failed. Please try again.</p>;
}
