
'use client';

import dynamic from 'next/dynamic';
const AboutComponent = dynamic(() => import('./aboutComponent'), {
    ssr: false,
  }) 

export default function About(){

    return(
        <>
        <AboutComponent/>
        </>
    )

}