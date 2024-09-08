'use client';

import { useEffect,useState } from "react";
import LightTheme from "../components/body/lightTheme";
import NavbarIntroPage from "../components/NavbarIntroPage";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import Link from "next/link";
import Image from "next/image";

export default  function Ideas(){

    const [ideas, setIdeas] = useState([]);

        // Fetch ideas from API
        useEffect(() => {
            const fetchIdeasAPI = async () => {
                try {
                    const response = await fetch('/api/get-ideas', { method: 'GET' });
                    if (!response.ok) throw new Error('Failed to fetch ideas');
                    const data = await response.json();
                    setIdeas(data);
                    setIsLoaded(true); // Mark content as loaded
                } catch (error) {
                    console.error(error.message);
                }
            };
    
            fetchIdeasAPI();
        }, []);

    gsap.registerPlugin(ScrollTrigger,ScrollToPlugin )
    
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
        },2000)
        
    }, 5000);

    },[])

    useEffect(()=>{

        let ctx = gsap.context(() => {


        document.addEventListener('mousemove', function(e){
        
            let height = window.innerHeight;
            let width = window.innerWidth;
            
            let PsX = (e.clientX/width )- '0.60';
            let PsY = (e.clientY/height )- '0.60';
            
            gsap.to('.ideas-item',{
                rotationX:PsX,
                rotationY:PsY,
            })
        })
        
        
        
            // Snap to a specific section
    // Snap to a specific section
    let panels = gsap.utils.toArray(".snap-section"),
        triggers, scrollTween;
    
    function goToSection(trigger, i) {
        scrollTween = gsap.to(window, {
            scrollTo: { y: trigger.start + innerHeight, autoKill: false },
            duration: 0.5,
            onComplete: () => scrollTween = null,
            overwrite: true
        });
    }
    
    function scrollToCurrentItem(currentItem) {
        if (currentItem) {
            // Delay scrolling slightly to allow ScrollTrigger to set up correctly
            setTimeout(() => {
                const scrollPosition = currentItem.getBoundingClientRect().top + window.pageYOffset;
                gsap.to(window, {
                    scrollTo: { y: scrollPosition, autoKill: false },
                    duration: 0.5
                });
            }, 500); // Adjust the delay if needed
        }
    }
    
    triggers = panels.map((panel, i) => {
        let imgPanel = panel.querySelector('.ideas-cover');
        
        let imganelTimeline = gsap.timeline();
        imganelTimeline.to(imgPanel, { height: "0", delay: 0.5, duration: 0.5 })
                       .to(imgPanel, { height: "0", delay: 0.5, duration: 0.5 });
        
        return ScrollTrigger.create({
            trigger: panel,
            start: "top bottom",
            animation: imganelTimeline,
            scrub: true,
            onToggle: self => { if (self.isActive && !scrollTween) { goToSection(self, i) } },
        });
    });
    
    ScrollTrigger.create({
        start: 0,
        end: "max",
        snap: (v, self) => gsap.utils.snap([0, self.end, ...triggers.map(t => t.start + innerHeight)], self.scroll()) / self.end
    });
    
    ScrollTrigger.normalizeScroll(true);
    
    // Handle scrolling to the current item if itemId is present
    let url_string = window.location.href; 
    let url = new URL(url_string);
    let itemId = url.searchParams.get("id");  
    let getCurrentIdeaItem;
    
    if (itemId) {
        document.querySelectorAll('.snap-section').forEach(function(el) {
            let currId = el.getAttribute('data-id');
            if (currId == itemId) {
                getCurrentIdeaItem = el;
            }
        });
        if (getCurrentIdeaItem) {
            // Scroll to the item after ScrollTrigger setup
            setTimeout(() => scrollToCurrentItem(getCurrentIdeaItem), 500); // Adjust delay if necessary
        }
    }
         


        });

        return () => ctx.revert();

    });


    useEffect(()=>{
            setTimeout(function(){
                
                document.querySelectorAll('.ideas-cover').forEach((obj,index)=>{
                    obj.classList.add('active');
                })
                
                document.querySelector('.snap-parent-anim').classList.add('active');
                
                document.querySelectorAll('.scale-up-idea').forEach((obj,index)=>{
                    obj.classList.add('active');
                })
                
                setTimeout(function(){
                     document.querySelectorAll('.ideas-cover').forEach((obj,index)=>{
                        obj.classList.remove('active');
                    })
                },5000)
                
        
            },5500);    
            
    },[])





    return(
        <>  
            <LightTheme/>
            <NavbarIntroPage heading={'Research'}/>
        <div class="project-heads">
            <div class="head-anim-control">
                <div class="head-anim"></div>
            </div>
            <h2 class="project-head-title lg-text-title"><i>RESEARCH</i></h2>
            <h2 class="project-head-title sm-text-title">That makes us</h2>
            <h2 class="project-head-title lg-text-title"><i>Awe</i></h2>
        </div>
        
        <div class="filter-launch"><i class="fa-solid fa-ellipsis"></i></div>          
       <div class="filter-box-control">
           <div class="filter-box signifier">
               <li data-filter="All">All</li>
               <li data-filter="1">Study</li>
               <li data-filter="2">Research</li>
               <li data-filter="3">Experimental</li>
               <li data-filter="4">Technologial</li>
               
           </div>
       </div>

        <div class="snap-perspective">
        <div class="snap-parent-anim">
            
        {ideas.map((idea, index) => (
                            <div className="snap-section filter-main-box active" key={index} data-filter="">
                                <div className="scale-up-idea">
                                    <div className="ideas-item">
                                        <div className="ideas-img-section">
                                            <div className="ideas-cover"></div>
                                            <Link href={`/ideas/${idea.url_slug}`} >
                                            <Image
                                                height={500}
                                                width={800}
                                                className="ideas-thumbnail"
                                                src={process.env.NEXT_PUBLIC_SITE_URL + idea.image}
                                                alt={idea.title}
                                            />
                                            </Link>
                                        </div>
                                        <h5 className="title-tohide">{idea.description}</h5>
                                        <h2 className="title-tohide">{idea.title}</h2>
                                    </div>
                                </div>
                            </div>
        ))}
            
        </div>
        </div>


        </>
    )

}