'use client';
import dynamic from 'next/dynamic';
const ContactComponent = dynamic(() => import('./contactComponent'), {
    ssr: false,
  }) 

export default function Contact(){

   return(
    <>
        <ContactComponent/>
    </>
   )

}