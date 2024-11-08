'use client';
import NavbarIntroPage from "@/app/components/NavbarIntroPage";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {motion} from 'framer-motion';
import { TweenMax } from "gsap/all";
import { useParams, useSearchParams } from "next/navigation";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide styles
import dynamic from "next/dynamic";
import LightTheme from "@/app/components/body/lightTheme";

const SliderCursor = dynamic(() => import('@/app/components/commons/sliderCursor'), {
    ssr: false,
  }) 

const ScrollifyDisabled = dynamic(() => import('@/app/components/commons/disableScrollify'), {
    ssr: false,
  }) 



export default function IdeasPage(){
    const params = useParams()
    const ideasSlug = params.ideaId;
    const [loaded,setLoaded] = useState(false); 
    const [idea,setIdea] = useState([]);
    const [ideaSections,setIdeasSections] = useState([]);
    const [paramImage,setParamImage] =  useState('');
    const [redirected,setDirected] = useState(false);

    const Searchparams = useSearchParams();
    const paramImageQuery = Searchparams.get('image');
    

    useEffect(()=>{
        if(paramImageQuery){
            setDirected(true);
            setParamImage(paramImageQuery);
        }
    },[])


    useEffect(()=>{

        const fetchIdeasAPI =async()=>{
            const getchIdeas = await fetch(`/api/get-ideas/getsingle?id=${ideasSlug}`);
            const getIdeas = await (getchIdeas.json());
            setIdea(getIdeas.idea);
            setIdeasSections(getIdeas.ideasContent);
            setLoaded(true);
        }

        fetchIdeasAPI();

    },[])





    
    let SliderSettings= {
        rewind: false,
        autoplay:true,
        perPage   : 1,
        autoplay  : true,
        interval:4000,
        pagination: false,
        arrows    : true,
}
    

    return(<>
        <LightTheme/>
        <ScrollifyDisabled/>
        <NavbarIntroPage heading={'Research'} active={true} />
        <SliderCursor/>

        <div className="project-info-section position-relative">
            <div className="project-images-slider">
                <Splide options={SliderSettings} >
                    <SplideSlide>
               
                <div className="ideas-inner-section">
                    {redirected?
                    <motion.img initial={{scale:0.8, y:100}} animate={{scale:1,y:0}} transition={{ease:'easeOut',duration:0.2}} className="ideas-section-img mt-4" src={process.env.NEXT_PUBLIC_SITE_URL+paramImage} />
                    : 
                    <motion.img initial={{scale:0.8}} animate={{scale:1}} transition={{ease:'easeOut',duration:0.2}} className="ideas-section-img mt-4" src={process.env.NEXT_PUBLIC_SITE_URL+idea.image} />
                    }
                    <div className={`row ideas-border ideas-content-trans ${loaded?'active':''} mt-3 align-items-center`}>
                        <div className="col-md-6 position-relative">
                            <div className="title-border-ideas"><span></span></div>
                            <h2 className="ideas-inner-title signifier">{idea.title}</h2>
                        </div>
                        <div className="col-md-6">
                            <p className="ideas-inner-content signifier">{idea.description}</p>
                        </div>
                    </div>
                </div>
                </SplideSlide>
                
                {ideaSections.map((ideas,index)=>(
                <SplideSlide key={index}>   
                <div className="ideas-inner-section" >
                    <img className="ideas-section-img mt-4" src={process.env.NEXT_PUBLIC_SITE_URL+ideas.image} />
                    <div className="row ideas-border mt-3 align-items-center">
                        <div className="col-md-6 position-relative">
                            <div className="title-border-ideas"><span></span></div>
                            <h2 className="ideas-inner-title signifier">{ideas.title}</h2>
                        </div>
                        <div className="col-md-6">
                            <p className="ideas-inner-content signifier">{ideas.description}</p>
                        </div>
                    </div>
                    
                    
                </div>
                </SplideSlide> 
                ))}

                </Splide>
                 
            </div>
        </div>
        
        <Link href={`/ideas?id=${idea.id}`}><div className="close-projects">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="0.576"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" stroke-width="0.576" stroke-linecap="round"></path> </g></svg>
        </div></Link>
    </>)
}