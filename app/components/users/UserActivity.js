'use client';

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserActivity() {
    const location = usePathname();
    const { data: session } = useSession();
    const [entryTime, setEntryTime] = useState(null);

    useEffect(() => {
        if (session) {
            setEntryTime(Date.now()); 
            const sendUserData = async (durationInMillis) => {
                const durationInSeconds = Math.round(durationInMillis / 1000); // Convert to seconds

                const form = new FormData();
                form.append('user_id', session.user.email);
                form.append('pathname', location);
                form.append('duration', durationInSeconds); // Send duration in seconds

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

            // Event listener for page unload (when the user closes the tab or navigates away)
            const handleUnload = () => {
                const exitTime = Date.now();
                const timeSpent = exitTime - entryTime;
                sendUserData(timeSpent);
            };

            // Listen for visibility change (when user switches tabs)
            const handleVisibilityChange = () => {
                if (document.visibilityState === 'hidden') {
                    handleUnload(); // Send data when the page is hidden (minimized or switched tab)
                }
            };

            window.addEventListener('beforeunload', handleUnload);
            document.addEventListener('visibilitychange', handleVisibilityChange);

            return () => {
                window.removeEventListener('beforeunload', handleUnload);
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            };
        } else {
            console.log('No user logged in');
        }
    }, [location, session]);

    return null;
}
