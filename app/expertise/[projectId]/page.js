'use client'
import LightTheme from "@/app/components/body/lightTheme";
import NavbarIntroPage from "@/app/components/NavbarIntroPage";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProjectSection from "../projectsSection";
import dynamic from "next/dynamic";
import gsap from "gsap/all";


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
    const projectTitle = useRef(null);
 
    useEffect(()=>{
        const fetchProjectsApi = async()=>{
            const fetchProjects = await fetch(`/api/get-projects/getsingle?id=the-hameed-test`);
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


    useEffect(()=>{
        if(projectTitle.current){
            let projectTititleTL = gsap.timeline();
            projectTititleTL.to(projectTitle.current,{scale:1, duration:2, delay:1});
            projectTititleTL.play();
        }
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
            <div className="project-banner">
               <div className="project-title" ref={projectTitle}><h2>{project.project_name}</h2>
               <h4 className="fw-light m-0">{project.description}</h4></div>
                <img className="project-image-hero" src={process.env.NEXT_PUBLIC_SITE_URL+project.thumbnail} />
            </div>


            {sections.map((section,index)=>(
                <ProjectSection section={section} essecials={essecials} points={points}  key={index} slides={slides[index]}/>
            ))}

        </>
    )


}