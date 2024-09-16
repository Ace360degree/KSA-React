'use client'
import LightTheme from "@/app/components/body/lightTheme";
import NavbarIntroPage from "@/app/components/NavbarIntroPage";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectSection from "../projectsSection";
import dynamic from "next/dynamic";

const SliderCursor = dynamic(() => import('@/app/components/commons/sliderCursor'), {
    ssr: false,
  }) 

  const ProjectEssencials = dynamic(() => import("../projectsEssecials"), {
    ssr: false,
  }) 




export default function ProjectInfo(){

    const pathfull = useParams();
    const projectSlug  = pathfull.projectId;
    const [loading,setLoading] =useState(true);
    const [sections,setSections] = useState([]);
    const [project,setProject] = useState([]);
    const [slides,setSlides] = useState([]);
    const [essecials,setEssenscials] = useState([]);
    const [points,setPoints] = useState([]);
 
    useEffect(()=>{
        const fetchProjectsApi = async()=>{
            const fetchProjects = await fetch(`/api/get-projects/getsingle?id=test-projects4`);
            const getProjects = await (fetchProjects.json());
            console.log(getProjects)
            setProject(getProjects.project);
            setSections(getProjects.tabs);
            setSlides(getProjects.slides);
            setEssenscials(getProjects.attributes);
            setPoints(getProjects.points);
            setLoading(false);
        }

        fetchProjectsApi();
    },[])





    return (
        <>  
            <LightTheme/>
            

            {loading? "":
            <> 
            <SliderCursor/>
            <NavbarIntroPage heading={'Expertise'} subheading={project.category}/>
            </>
            }
            <div class="project-banner">
               <div class="project-title"><h2>{project.project_name}</h2>
               <h4 class="fw-light m-0"></h4>{project.description}</div>
                <img class="project-image-hero" src={process.env.NEXT_PUBLIC_SITE_URL+project.thumbnail} />
            </div>

            <ProjectEssencials essecials={essecials} points={points} />

            {sections.map((section,index)=>(
                <ProjectSection section={section}  key={index} slides={slides[index]}/>
            ))}

        </>
    )


}