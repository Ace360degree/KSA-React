'use client'
import LightTheme from "@/app/components/body/lightTheme";
import NavbarIntroPage from "@/app/components/NavbarIntroPage";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// import ProjectSection from "../projectsSection";
import dynamic from "next/dynamic";
import gsap from "gsap/all";
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from "next/image";
import CommonLoader from "@/app/components/commons/loaderCommon";
import "jquery-scrollify";
import $ from "jquery";
import NavbarIntroPageUnderline from "@/app/components/NavbarUnderline";
import { useVisitedProjectsStore } from "@/app/states/store/projectsStore";
import Scrollbar from "smooth-scrollbar";


const SliderCursor = dynamic(() => import('@/app/components/commons/sliderCursor'), {
    ssr: false,
  }) 

const ProjectSection = dynamic(() => import('../projectsSection'), {
    ssr: false,
  }) 

  const CheckNavTransparent = dynamic(() => import("@/app/components/commons/checkNavTransparent"), {
    ssr: false,
  }) 

  const ScrollifyDisabled = dynamic(() => import("@/app/components/commons/disableScrollify"), {
    ssr: false,
  }) 


gsap.registerPlugin(ScrollTrigger);

export default function ProjectInfo(){

    const {setVisited} = useVisitedProjectsStore();

    const [resized,setResized] =useState(1);
    const locoContainer = useRef(null);
    const pathfull = useParams();
    const projectSlug  = pathfull.projectId;
    const [loading,setLoading] =useState(true);
    const [sections,setSections] = useState([]);
    const [project,setProject] = useState([]);
    const [slides,setSlides] = useState([]);
    const [essecials,setEssenscials] = useState([]);
    const [videos,setVideos] = useState([]);
    const [points,setPoints] = useState([]);
    const projectTitle = useRef(null);
    const projectDescrion = useRef(null)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
      });
 
    useEffect(()=>{
      try{
        const fetchProjectsApi = async()=>{
            const fetchProjects = await fetch(`/api/get-projects/getsingle?id=${projectSlug}`);
            const getProjects = await (fetchProjects.json());
            console.log(getProjects)
            setProject(getProjects.project);
            setSections(getProjects.tabs);
            setSlides(getProjects.slides);
            setEssenscials(getProjects.attributes);
            setPoints(getProjects.points);
            setVideos(getProjects.videos);
            setLoading(false);
        }
        fetchProjectsApi();
        setVisited();
      }
      catch(err){
        console.log(err);
      }
    },[])


    const scrollContainerRef = useRef(null);
    const scrollbarRef = useRef(null); 

    useEffect(() => {
      if(scrollContainerRef.current){
      scrollbarRef.current = Scrollbar.init(scrollContainerRef.current, {
        damping: 0.1, 
        thumbMinSize: 20, 
      });
  
      ScrollTrigger.scrollerProxy(scrollContainerRef.current, {
        scrollTop(value) {
          return value === undefined ? scrollbarRef.current.scrollTop : scrollbarRef.current.scrollTo(value, 0, 0);
        },
      });
  
      scrollbarRef.current.addListener(ScrollTrigger.update);
  
      return () => {
        if (scrollbarRef.current) {
          scrollbarRef.current.destroy();
        }
      };

    }
    }, [project]);

    useEffect(()=>{
        if(projectTitle.current){
            let projectTititleTL = gsap.timeline();
            projectTititleTL.to(projectTitle.current,{scale:1, duration:1.5, delay:1})
            projectTititleTL.play();
        }
    },[project])


  

  if(project){

    return (
        <>  
        
            <ScrollifyDisabled/>
            <LightTheme/>
            
            {loading? <CommonLoader/>:
            <>
            <CheckNavTransparent/> 
            <SliderCursor/>
            <NavbarIntroPageUnderline heading={'Expertise'} active={true} subheading={project.category}/>
            
            <div ref={scrollContainerRef} id="expertise-inner-page" style={{height:'100vh'}}>
            <div className="project-banner hero-image project-info-section overflow-hidden">
               <div className="project-title " ref={projectTitle}>
                <h2 class="text-capitalize text-start">{project.project_name}</h2>
               <h4 className="fw-normal m-0 project-anima-opacity" ref={projectDescrion}>{project.description}</h4>
               </div>
                {windowSize.width <=750 && project.mobile_banner!=''?
                <Image height={600} width={600} className="project-image-hero hero-image"   style={{width:'100%',height:'100%'}} placeholder="blur" blurDataURL="/images/white-blur.png" src={process.env.NEXT_PUBLIC_SITE_URL+project.mobile_banner} />
                :<Image height={600} width={600} className="project-image-hero hero-image" unoptimized style={{width:'100%',height:'100%'}}  placeholder="blur" blurDataURL="/images/white-blur.png" src={process.env.NEXT_PUBLIC_SITE_URL+project.desktop_banner} />}
            </div>

            <div className="overflow-hidden">
            {sections.map((section,index)=>(
                <ProjectSection scroller={scrollContainerRef.current} section={section} essecials={essecials} points={points} video={videos[index].video}  key={index} slides={slides[index]}/>
            ))}

              
              
            </div>
            </div>
            </>
            }

      
        </>
    )
    
  }else{
    return(
        <div className=" text-center d-flex flex-column justify-content-center align-items-center" style={{height:'100svh'}}>
          <h2 className="signifier fs-1">Error Fetching Project!</h2> <h4 className="fw-light">Please make sure you have entered correct URL.</h4>
        </div>
    )
  }


}