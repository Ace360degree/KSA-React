'use client'
import LightTheme from "@/app/components/body/lightTheme";
import NavbarIntroPage from "@/app/components/NavbarIntroPage";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProjectSection from "../projectsSection";
import dynamic from "next/dynamic";
import gsap from "gsap/all";
import Image from "next/image";
import CommonLoader from "@/app/components/commons/loaderCommon";


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
    const projectDescrion = useRef(null)
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
      });
 
    useEffect(()=>{
        const fetchProjectsApi = async()=>{
            const fetchProjects = await fetch(`/api/get-projects/getsingle?id=${projectSlug}`);
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
        if(projectTitle.current && projectDescrion.current){
            let projectTititleTL = gsap.timeline();
            projectTititleTL.to(projectTitle.current,{scale:1, duration:2, delay:1})
            projectTititleTL.play();
        }
    },[])





    return (
        <>  
            <LightTheme/>
            

            {loading? <CommonLoader/>:
            <> 
            <SliderCursor/>
            <NavbarIntroPage heading={'Expertise'} subheading={project.category}/>
            
            
            <div className="project-banner">
               <div className="project-title" ref={projectTitle}><h2>{project.project_name}</h2>
               <h4 className="fw-light m-0 project-anima-opacity" ref={projectDescrion}>{project.description}</h4>
               </div>
                {windowSize.width <=750 && project.mobile_banner!=''?
                <Image height={600} width={600} className="project-image-hero" unoptimized  style={{width:'100%',height:'100%'}} placeholder="blur" blurDataURL="/images/white-blur.png" src={process.env.NEXT_PUBLIC_SITE_URL+project.mobile_banner} />
                :<Image height={600} width={600} className="project-image-hero" unoptimized style={{width:'100%',height:'100%'}}  placeholder="blur" blurDataURL="/images/white-blur.png" src={process.env.NEXT_PUBLIC_SITE_URL+project.desktop_banner} />}
            </div>


            {sections.map((section,index)=>(
                <ProjectSection section={section} essecials={essecials} points={points}  key={index} slides={slides[index]}/>
            ))}

            </>
            }
        </>
    )


}