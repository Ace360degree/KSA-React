
'use client';
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";


export default function CookieWindow(){

    const[showCookie,setShowCookie] = useState(false);
    const [showCookieError,setShowCookieError] = useState(false);

    const acceptCookies = async()=>{
        try{
            const response = await fetch('api/allowcookie',{
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
            <div className="cookie-window signifier text-white">
                <div className="close-cookie" onClick={()=>{setShowCookie(false)}}><IoCloseCircle />
                </div>
                <div className="mb-4">
                <div className="cookie-title">This website uses Cookies</div>
                <div className="cookie-content">We use cookies to give you the best experience when using our website. With your permission, we also set performance and functionality cookies, analytics cookies, advertising cookies and social media cookies.</div>
                </div>
                
                {showCookieError?<div className="text-danger">Something went Wrong</div>:""}

                <div className="cook-btn" >
                    <button type="button" onClick={()=>{setShowCookie(false)}} className="btn-outline-light btn rounded-3 me-2">close</button>
                    <button type="button" className="btn-light btn rounded-3" onClick={()=>{acceptCookies()}}>Accept</button>
                </div>
            </div>
            :''}    
        </>
    );

}