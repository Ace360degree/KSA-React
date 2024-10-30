'use client';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic'
import HomeLoader from './components/home/homeLoader';
// import HomeComponent from './components/home/homeComponent';
import { useVisitedStore } from './states/store';


const HomeComponent = dynamic(() => import('./components/home/homeComponent'), {
    ssr: false,
  }) 

export default function Home() {
  
  const { visited } = useVisitedStore();



  return (
    <>
        {visited? <HomeComponent/>: 
        <HomeLoader/>
        }
    </>
  );
}
