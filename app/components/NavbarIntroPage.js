'use client';
import Link from "next/link";
import { useState } from "react";


export default function NavbarIntroPage({heading}){

    const [subHeading,setSubHead]= useState(heading);

    return(
        <>
            <div id="navbar" className="active">
                <div className="navbar-control">
                    <div className="nav-logo">
                        <Link href={'/'}><div className="logo-main">KSA<span>{subHeading}</span></div></Link>
                        <div className="header-content"></div>
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