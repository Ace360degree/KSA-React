'use client';
import { useEffect } from "react";
import HomeMenu from "../components/homeMenu/homeMenu";
import NavbarIntroPage from "../components/NavbarIntroPage";



export default function HomePage(){

    useEffect(()=>{
        document.getElementById('navbar').classList.add('active');
        document.querySelector('body').classList.add('dark');
    },[])
    

    return(
        <>
            <NavbarIntroPage/>
            <HomeMenu/>
        </>
    )
}