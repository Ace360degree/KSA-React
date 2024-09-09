'use client';

import LightTheme from "../components/body/lightTheme";
import ProjectClock from "../components/clock/projectClock";
import NavbarIntroPage from "../components/NavbarIntroPage";
import ProjectBoxes from "../components/projects/projectBoxes";

export default function Expertise(){

    return(<>
        
        <LightTheme/>
        <NavbarIntroPage heading={'Expertise'}/>

        <ProjectClock/>
        <ProjectBoxes/>

    </>)

}