// app/auth/logout/page.js
'use client';

import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function LogoutPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLogout = async () => {
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
