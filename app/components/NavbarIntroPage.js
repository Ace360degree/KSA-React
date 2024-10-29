'use client';
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function NavbarIntroPage({heading,subheading}){

    const [subHeading,setSubHead]= useState(heading);
    const [activeClass,setactiveClass] = useState(true);
    const [smallHeading,setsmallHeading]= useState(subheading);
    const path = usePathname();
    
    useEffect(()=>{
        if(path=='/'){
            setactiveClass(false);
        }

    },[]);


    const router = useRouter();
    function routetoPage(link){
      router.push(link);
    }


    return(
        <>
            <div id="navbar" className={activeClass?'active':''} >
                <div className="navbar-control">
                    <div className="nav-logo">
                        <span className="cursor-pointer" onClick={()=>{routetoPage('/')}} ><div className="logo-main">KSA<span>{subHeading}</span></div></span>
                        {smallHeading!=''? 
                            <span className="cursor-pointer" onClick={()=>{routetoPage(`/expertise?category=${smallHeading}`)}} ><div className="header-content signifier text-capitalize">{smallHeading}</div></span>
                        : ''}
                    </div>
                    <div className="nav-img-logo">
                        <span className="cursor-pointer" onClick={()=>{routetoPage('/home')}}><img className="ksa-logo" width="40" src="/images/ksa-logo.png"/></span>
                    </div>
                </div>
            </div>
        </>
    )
}