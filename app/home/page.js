'use client';
import { useEffect } from "react";
import dynamic from "next/dynamic";
// import HomeMenu from "../components/homeMenu/homeMenu";
import NavbarIntroPage from "../components/NavbarIntroPage";

const HomeMenu = dynamic(() => import("../components/homeMenu/homeMenu"), {
    ssr: false,
})

export default function HomePage(){

    useEffect(()=>{
        document.getElementById('navbar').classList.add('active');
        document.querySelector('body').classList.add('dark');
    },[])
    

    return(
        <>
            {/* <h1>Hello</h1> */}
            <NavbarIntroPage/>
            <HomeMenu/>
        </>
    )
}