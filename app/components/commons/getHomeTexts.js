'use client';
// context/HomeTextContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context
const HomeTextContext = createContext();

// Context provider component
export const HomeTextProvider = ({ children }) => {
    const [titles, setTitles] = useState(null);

    useEffect(() => {
        const getHomeTexts = async () => {
            try {
                const fetchAPI = await fetch('/api/fetchHomeTexts', { method: 'GET' });
                const data = await fetchAPI.json();
                setTitles(data.data[0]);
            } catch (error) {
                console.error("Failed to fetch home texts:", error);
            }
        };

        getHomeTexts();
    }, []);

    return (
        <HomeTextContext.Provider value={titles}>
            {children}
        </HomeTextContext.Provider>
    );
};

// Custom hook for consuming the context
export const useHomeText = () => {
    return useContext(HomeTextContext);
};
