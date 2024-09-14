'use client';

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