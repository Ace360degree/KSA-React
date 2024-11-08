'use client';
import { useEffect } from "react";
import dynamic from "next/dynamic";
// import HomeMenu from "../components/homeMenu/homeMenu";
import NavbarIntroPage from "../components/NavbarIntroPage";
import DarkTheme from "../components/body/darkTheme";

const HomeMenu = dynamic(() => import("../components/homeMenu/homeMenu"), {
    ssr: false,
})

export default function HomePage(){



    return(
        <>
            {/* <h1>Hello</h1> */}
            <DarkTheme/>
            <NavbarIntroPage active={true} transparent={true}/>
            <HomeMenu/>
        </>
    )
}