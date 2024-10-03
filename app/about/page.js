
'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const AboutComponent = dynamic(() => import('./aboutComponent'), {
    ssr: false,
  }) 

export default function About(){

    const[loaded,setLoaded] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
        setLoaded(true);
        },500)
    },[])

    return(
        <>
        {loaded?
        <AboutComponent/>
        :''}
        </>
    )

}