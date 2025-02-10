'use client';
import { useEffect,useRef,useState } from "react";
import LightTheme from "../components/body/lightTheme";
import NavbarIntroPage from "../components/NavbarIntroPage";
// import gsap from "gsap";
import gsap from "gsap/all";
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import Link from "next/link";
import Image from "next/image";
import {motion , AnimatePresence} from 'framer-motion';
import { BsThreeDots } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { useVisitedIdeasStore } from "../states/store/ideasStore";
import dynamic from "next/dynamic";
import $ from "jquery";
import "jquery-scrollify";
import CommonLoader from "../components/commons/loaderCommon";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setIdeaId, setImage, setSelected } from "../redux/slices/ideasSlices";


  gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

export default function IdeasComponent(){

    const {ideaid,selected,category} = useSelector((state)=>state.ideas);
    const dispatch = useDispatch();
    const {visited,setIdeasVisited } = useVisitedIdeasStore();

    const ideasRefs = useRef([]);
    const [initIdeaScroll,setInitIdeaScroll] = useState(true);
    const [initCatagoryScroll,setInitCategoryScroll] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const ideasSearchId = ideaid??null;
    const ideasCategoryId = category?? null;
    const filterSelected = selected?? null;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const [initScroll,setInitScroll]=useState(false);
    const [ideas, setIdeas] = useState([]);
    const [categories,setCategories] = useState([]);
    const [filteredIdeas, setFilteredIdeas] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [mobileFilter,setMobileFilter] =useState(false);
    const [loading,setLoading] = useState(true);

    const IdeasCovers = useRef([]);
    const IdeasSnapSection = useRef([]);

    console.log('selected:',selected);
    console.log('category:',category);
    console.log('Indea Id:',ideaid);

    const toggleMobileFilter = () =>{
        setMobileFilter(!mobileFilter);
      }


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
                    setLoading(false);
                    if(ideasSearchId){
                        const allData = data.ideas;
                        setFilteredIdeas(allData);            
                    }
                    //setIsLoaded(true); // Mark content as loaded
                } catch (error) {
                    console.error(error.message);
                }
            };

    
            fetchIdeasAPI();
        }, []);
    
    // useEffect(()=>{
        
    //     if(!visited){
    //     document.querySelector('body').classList.add('loading')
    //     let projectHeadTitles = document.querySelectorAll('.project-head-title');
        
    //     projectHeadTitles.forEach(function(title,index){
            
    //         let projectHeadTl = gsap.timeline({ delay: index * 1.1 });
            
    //         projectHeadTl.fromTo(title,
    //             {rotateX:"-90",opacity:1},
    //             {rotateX:"0", delay:0.4,duration:0.4,}
    //             );
                
    //         projectHeadTl.to(title,{height:"auto",y:"0", delay:0.3,duration:0.4}) 
    //     });
        
    
    // setTimeout(function(){
    //      projectHeadTitles.forEach(function(title,index){
    //          gsap.to(title,{
    //              opacity:0,
    //              duration:0.6,
    //          });
    //      });
    // },4000)    
    
    
    // let headAnim = document.querySelector('.head-anim');
    // // let headAnimTl= gsap.timeline();
    //     setTimeout(function() {
        
    //     gsap.fromTo(headAnim,{
    //         background:'conic-gradient(from 0deg, transparent 0%, black 0% )',
    //     },{
    //         background:'conic-gradient(from 0deg, transparent 100% , black 100% )',
    //         duration:1.5,
    //         ease: "power3.inOut",
    //         delay:0, 
    //     });
        
        
    //     setTimeout(function(){
    //         document.querySelector('.project-heads').style.display='none';
    //         document.querySelector('body').classList.remove('loading');
    //     },2000)
        
    // }, 5000);
    // }
    // },[]);

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
        

        IdeasCovers.current.forEach((cover, i) => {
            const imgPanel = IdeasSnapSection.current[i];
            const imgPanelTimeline = gsap.timeline({ paused: true });

            imgPanelTimeline.to(cover, { height: "0", delay: 0, duration: 0.5 });

            ScrollTrigger.create({
                trigger: imgPanel,
                start: "top bottom",
                animation: imgPanelTimeline,
                onEnter: () => imgPanelTimeline.play(),
                onLeave: () => imgPanelTimeline.reverse(),
                onEnterBack: () => imgPanelTimeline.play(),
                onLeaveBack: () => imgPanelTimeline.reverse(),
            });
        });
    

        
    });

        return () => {
            ctx.revert();
        } 

    },[filteredIdeas]);


    // Ideas Cover Layout 
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


        


    useEffect(()=>{
        setTimeout(function(){
            console.log(visited);
            ScrollTrigger.normalizeScroll(false);
        },20000);
    },[]);


    useEffect(() => {

        $(document).ready(function () {
            // Initialize Scrollify
            $.scrollify.enable();
            $.scrollify({
                section: ".snap-section",
                sectionName: "snap-section",
                interstitialSection: "",
                easing: "easeOutExpo",
                scrollSpeed: isTouchDevice ? 100 : 1000,
                offset: 0,
                scrollbars: true,
                standardScrollElements: "",
                setHeights: true,
                overflowScroll: true,
                updateHash: false,
                touchScroll: true,
            });
            
            if(initCatagoryScroll && initIdeaScroll && ideasSearchId && ideasCategoryId){
                const targetIdea = ideasRefs.current[ideasSearchId];
                        $.scrollify.disable();
                        gsap.to(window, {
                            scrollTo: { y: targetIdea, offsetY: 0 },
                            duration: 0,
                            ease: "power3.inOut",
                            onComplete: () => {
                                $.scrollify.enable();
                            }
                });
            }
            else{
                console.log('status State:','Default Scroll behaviour');
                $.scrollify.disable();
                // gsap.to(window, {
                //     scrollTo: { y: 0, offsetY: 0 }, 
                //     duration: 0.5, 
                //     ease: "power3.inOut", 
                //     onComplete:()=>{
                        $.scrollify.enable();
                        $.scrollify.instantMove(0);
                    // }
                // }); 
            }
    
            ScrollTrigger.refresh();
        });
    
        // Cleanup Scrollify on component unmount
        return () => $.scrollify.disable();
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


    useEffect(()=>{        
        handleFilter(category);
    },[ideas]);
    

    const handleFilter = (category) => {
        
        setSelectedCategory(category);
        setMobileFilter(false);
        if (category === 'All') {
            setFilteredIdeas(ideas); 
        } else {
            const filtered = ideas.filter(idea => idea.category === category);
            setFilteredIdeas(filtered); 
        }
    };

    
    const changeFilter = (category) => {
        setInitIdeaScroll(false);
        setInitCategoryScroll(false);
        handleFilter(category);
        dispatch(setSelected(category));
    }

    const redirectToInnerPage = (url,id,category,image)=>{
        if(
        dispatch(setIdeaId(id)),
        dispatch(setCategory(category)),
        dispatch(setImage(image))
        ){
            router.push(`/ideas/${url}`);
        }
    }


      


    return(
        <>  
            {/* <ScrollifyDisabled/> */}
            <LightTheme/>
            <NavbarIntroPage heading={'Research'} active={true} lgheight={true}/>
   
        


        {filteredIdeas!=''?
        <>
        <div class="filter-launch" onClick={toggleMobileFilter}>
            {mobileFilter?<IoCloseOutline />:<BsThreeDots />}
        </div>          
        <div className={mobileFilter?'filter-box-control active':'filter-box-control'}>
           <div class="filter-box signifier">
               <li data-filter="All" 
               className={selectedCategory === 'All' ? 'selected' : ''}
               onClick={() => changeFilter('All')}
               >All</li>

               {categories.map((cat,index)=>(
               <li key={index} data-filter={cat.id}
               className={selectedCategory === cat.id ? 'selected' : ''}
               onClick={() =>{ changeFilter(cat.id)}}
               >{cat.category}</li>
                ))}
               
               
           </div>
       </div>
       </>
       :''}

        {loading && visited? <CommonLoader/>:<>
        <div className="snap-perspective">
        <div className={visited? "snap-parent-ideas":"snap-parent-anim"}>
            
        {filteredIdeas.map((idea, index) => (
                            <div className="snap-section filter-main-box active"  ref={(el)=>{IdeasSnapSection.current[index]=el;ideasRefs.current[idea.id] = el}} key={index} data-filter={idea.id}>
                                <div className={visited? 'scale-up-idea visited' :'scale-up-idea'}>
                                    <div className="ideas-item">
                                        <div className="ideas-img-section">
                                            <div className="ideas-cover" ref={(el)=>{IdeasCovers.current[index]=el}}></div>
                                            {/* <Link href={`/ideas/${idea.url_slug}?id=${idea.id}&selected=${selectedCategory}&image=${idea.image}`}> */}
                                                <div onClick={()=>redirectToInnerPage(idea.url_slug,idea.id,selectedCategory,idea.image)}>
                                                <img
                                                className={`ideas-thumbnail ideas-img-${idea.url_slug}`}
                                                src={process.env.NEXT_PUBLIC_SITE_URL+idea.image}
                                                alt={idea.title}                                            />
                                                </div>
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
        </> }
        </>
    )

}