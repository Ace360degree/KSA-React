'use client';
import { useEffect,useState } from "react";
import LightTheme from "../components/body/lightTheme";
import NavbarIntroPage from "../components/NavbarIntroPage";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import Link from "next/link";
import Image from "next/image";
import {motion , AnimatePresence} from 'framer-motion';
import { useRouter } from "next/navigation";
import { useVisitedIdeasStore } from "../states/store/ideasStore";
import dynamic from "next/dynamic";
import $ from "jquery";
import "jquery-scrollify";


const ScrollifyDisabled = dynamic(() => import('../components/commons/disableScrollify'), {
    ssr: false,
  })

  gsap.registerPlugin(ScrollTrigger,ScrollToPlugin )

export default function IdeasComponent(){

    
    const {visited,setIdeasVisited } = useVisitedIdeasStore();
    console.log(visited);

    const router = useRouter();
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const [ideas, setIdeas] = useState([]);
    const [categories,setCategories] = useState([]);
    const [filteredIdeas, setFilteredIdeas] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');


        // Fetch ideas from API
        useEffect(() => {
            const fetchIdeasAPI = async () => {
                try {
                    const response = await fetch('/api/get-ideas', { method: 'GET' });
                    if (!response.ok) throw new Error('Failed to fetch ideas');
                    const data = await response.json();
                    setIdeas(data.ideas);
                    setCategories(data.categories);
                    setFilteredIdeas(data.ideas);
                    //setIsLoaded(true); // Mark content as loaded
                } catch (error) {
                    console.error(error.message);
                }
            };
    
            fetchIdeasAPI();
        }, []);
    
    useEffect(()=>{
        
        if(!visited){
        document.querySelector('body').classList.add('loading')
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
            document.querySelector('body').classList.remove('loading');
        },2000)
        
    }, 5000);
    }
    },[]);

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
    
    let panels = gsap.utils.toArray(".snap-section")
    
    panels.map((panel, i) => {
        let imgPanel = panel.querySelector('.ideas-cover');
        
        let imganelTimeline = gsap.timeline();
        imganelTimeline.to(imgPanel, { height: "0", delay: 0, duration: 0.5 })
        
        return ScrollTrigger.create({
            trigger: panel,
            start: "top bottom",
            animation: imganelTimeline,
            // scrub: true,
            onEnter:() => imganelTimeline.play(),
            onLeave: () => imganelTimeline.reverse(),    // Reverse animation on leave
            onEnterBack: () => imganelTimeline.play(),   // Play again on enter back
            onLeaveBack: () => imganelTimeline.reverse()
        });
    });

    });

        return () => {
            ctx.revert();
        } 

    },[filteredIdeas]);


    useEffect(()=>{
            setTimeout(function(){
                
                if(!visited){
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
                    });
                },5000)
                }
        
            },5500);    
            
    },[filteredIdeas]);


        
    const handleImageClick = async (slug,id,image) => {
        router.push(`/ideas/${slug}?id=${id}&image=${image}`);
    };


    useEffect(()=>{
        setTimeout(function(){
            setIdeasVisited();
            console.log(visited);
            ScrollTrigger.normalizeScroll(false);
        },20000);
    },[])


    useEffect(() => {
        $(document).ready(function () {
            // Initialize Scrollify
            $.scrollify.enable();
            $.scrollify({
                section: ".snap-section",
                sectionName: "snap-section",
                interstitialSection: "",
                easing: "easeOutExpo",
                scrollSpeed: isTouchDevice?100:1000,
                offset: 0,
                scrollbars: true,
                standardScrollElements: "",
                setHeights: true,
                overflowScroll: true,
                updateHash: false,
                touchScroll: true,
            });
            $.scrollify.move(0);
            // Refresh ScrollTrigger after Scrollify initializes
            ScrollTrigger.refresh();
        });

        return () => $.scrollify.disable(); // Cleanup Scrollify when component unmounts
    }, [filteredIdeas]);

    useEffect(() => {
  
        if (!isTouchDevice) {
          // Apply ScrollTrigger normalization only on non-touch devices (like desktops)
          ScrollTrigger.normalizeScroll(true);
        }
      
        return () => {
          if (!isTouchDevice) {
            ScrollTrigger.normalizeScroll(false);
          }
        };
      }, [filteredIdeas]);


    

    const handleFilter = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredIdeas(ideas); // Show all ideas
        } else {
            const filtered = ideas.filter(idea => idea.category === category);
            setFilteredIdeas(filtered); // Show filtered ideas based on category
        }
    };


    




    return(
        <>  
            {/* <ScrollifyDisabled/> */}
            <LightTheme/>
            <NavbarIntroPage heading={'Research'}/>
        {visited? '':    
        <div class="project-heads">
            <div class="head-anim-control">
                <div class="head-anim"></div>
            </div>
            <h2 class="project-head-title lg-text-title"><i>RESEARCH</i></h2>
            <h2 class="project-head-title sm-text-title">That makes us</h2>
            <h2 class="project-head-title lg-text-title"><i>Awe</i></h2>
        </div>
        } 
        
        <div class="filter-launch"><i class="fa-solid fa-ellipsis"></i></div>          
       <div class="filter-box-control">
           <div class="filter-box signifier">
               <li data-filter="All" 
               className={selectedCategory === 'All' ? 'selected' : ''}
               onClick={() => handleFilter('All')}
               >All</li>

               {categories.map((cat,index)=>(
               <li key={index} data-filter={cat.id}
               className={selectedCategory === cat.id ? 'selected' : ''}
               onClick={() => handleFilter(cat.id)}
               >{cat.category}</li>
                ))}
               
               
           </div>
       </div>

        <div className="snap-perspective">
        <div className={visited? "snap-parent-ideas":"snap-parent-anim"}>
            
        {filteredIdeas.map((idea, index) => (
                            <div className="snap-section filter-main-box active" key={index} data-filter={idea.id}>
                                <div className={visited? 'scale-up-idea visited' :'scale-up-idea'}>
                                    <div className="ideas-item">
                                        <div className="ideas-img-section">
                                            <div className="ideas-cover"></div>
                                            {/* <Link href={`/ideas/${idea.url_slug}`} > */}
                                            <img
                                                className={`ideas-thumbnail ideas-img-${idea.url_slug}`}
                                                src={process.env.NEXT_PUBLIC_SITE_URL+idea.image}
                                                alt={idea.title}
                                                onClick={() => handleImageClick(idea.url_slug,idea.id,idea.image)}
                                            />
                                            {/* </Link> */}
                                        </div>
                                        <h2 className="title-tohide signifier">{idea.title}</h2>
                                        <h5 className="title-tohide signifier">{idea.description}</h5>
                                    </div>
                                </div>
                            </div>
        ))}
            
        </div>
        </div>
        </>
    )

}