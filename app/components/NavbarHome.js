'use client';
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function NavbarHome({heading,subheading,active,lgheight,transparent}){

    const [subHeading,setSubHead]= useState(heading);
    const [activeClass,setactiveClass] = useState(active);
    const [lgHeight,setlgHeight] =useState(lgheight);
    const [navbarTransparent,setNavbarTransparent] =useState(transparent);
    const [smallHeading,setsmallHeading]= useState(subheading);
    const path = usePathname();


    const router = useRouter();
    function routetoPage(link){
      router.push(link);
    }

    return(
        <>
            <div id="navbar" className={`${activeClass?'active':''} ${lgHeight?'lg-height':''} ${navbarTransparent?'transparent':''} `}  style={{color:"white",background:"transparent",opacity:1,transform:0}}>
                <div className="navbar-control">
                    <div className="nav-logo">
                        <span className="cursor-pointer" onClick={()=>{routetoPage('/')}} ><div className="logo-main">KSA<span>{subHeading}</span></div></span>
                        {smallHeading!=''? 
                            <span className="cursor-pointer" onClick={()=>{routetoPage(`/expertise?category=${smallHeading}`)}} ><div className="header-content signifier text-capitalize">{smallHeading}</div></span>
                        : ''}
                    </div>
                    <div className="nav-img-logo cursor-pointer" onClick={()=>{routetoPage('/home')}}>
                        <img className="ksa-logo" width="40" src="/images/ksa-logo.png"/>
                    </div>
                </div>
            </div>
        </>
    )
}