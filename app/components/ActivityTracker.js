'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const ActivityTracker = () => {
    const { data: session, status } = useSession();
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let intervalId;

        // Function to update user activity
        const updateActivity = async () => {
            if (session?.user?.id) {
                try {
                    console.log('Sending activity update for user:', session.user);
                    const response = await fetch('/api/user/activity', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    });

                    const data = await response.json();
                    
                    if (!response.ok) {
                        console.error('Activity update failed:', {
                            status: response.status,
                            statusText: response.statusText,
                            data: data
                        });
                        return;
                    }

                    console.log('Activity updated successfully:', data);
                } catch (error) {
                    console.error('Failed to update activity:', {
                        error: error.message,
                        stack: error.stack
                    });
                }
            } else {
                console.log('No valid session found, skipping activity update');
            }
        };

        // Function to handle visibility change
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsActive(false);
                if (intervalId) {
                    clearInterval(intervalId);
                }
            } else {
                setIsActive(true);
                startTracking();
            }
        };

        // Function to handle window focus/blur
        const handleFocusChange = () => {
            if (document.hasFocus()) {
                setIsActive(true);
                startTracking();
            } else {
                setIsActive(false);
                if (intervalId) {
                    clearInterval(intervalId);
                }
            }
        };

        // Function to start tracking
        const startTracking = () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
            intervalId = setInterval(() => {
                if (document.hasFocus() && !document.hidden && session?.user?.id) {
                    // alert('Hello User');
                    updateActivity();
                }
            }, 5000);
        };

        // Add event listeners
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleFocusChange);
        window.addEventListener('blur', handleFocusChange);

        // Start tracking initially if user is logged in
        if (status === 'authenticated' && session?.user?.id) {
            console.log('Starting activity tracking for user:', session.user);
            startTracking();
        }

        // Cleanup function
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleFocusChange);
            window.removeEventListener('blur', handleFocusChange);
        };
    }, [session, status]); // Add both session and status as dependencies

    return null; // This component doesn't render anything
};

export default ActivityTracker; 