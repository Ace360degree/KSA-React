
'use client';
import { useEffect, useState } from "react";



export default function CookieWindow(){

    const[showCookie,setShowCookie] = useState(false);
    const [showCookieError,setShowCookieError] = useState(false);
    const [btntext,setBtntext] = useState('Continue');

    const acceptCookies = async()=>{
        setBtntext('Please Wait...');
        try{
            const response = await fetch('/api/allowcookie',{
                method:'GET',
            });

            const getResponse = await (response.json());
            if(getResponse){
                setShowCookie(false);
            }
        }
        catch(err){
            setShowCookieError(true);
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            setShowCookie(true);
        },2000)
        
    },[])

    return(
        <>
        {showCookie?
            // <div className="cookie-window signifier text-white">
            //     <div className="close-cookie" onClick={()=>{setShowCookie(false)}}><IoCloseCircle />
            //     </div>
            //     <div className="mb-4">
            //     <div className="cookie-title">This website uses Cookies</div>
            //     <div className="cookie-content">We use cookies to give you the best experience when using our website. With your permission, we also set performance and functionality cookies, analytics cookies, advertising cookies and social media cookies.</div>
            //     </div>
                
            //     {showCookieError?<div className="text-danger">Something went Wrong</div>:""}

            //     <div className="cook-btn" >
            //         <button type="button" onClick={()=>{setShowCookie(false)}} className="btn-outline-light btn rounded-3 me-2">close</button>
            //         <button type="button" className="btn-light btn rounded-3" >Accept</button>
            //     </div>
            // </div>

            <div className='dis_main_box_overlay'>
            <div class='dis_main_box'>
                <h1>Disclaimer</h1>
                <p>This Privacy Policy explains how Kuwalsanam Architekts, a Mumbai, India-based architecture firm ("Kuwalsanam
                Architekts," "we," "us," or "our"), uses the personal data we collect from you when you interact with us through our
                website, during business dealings, or in any other way. We are committed to protecting your privacy and providing
                information about our data collection practices.</p>
                <p>Kuwalsanam Architekts may process personal data of potential and existing clients, collaborators, website visitors
                ("you"), and any other individual who interacts with us related to our business activities. We may collect, use, store
                and transfer different kinds of Personal Data about you which we have grouped together as follows:</p>
                <button className='btn btn-light px-4 rounded-pill' onClick={()=>{acceptCookies()}}>{btntext}</button>
            </div >
            </div>


            :null}    
        </>
    );

}