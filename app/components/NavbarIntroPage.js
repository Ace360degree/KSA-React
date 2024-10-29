'use client';
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";


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


    return(
        <>
            <div id="navbar" className={activeClass?'active':''} >
                <div className="navbar-control">
                    <div className="nav-logo">
                        <Link href={'/'} scroll={false}><div className="logo-main">KSA<span>{subHeading}</span></div></Link>
                        {smallHeading!=''? 
                            <Link href={`/expertise?category=${smallHeading}`} scroll={false}><div className="header-content signifier text-capitalize">{smallHeading}</div></Link>
                        : ''}
                    </div>
                    <div className="nav-img-logo">
                        <Link href={'/home'} scroll={false}><img className="ksa-logo" width="40" src="/images/ksa-logo.png"/></Link>
                    </div>
                </div>
            </div>
        </>
    )
}