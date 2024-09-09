'use client';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic'
// import HomeComponent from './components/home/homeComponent';


const HomeComponent = dynamic(() => import('./components/home/homeComponent'), {
    ssr: false,
  })
  
export default function Home() {


  
  return (
    <>
        <HomeComponent/>
    </>
  );
}
