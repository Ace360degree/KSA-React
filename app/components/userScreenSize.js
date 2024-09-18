'use client';
import { useState, useEffect } from 'react';

export default function UseWindowSize() {
 

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);
    
    // Call the handler right away so state gets updated with initial window size
    handleResize();

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

