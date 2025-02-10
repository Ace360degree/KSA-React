'use client';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// import HomeMenu from "../components/homeMenu/homeMenu";
import NavbarIntroPage from "../components/NavbarIntroPage";
import DarkTheme from "../components/body/darkTheme";
import NavbarHome from "../components/NavbarHome";

const HomeMenu = dynamic(() => import("../components/homeMenu/homeMenu"), {
    ssr: false,
})

export default function HomePage(){

    const [show,setShow] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            setShow(!show);
        },100);
    },[])

    return(
        <>
            {/* <h1>Hello</h1> */}
            <DarkTheme/>
            {show?
            <>
            <NavbarHome/>
            
            <HomeMenu/>
            </>
            :''}
        </>
    )
}