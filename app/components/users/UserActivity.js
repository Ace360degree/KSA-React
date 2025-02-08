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
    const hasLoggedEntry = useRef(false);
    const [userIP, setUserIP] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [deviceInfo, setDeviceInfo] = useState(null);

    // Function to detect user device
    const getDeviceDetails = () => {
        const userAgent = navigator.userAgent;
        let deviceType = "Unknown";
        
        if (/android/i.test(userAgent)) {
            deviceType = "Android";
        } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
            deviceType = "iOS";
        } else if (/Mac/i.test(userAgent)) {
            deviceType = "Mac";
        } else if (/Windows/i.test(userAgent)) {
            deviceType = "Windows PC";
        } else if (/Linux/i.test(userAgent)) {
            deviceType = "Linux PC";
        }

        // Extract brand & model for mobile devices
        let deviceModel = "Unknown Model";
        if (deviceType === "Android" || deviceType === "iOS") {
            const match = userAgent.match(/\(([^)]+)\)/);
            if (match) deviceModel = match[1];
        }

        return `${deviceType} - ${deviceModel}`;
    };

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
        if (durationInSeconds > 86400) return;

        const form = new FormData();
        form.append('user_id', session.user.email);
        form.append('pathname', pathname);
        form.append('duration', durationInSeconds);
        form.append('ip_address', userIP || 'Unknown');
        form.append('location', userLocation || 'Unknown');
        form.append('device', deviceInfo || 'Unknown');

        try {
            const submitData = await fetch('/api/user/submitactivity', {
                method: 'POST',
                body: form,
            });
            const response = await submitData.json();
            if (response.status === 'success') {
                console.log(`Logged: ${pathname} | Duration: ${durationInSeconds}s | IP: ${userIP} | Location: ${userLocation} | Device: ${deviceInfo}`);
            } else {
                console.error('Error: Could not submit user data');
            }
        } catch (error) {
            console.error('Error submitting user data:', error);
        }

        hasLoggedExit.current = true;
    };

    useEffect(() => {
        fetchIPandLocation();
        setDeviceInfo(getDeviceDetails()); // Fetch device info
    }, []);

    useEffect(() => {
        if (session) {
            if (!entryTime.current) {
                entryTime.current = Date.now();
                hasLoggedExit.current = false;
                hasLoggedEntry.current = false;
            }

            if (!hasLoggedEntry.current) {
                sendUserData(location, 0);
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
            if (entryTime.current && previousPath.current && !hasLoggedExit.current) {
                const exitTime = Date.now();
                const timeSpent = exitTime - entryTime.current;
                sendUserData(previousPath.current, timeSpent);
            }

            entryTime.current = Date.now();
            previousPath.current = location;
            hasLoggedExit.current = false;
        }
    }, [location]);

    return null;
}
