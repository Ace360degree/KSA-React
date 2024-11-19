'use client'
import LightTheme from "@/app/components/body/lightTheme";
import NavbarIntroPage from "@/app/components/NavbarIntroPage";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProjectSection from "../projectsSection";
import dynamic from "next/dynamic";
import gsap from "gsap/all";
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from "next/image";
import CommonLoader from "@/app/components/commons/loaderCommon";
import "jquery-scrollify";
import $ from "jquery";
import LocomotiveScroll from "locomotive-scroll";
import NavbarIntroPageUnderline from "@/app/components/NavbarUnderline";
import { useVisitedProjectsStore } from "@/app/states/store/projectsStore";

const SliderCursor = dynamic(() => import('@/app/components/commons/sliderCursor'), {
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
    },[])

    // useEffect(() => {
  
    //   if (!isTouchDevice) {
    //     // Apply ScrollTrigger normalization only on non-touch devices (like desktops)
    //     ScrollTrigger.normalizeScroll(true);
    //   }
    
    //   return () => {
    //     if (!isTouchDevice) {
    //       ScrollTrigger.normalizeScroll(false);
    //     }
    //   };
    // }, []);


    useEffect(()=>{
        if(projectTitle.current){
            let projectTititleTL = gsap.timeline();
            projectTititleTL.to(projectTitle.current,{scale:1, duration:2, delay:1})
            projectTititleTL.play();
        }
    },[])

    // useEffect(()=>{
    //     let ctx = gsap.context(() => {
    //         if(window.innerWidth > 850){
    //     const sections = gsap.utils.toArray(".project-info-section");

    //     // Create scroll snapping functionality
    //     gsap.to(sections, {
    //     scrollTrigger: {
    //         trigger: sections[0], // Start from the first section
    //         start: "top top", // When top of section hits the top of viewport
    //         end: () => `+=${(sections.length - 1) * window.innerHeight}`, // Scroll until the last section
    //         scrub: 0, // Smooth scrub
    //         snap: 1 / (sections.length - 1), // Snap to the closest section
    //         markers: true, // Remove markers,
    //         duration:0.2,
    //     }
    //     });
    //     }
    // });

    // return () => ctx.revert();

    // },[loading]);

  //   useEffect(() => {
  //     const scroll = new LocomotiveScroll({
  //         el: projectRef.current,
  //         smooth: true, // Enable smooth scrolling
  //     });

  //     return () => {
  //         scroll.destroy(); // Cleanup on unmount
  //     };
  // }, [loading]);

    // useEffect(() => {
    //     const scrollifyFunction = ()=>{            
    //         // Initialize Scrollify
    //         console.log('Scrollify');
    //         $.scrollify.enable();
    //         $.scrollify({
    //           section: ".project-info-section",
    //           sectionName: "project-info-section",
    //           interstitialSection: "",
    //           easing: "easeOutExpo",
    //           scrollSpeed: isTouchDevice?100:1500,
    //           offset: 0,
    //           scrollbars: true,
    //           standardScrollElements: "",
    //           setHeights: true,
    //           overflowScroll: true,
    //           updateHash: false,
    //           touchScroll: true,
    //           before: function(index, sections) {
    //             const nextSection = sections[index]; // Get the next section
    //             if ($(nextSection).hasClass('hero-image')) {
    //                 $('#navbar').addClass('transparent');
    //                 $('.change-svg').addClass('light');
    //             }
    //             else{
    //               $('#navbar').removeClass('transparent');
    //               $('.change-svg').removeClass('light');
    //             }

    //             if ($(nextSection).hasClass('project-underline-section')) {
    //                 $('#navbar').addClass('underlined');
    //             }
    //             else{
    //               $('#navbar').removeClass('underlined');
    //             }
                
    //           },
    //         });
                      
    //     }
        
    //     scrollifyFunction();
    //     return () => $.scrollify.disable(); // Cleanup Scrollify when component unmounts
    //   }, [loading]);

 

      // useEffect(() => {
      //   // Store the initial width and height to compare later
      //   let windowWidth = window.innerWidth;
      //   let windowHeight = window.innerHeight;


      
      //   // Define the resize handler
      //   const handleResize = () => {
      //     // Check if the window dimensions have actually changed
      //     if (window.innerWidth === windowWidth && window.innerHeight === windowHeight) {
      //       return; // If the dimensions haven't changed, it's not a real resize
      //     }
      
      //     // Update stored dimensions after confirming a real resize
      //     windowWidth = window.innerWidth;
      //     windowHeight = window.innerHeight;
      
      //     setLoading(true); // Set loading to true on resize
      //     clearTimeout(window.resizeTimeout); // Clear any existing timeout to avoid multiple triggers
      
      //     window.resizeTimeout = setTimeout(() => {
      //       setLoading(false); // Set loading to false after 1 second (1000ms)
      //     }, 1000);
      //   };
      
      //   // Add the event listener for window resize
      //   window.addEventListener("resize", handleResize);
      
      //   // Cleanup the resize event and timeout on component unmount
      //   return () => {
      //     window.removeEventListener("resize", handleResize);
      //     clearTimeout(window.resizeTimeout); // Clean up the timeout when the component unmounts
      //   };
      // }, []);
      



    return (
        <>  
            <ScrollifyDisabled/>
            <LightTheme/>
            
            {loading? <CommonLoader/>:
            <>
            <CheckNavTransparent/> 
            <SliderCursor/>
            <NavbarIntroPageUnderline heading={'Expertise'} active={true} subheading={project.category}/>
            
            
            <div className="project-banner hero-image project-info-section ">
               <div className="project-title " ref={projectTitle}>
                <h2 class="text-uppercase text-start">{project.project_name}</h2>
               <h4 className="fw-light m-0 project-anima-opacity" ref={projectDescrion}>{project.description}</h4>
               </div>
                {windowSize.width <=750 && project.mobile_banner!=''?
                <Image height={600} width={600} className="project-image-hero hero-image"   style={{width:'100%',height:'100%'}} placeholder="blur" blurDataURL="/images/white-blur.png" src={process.env.NEXT_PUBLIC_SITE_URL+project.mobile_banner} />
                :<Image height={600} width={600} className="project-image-hero hero-image" unoptimized style={{width:'100%',height:'100%'}}  placeholder="blur" blurDataURL="/images/white-blur.png" src={process.env.NEXT_PUBLIC_SITE_URL+project.desktop_banner} />}
            </div>

            <div className="overflow-hidden">
            {sections.map((section,index)=>(
                <ProjectSection section={section} essecials={essecials} points={points} video={videos[index].video}  key={index} slides={slides[index]}/>
            ))}
            </div>

            </>
            }

      
        </>
    )


}