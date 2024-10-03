'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const ContactComponent = dynamic(() => import('./contactComponent'), {
    ssr: false,
  }) 

export default function Contact(){

  const[loaded,setLoaded] = useState(false);

  useEffect(()=>{
    setTimeout(()=>{
      setLoaded(true);
    },500)
  },[])

   return(
    <>
        {loaded?
        <ContactComponent/>
        :''}  
    </>
   )

}