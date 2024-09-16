'use client';

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useVisitedProjectsStore } from "../states/store/projectsStore";

gsap.registerPlugin(ScrollTrigger)
export default function ProjectIntro(){
    const {setVisited} = useVisitedProjectsStore();

    useEffect(()=>{
        let projectHeadTitles = document.querySelectorAll('.project-head-title');
        
        projectHeadTitles.forEach(function(title,index){
            
            let projectHeadTl = gsap.timeline({ delay: index * 1.1 });
            
            projectHeadTl.fromTo(title,
                {rotateX:"-90",opacity:1},
                {rotateX:"0", delay:0.4,duration:0.4,}
                );
                
            projectHeadTl.to(title,{height:"auto",y:"0", delay:0.3,duration:0.4}) 
        });
        
    
    setTimeout(function(){
         projectHeadTitles.forEach(function(title,index){
             gsap.to(title,{
                 opacity:0,
                 duration:0.6,
             });
         });
    },4000)    
    
    
    let headAnim = document.querySelector('.head-anim');
    // let headAnimTl= gsap.timeline();
        setTimeout(function() {
        
        gsap.fromTo(headAnim,{
            background:'conic-gradient(from 0deg, transparent 0%, black 0% )',
        },{
            background:'conic-gradient(from 0deg, transparent 100% , black 100% )',
            duration:1.5,
            ease: "power3.inOut",
            delay:0,
        });
        
                    let url_string = window.location.href; 
            let url = new URL(url_string);
            let project = url.searchParams.get("project");
            let itemId  = url.searchParams.get("id");
            
            function ScrolltoProject(param){
                document.querySelectorAll('.projects-items').forEach(function(el){
                    let thisParams = el.getAttribute('data-id');
                    console.log(thisParams);
                    if(thisParams==param && el.classList.contains('active')){
                        smoothScroll(el.offsetTop - 100, 100);
                    }
                })
            }
            
            if(project){
                ScrolltoProject(itemId);
            document.querySelectorAll('.filter-box li').forEach(function(list){
                list.classList.remove('selected');
                if(list.getAttribute('data-filter')==project){
                    list.classList.add('selected');
                    // alert(project)
                    addFilter(project);
            
                }
            });
            }
        
        
        setTimeout(function(){
            document.querySelector('.project-heads').style.display='none';
            setVisited();
        },2000)
        
    }, 5000); 
    },[]);

    return(
        <>
            <div class="project-heads">
            <div class="head-anim-control">
                <div class="head-anim"></div>
            </div>
            <h2 class="project-head-title lg-text-title"><i>Projects</i></h2>
            <h2 class="project-head-title sm-text-title">That makes us</h2>
            <h2 class="project-head-title lg-text-title"><i>Blush</i></h2>
            </div>
        </>
    );

}