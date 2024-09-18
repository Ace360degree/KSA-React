'use client';
import LightTheme from "../components/body/lightTheme";
import ProjectClock from "../components/clock/projectClock";
import NavbarIntroPage from "../components/NavbarIntroPage";
import dynamic from "next/dynamic";
import ProjectIntro from "./projectsIntro";
import { useVisitedProjectsStore } from "../states/store/projectsStore";

const ProjectBoxes = dynamic(() => import("../components/projects/projectBoxes"), {
    ssr: false,
})

const ScrollifyDisabled = dynamic(() => import("../components/commons/disableScrollify"), {
    ssr: false,
})

export default function Expertise(){

    const {visited} = useVisitedProjectsStore();

    return(<>
        <ScrollifyDisabled/>
        <LightTheme/>
        <NavbarIntroPage heading={'Expertise'}/>
        {visited?'' :
        <ProjectIntro/>
        }   
        <ProjectClock/>
        <ProjectBoxes/>

    </>)

}