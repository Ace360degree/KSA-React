'use client';
import NavbarIntroPage from "@/app/components/NavbarIntroPage";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import {motion} from 'framer-motion';
import { TweenMax } from "gsap/all";
import { useParams, useSearchParams } from "next/navigation";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide styles
import dynamic from "next/dynamic";

const SliderCursor = dynamic(() => import('@/app/components/commons/sliderCursor'), {
    ssr: false,
  }) 

const ScrollifyDisabled = dynamic(() => import('@/app/components/commons/disableScrollify'), {
    ssr: false,
  }) 



export default function IdeasPage(){
    const params = useParams()
    const ideasSlug = params.ideaId; 
    const [idea,setIdea] = useState([]);
    const [ideaSections,setIdeasSections] = useState([]);
    const [paramImage,setParamImage] =  useState('');
    const [redirected,setDirected] = useState(false);

    const Searchparams = useSearchParams();
    const paramImageQuery = Searchparams.get('image')
    

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
        <ScrollifyDisabled/>
        <NavbarIntroPage heading={'Research'}/>
        <SliderCursor/>

        <div className="project-info-section position-relative">
            <div className="project-images-slider">
                <Splide options={SliderSettings} >
                    <SplideSlide>
               
                <div className="ideas-inner-section">
                    {redirected?
                    <motion.img initial={{scale:0.8, y:100}} animate={{scale:1,y:0}} transition={{ease:'easeOut',duration:0.2}} className="ideas-section-img" src={process.env.NEXT_PUBLIC_SITE_URL+paramImage} />
                    : 
                    <motion.img initial={{scale:0.8}} animate={{scale:1}} transition={{ease:'easeOut',duration:0.2}} className="ideas-section-img" src={process.env.NEXT_PUBLIC_SITE_URL+idea.image} />
                    }
                    <div className="row mt-3 align-items-center">
                        <div className="col-md-6">
                            <h2 className="ideas-inner-title">{idea.title}</h2>
                        </div>
                        <div className="col-md-6">
                            <p className="ideas-inner-content">{idea.description}</p>
                        </div>
                    </div>
                </div>
                </SplideSlide>
                
                {ideaSections.map((ideas,index)=>(
                <SplideSlide key={index}>   
                <div className="ideas-inner-section" >
                    <img className="ideas-section-img" src={process.env.NEXT_PUBLIC_SITE_URL+ideas.image} />
                    <div className="row mt-3 align-items-center">
                        <div className="col-md-6">
                            <h2 className="ideas-inner-title">{ideas.title}</h2>
                        </div>
                        <div className="col-md-6">
                            <p className="ideas-inner-content">{ideas.description}</p>
                        </div>
                    </div>
                    
                    
                </div>
                </SplideSlide> 
                ))}

                </Splide>
                 
            </div>
            <div className="images-slider-left slider-img-nav"></div>
            <div className="images-slider-right slider-img-nav"></div>
        </div>
        
        <Link href={'/ideas'}><div className="close-projects"><FaXmark /></div></Link>
    </>)
}