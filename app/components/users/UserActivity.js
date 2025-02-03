'use client';

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function UserActivity() {
    const location = usePathname();
    const { data: session } = useSession();
    const entryTime = useRef(null);
    const previousPath = useRef(null);
    const hasLoggedExit = useRef(false);
    const hasLoggedEntry = useRef(false); // Prevents duplicate entry logging
    const [userIP, setUserIP] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    // Function to fetch IP and location
    const fetchIPandLocation = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            setUserIP(data.ip);
            setUserLocation(`${data.city}, ${data.region}, ${data.country_name}`);
        } catch (error) {
            console.error("Error fetching IP/location:", error);
        }
    };

    // Function to send user activity data
    const sendUserData = async (pathname, durationInMillis) => {
        if (!session || durationInMillis < 0 || hasLoggedExit.current) return;

        const durationInSeconds = Math.round(durationInMillis / 1000);
        
        // Prevent incorrect large duration logs
        if (durationInSeconds > 86400) { 
            console.warn("Skipping logging: Suspicious large duration detected:", durationInSeconds);
            return;
        }

        const form = new FormData();
        form.append('user_id', session.user.email);
        form.append('pathname', pathname);
        form.append('duration', durationInSeconds);
        form.append('ip_address', userIP || 'Unknown');
        form.append('location', userLocation || 'Unknown');

        try {
            const submitData = await fetch('/api/user/submitactivity', {
                method: 'POST',
                body: form,
            });
            const response = await submitData.json();
            if (response.status !== 'success') {
                console.error('Error: Could not submit user data');
            } else {
                console.log(`Logged: ${pathname} | Duration: ${durationInSeconds}s | IP: ${userIP} | Location: ${userLocation}`);
            }
        } catch (error) {
            console.error('Error submitting user data:', error);
        }

        hasLoggedExit.current = true; // Prevent duplicate logging
    };

    useEffect(() => {
        fetchIPandLocation(); // Fetch IP and location on first render
    }, []);

    useEffect(() => {
        if (session) {
            if (!entryTime.current) {
                entryTime.current = Date.now();
                hasLoggedExit.current = false;
                hasLoggedEntry.current = false;
            }

            // Ensure the first page visit is logged (homepage issue fix)
            if (!hasLoggedEntry.current) {
                sendUserData(location, 0); // Log entry for the first visit
                hasLoggedEntry.current = true;
            }

            const handlePageExit = () => {
                if (!hasLoggedExit.current && entryTime.current && previousPath.current) {
                    const exitTime = Date.now();
                    const timeSpent = exitTime - entryTime.current;
                    sendUserData(previousPath.current, timeSpent);
                }
            };

            window.addEventListener('beforeunload', handlePageExit);
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden') {
                    handlePageExit();
                }
            });

            return () => {
                window.removeEventListener('beforeunload', handlePageExit);
                document.removeEventListener('visibilitychange', handlePageExit);
            };
        }
    }, [session]);

    useEffect(() => {
        if (session) {
            // Log previous page before switching
            if (entryTime.current && previousPath.current && !hasLoggedExit.current) {
                const exitTime = Date.now();
                const timeSpent = exitTime - entryTime.current;
                sendUserData(previousPath.current, timeSpent);
            }

            // Reset entry time for the new page
            entryTime.current = Date.now();
            previousPath.current = location;
            hasLoggedExit.current = false;
        }
    }, [location]);

    return null;
}
