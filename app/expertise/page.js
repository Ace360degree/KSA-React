'use client';
import LightTheme from "../components/body/lightTheme";
import ProjectClock from "../components/clock/projectClock";
import NavbarIntroPage from "../components/NavbarIntroPage";
import dynamic from "next/dynamic";

const ProjectBoxes = dynamic(() => import("../components/projects/projectBoxes"), {
    ssr: false,
})

export default function Expertise(){

    return(<>
        
        <LightTheme/>
        <NavbarIntroPage heading={'Expertise'}/>

        <ProjectClock/>
        <ProjectBoxes/>

    </>)

}