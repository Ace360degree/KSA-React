'use client';

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useVisitedIdeasStore } from "../states/store/ideasStore";

gsap.registerPlugin(ScrollTrigger)

export default function IdeasIntro(){
    const {setIdeasVisited } = useVisitedIdeasStore();
    

    useEffect(() => {

            let projectHeadTitles = document.querySelectorAll('.project-head-title');
            
            projectHeadTitles.forEach(function(title, index) {
                let projectHeadTl = gsap.timeline({ delay: index * 1.1 });
                
                projectHeadTl.fromTo(
                    title,
                    { rotateX: "-90", opacity: 1 },
                    { rotateX: "0", delay: 0.4, duration: 0.4 }
                );

                projectHeadTl.to(title, { height: "auto", y: "0", delay: 0.3, duration: 0.4 });
            });

            setTimeout(function() {
                projectHeadTitles.forEach(function(title) {
                    gsap.to(title, {
                        opacity: 0,
                        duration: 0.6,
                    });
                });
            }, 4000);

            let headAnim = document.querySelector('.head-anim');

            setTimeout(function() {
                gsap.fromTo(
                    headAnim,
                    {
                        background: 'conic-gradient(from 0deg, transparent 0%, black 0%)',
                    },
                    {
                        background: 'conic-gradient(from 0deg, transparent 100%, black 100%)',
                        duration: 1.5,
                        ease: "power3.inOut",
                        delay: 0,
                    }
                );

                setTimeout(function() {
                    document.querySelector('.project-heads').style.display = 'none';
                    document.querySelector('body').classList.remove('loading');
                    setTimeout(()=>{
                        setIdeasVisited();
                    },4000)
                }, 2000);

            }, 5000);
        
    }, []);

    return(
        <>
            <div class="project-heads">
            <div class="head-anim-control">
                <div class="head-anim"></div>
            </div>
            <h2 class="project-head-title lg-text-title"><i>Research</i></h2>
            <h2 class="project-head-title sm-text-title">That makes us</h2>
            <h2 class="project-head-title lg-text-title"><i>Awe</i></h2>
            </div>
        </>
    );

}