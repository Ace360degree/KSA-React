'use client';
// context/HomeTextContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context
const HomeTextContext = createContext();

// Context provider component
export const HomeTextProvider = ({ children }) => {
    const [title1,setTitle1] = useState(null);
    const [title2,setTitle2] = useState(null);

    useEffect(() => {
        const getHomeTexts = async () => {
            try {
                const fetchAPI = await fetch('/api/fetchHomeTexts', { method: 'GET' });
                const data = await fetchAPI.json();
                setTitle1(data.data[0].title1);
                setTitle2(data.data[0].title2);
            } catch (error) {
                console.error("Failed to fetch home texts:", error);
            }
        };

        getHomeTexts();
    }, []);

    return (
        <HomeTextContext.Provider value={{title1,title2}}>
            {children}
        </HomeTextContext.Provider>
    );
};

// Custom hook for consuming the context
export const useHomeText = () => {
    return useContext(HomeTextContext);
};
