'use client';

import { useEffect } from "react";
import LightTheme from "../components/body/lightTheme";
import NavbarIntroPage from "../components/NavbarIntroPage";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import Link from "next/link";


export default  function Ideas(){

    gsap.registerPlugin(ScrollTrigger,ScrollToPlugin )
    useEffect(()=>{

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
        
         
         


    },[]);


    useEffect(()=>{

    let ctx = gsap.context(() => {

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

    });
    
    ScrollTrigger.normalizeScroll(true);

    return () => ctx.revert();


    },[])

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


    return(
        <>  
            <LightTheme/>
            <NavbarIntroPage heading={'Research'}/>
        <h1>Ideas page Changes Test</h1>

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
            
            <Link href={'/ideas/item_id'}><div class="snap-section filter-main-box active" data-filter="">
                <div class="scale-up-idea">

                    <div class="ideas-item" data-url="ideas">
                        <div class="ideas-img-section">
                            <div class="ideas-cover"></div>
                            <img class="ideas-thumbnail"  src="https://www.equinoxindia.com/wp-content/uploads/images/commercial-real-estate-projects.jpg" />
                        </div>
                        <h5 class="title-tohide">lorem Ipuism Test</h5>
                        <h2 class="title-tohide">PROJECT TEST</h2>
                    </div>

                </div>
            </div></Link>

            <Link href={'/ideas/item_id'}><div class="snap-section filter-main-box active" data-filter="">
                <div class="scale-up-idea">

                    <div class="ideas-item" data-url="ideas">
                        <div class="ideas-img-section">
                            <div class="ideas-cover"></div>
                            <img class="ideas-thumbnail"  src="https://www.equinoxindia.com/wp-content/uploads/images/commercial-real-estate-projects.jpg" />
                        </div>
                        <h5 class="title-tohide">lorem Ipuism Test</h5>
                        <h2 class="title-tohide">PROJECT TEST</h2>
                    </div>

                </div>
            </div></Link>

            <Link href={'/ideas/item_id'}><div class="snap-section filter-main-box active" data-filter="">
                <div class="scale-up-idea">

                    <div class="ideas-item" data-url="ideas">
                        <div class="ideas-img-section">
                            <div class="ideas-cover"></div>
                            <img class="ideas-thumbnail"  src="https://www.equinoxindia.com/wp-content/uploads/images/commercial-real-estate-projects.jpg" />
                        </div>
                        <h5 class="title-tohide">lorem Ipuism Test</h5>
                        <h2 class="title-tohide">PROJECT TEST</h2>
                    </div>

                </div>
            </div></Link>

            <Link href={'/ideas/item_id'}><div class="snap-section filter-main-box active" data-filter="">
                <div class="scale-up-idea">

                    <div class="ideas-item" data-url="ideas">
                        <div class="ideas-img-section">
                            <div class="ideas-cover"></div>
                            <img class="ideas-thumbnail"  src="https://www.equinoxindia.com/wp-content/uploads/images/commercial-real-estate-projects.jpg" />
                        </div>
                        <h5 class="title-tohide">lorem Ipuism Test</h5>
                        <h2 class="title-tohide">PROJECT TEST</h2>
                    </div>

                </div>
            </div></Link>

            <Link href={'/ideas/item_id'}><div class="snap-section filter-main-box active" data-filter="">
                <div class="scale-up-idea">

                    <div class="ideas-item" data-url="ideas">
                        <div class="ideas-img-section">
                            <div class="ideas-cover"></div>
                            <img class="ideas-thumbnail"  src="https://www.equinoxindia.com/wp-content/uploads/images/commercial-real-estate-projects.jpg" />
                        </div>
                        <h5 class="title-tohide">lorem Ipuism Test</h5>
                        <h2 class="title-tohide">PROJECT TEST</h2>
                    </div>

                </div>
            </div></Link>

            <Link href={'/ideas/item_id'}><div class="snap-section filter-main-box active" data-filter="">
                <div class="scale-up-idea">

                    <div class="ideas-item" data-url="ideas">
                        <div class="ideas-img-section">
                            <div class="ideas-cover"></div>
                            <img class="ideas-thumbnail"  src="https://www.equinoxindia.com/wp-content/uploads/images/commercial-real-estate-projects.jpg" />
                        </div>
                        <h5 class="title-tohide">lorem Ipuism Test</h5>
                        <h2 class="title-tohide">PROJECT TEST</h2>
                    </div>

                </div>
            </div></Link>

            <Link href={'/ideas/item_id'}><div class="snap-section filter-main-box active" data-filter="">
                <div class="scale-up-idea">

                    <div class="ideas-item" data-url="ideas">
                        <div class="ideas-img-section">
                            <div class="ideas-cover"></div>
                            <img class="ideas-thumbnail"  src="https://www.equinoxindia.com/wp-content/uploads/images/commercial-real-estate-projects.jpg" />
                        </div>
                        <h5 class="title-tohide">lorem Ipuism Test</h5>
                        <h2 class="title-tohide">PROJECT TEST</h2>
                    </div>

                </div>
            </div></Link>
            
            <Link href={'/ideas/item_id'}><div class="snap-section filter-main-box active" data-filter="">
                <div class="scale-up-idea">

                    <div class="ideas-item" data-url="ideas">
                        <div class="ideas-img-section">
                            <div class="ideas-cover"></div>
                            <img class="ideas-thumbnail"  src="https://www.equinoxindia.com/wp-content/uploads/images/commercial-real-estate-projects.jpg" />
                        </div>
                        <h5 class="title-tohide">lorem Ipuism Test</h5>
                        <h2 class="title-tohide">PROJECT TEST</h2>
                    </div>

                </div>
            </div></Link>
            
            
        </div>
        </div>


        </>
    )

}