'use client';
import Link from "next/link";
import { useEffect, useState } from "react";


export default function NavbarIntroPage({heading,subheading}){

    const [subHeading,setSubHead]= useState(heading);
    const [smallHeading,setsmallHeading]= useState(subheading);



    return(
        <>
            <div id="navbar" className="active" >
                <div className="navbar-control">
                    <div className="nav-logo">
                        <Link href={'/'}><div className="logo-main">KSA<span>{subHeading}</span></div></Link>
                        {smallHeading!=''? 
                            <Link href={`/expertise?=category${smallHeading}`}><div className="header-content">{smallHeading}</div></Link>
                        : ''}
                    </div>
                    <div className="nav-img-logo">
                        <Link href={'/home'}><img className="ksa-logo" width="40" src="/images/ksa-logo.png"/></Link>
                        {/* <Link href={'/home'}><img className="ksa-logo" width="40" src={process.}/></Link> */}
                    </div>
                </div>
            </div>
        </>
    )
}