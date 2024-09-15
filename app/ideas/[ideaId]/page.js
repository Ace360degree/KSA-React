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


    useEffect(()=>{

    const sliderCursor = document.querySelector('.slider-cursor');
    const sliderIcon = document.querySelector('.slider-cursor-icon');
    var posX = 0,
        posY = 0;
    
    var mouseX = 0,
        mouseY = 0;
    
    TweenMax.to({}, 0.016, {
      repeat: -1,
      onRepeat: function() {
        posX += (mouseX - posX) / 8;
        posY += (mouseY - posY) / 8;
        
        TweenMax.set(sliderCursor, {
            css: {    
            left: posX - 24,
            top: posY - 24
            }
        });
        
        TweenMax.set(sliderIcon, {
            css: {    
            left: mouseX - 12,
            top: mouseY - 12,
            }
        });
      }
    });
    
    document.addEventListener("mousemove", function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

        function onEnterShow(){
            document.querySelector('.cursor-lg').classList.add('hide-cs');
           document.querySelector('.cursor-sm').classList.add('hide-cs');
           
           document.querySelector('.slider-cursor').classList.add('show-cursor');
           document.querySelector('.slider-cursor-icon').classList.add('show-cursor');
        }
        
        function onLeaveHide(){
            document.querySelector('.cursor-lg').classList.remove('hide-cs');
           document.querySelector('.cursor-sm').classList.remove('hide-cs');
           
           document.querySelector('.slider-cursor').classList.remove('show-cursor');
           document.querySelector('.slider-cursor-icon').classList.remove('show-cursor');
        }
        
        
      //   Left Side
        document.querySelector('.images-slider-left').addEventListener('mouseenter',()=>{
           onEnterShow();
           document.querySelector('.slider-cursor-icon').classList.add('fa-angle-left');
        });
        
        document.querySelector('.images-slider-left').addEventListener('mouseleave',()=>{
           onLeaveHide();
           document.querySelector('.slider-cursor-icon').classList.remove('fa-angle-left');
        });
        
        
      //   Right Side
        document.querySelector('.images-slider-right').addEventListener('mouseenter',()=>{
           onEnterShow();
           document.querySelector('.slider-cursor-icon').classList.add('fa-angle-right');
        });
        
        document.querySelector('.images-slider-right').addEventListener('mouseleave',()=>{
           onLeaveHide();
           document.querySelector('.slider-cursor-icon').classList.remove('fa-angle-right');
        });
        
        document.querySelector('.images-slider-left').addEventListener('mousemove',()=>{
            if(document.querySelector('.images-slider-left').classList.contains('slick-disabled')){
                document.querySelector('.slider-cursor').classList.add('inactive');
                document.querySelector('.slider-cursor-icon').classList.add('inactive');
            }
        })
        
        document.querySelector('.images-slider-left').addEventListener('mouseleave',()=>{
            if(document.querySelector('.images-slider-left').classList.contains('slick-disabled')){
                document.querySelector('.slider-cursor').classList.remove('inactive');
                document.querySelector('.slider-cursor-icon').classList.remove('inactive');
            }
        })
      
        document.querySelector('.images-slider-right').addEventListener('mousemove',()=>{
            if(document.querySelector('.images-slider-right').classList.contains('slick-disabled')){
                document.querySelector('.slider-cursor').classList.add('inactive');
                document.querySelector('.slider-cursor-icon').classList.add('inactive');
            }
        })
        
        document.querySelector('.images-slider-right').addEventListener('mouseleave',()=>{
            if(document.querySelector('.images-slider-right').classList.contains('slick-disabled')){
                document.querySelector('.slider-cursor').classList.remove('inactive');
                document.querySelector('.slider-cursor-icon').classList.remove('inactive');
            }
        })
    },[]);


    
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
        <NavbarIntroPage heading={'Research'}/>
        {/* Slider Cursor */}
        <div className="slider-cursor"></div>
        <i className="slider-cursor-icon fa-solid"></i>
        {/* Slider Cursor */}

        <div className="project-info-section position-relative">
            <div className="project-images-slider">
                <Splide options={SliderSettings} >
                    <SplideSlide>
               
                <div className="ideas-inner-section">
                    {redirected?
                    <motion.img initial={{scale:0.8,y:100}} animate={{scale:1,y:0}} transition={{ease:'easeOut',duration:0.2}} className="ideas-section-img" src={process.env.NEXT_PUBLIC_SITE_URL+paramImage} />
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