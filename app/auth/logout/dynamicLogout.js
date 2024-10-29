'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DynamicLogout() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const paramsPage = searchParams?.get('route');
  const { logout } = useAuth();
  useEffect(() => {
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

    handleLogout();
  }, [paramsPage, router]);

  return (
    <div className="logout-window">
      {loading ? (
        <div>Logging out.<br />Please wait...</div>
      ) : (
        <div>Logout failed. Please try again.</div>
      )}
    </div>
  );
}
