'use client';

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function UserActivity() {
    const location = usePathname();
    const { data: session } = useSession();
    const entryTime = useRef(null); // Persist entry time across pages
    const previousPath = useRef(null); // Store the last visited page

    // Function to send user activity data
    const sendUserData = async (pathname, durationInMillis) => {
        if (!session || durationInMillis <= 0) return;

        const durationInSeconds = Math.round(durationInMillis / 1000); // Convert to seconds
        const form = new FormData();
        form.append('user_id', session.user.email);
        form.append('pathname', pathname); // Store only the page exited from
        form.append('duration', durationInSeconds);

        try {
            const submitData = await fetch('/api/user/submitactivity', {
                method: 'POST',
                body: form,
            });
            const response = await submitData.json();
            if (response.status !== 'success') {
                console.error('Something went wrong. Could not submit user data');
            }
        } catch (error) {
            console.error('Error submitting user data:', error);
        }
    };

    // useEffect(() => {
    //     if (session) {
    //         if (!entryTime.current) {
    //             entryTime.current = Date.now(); // Set entry time only once when user visits the first page
    //         }

    //         // Handle page exit
    //         const handlePageExit = () => {
    //             if (entryTime.current && previousPath.current) {
    //                 const exitTime = Date.now();
    //                 const timeSpent = exitTime - entryTime.current;
    //                 sendUserData(previousPath.current, timeSpent); // Log only previous page
    //             }
    //         };

    //         // Listen for page visibility change (when user switches tabs or leaves)
    //         const handleVisibilityChange = () => {
    //             if (document.visibilityState === 'hidden') {
    //                 handlePageExit();
    //             }
    //         };

    //         window.addEventListener('beforeunload', handlePageExit);
    //         document.addEventListener('visibilitychange', handleVisibilityChange);

    //         return () => {
    //             window.removeEventListener('beforeunload', handlePageExit);
    //             document.removeEventListener('visibilitychange', handleVisibilityChange);
    //         };
    //     }
    // }, [session]); // Runs only once when session exists

    useEffect(() => {
        if (session) {
            // Log the time spent on the previous page before updating
            if (entryTime.current && previousPath.current) {
                const exitTime = Date.now();
                const timeSpent = exitTime - entryTime.current;
                sendUserData(previousPath.current, timeSpent);
            }

            // Update tracking values for the new page
            entryTime.current = Date.now();
            previousPath.current = location; // Store the new page path
        }
    }, [location]); // Runs when the page changes

    return null;
}
