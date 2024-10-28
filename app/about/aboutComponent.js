'use client'
import Link from "next/link";
import DarkTheme from "../components/body/darkTheme";
import NavbarIntroPage from "../components/NavbarIntroPage";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { BsThreeDots } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import $ from "jquery";
import  "jquery-scrollify";
import ScrollifyDisabled from "../components/commons/disableScrollify";



gsap.registerPlugin(ScrollTrigger);

export default function AboutComponent(){

    const [showTabs,setShowTabs] = useState('All');
    const [mobileFilter,setMobileFilter] =useState(false);

    const [activeCulture,setActiveCulture] = useState(true);
    const [activeDiscipline,setActiveDiscipline] = useState(false);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const AboutProjects = useRef(null);
    
    gsap.defaults({inherit:false});

    const aboutSection = useRef(null);
    const aboutSection2 = useRef(null);
    const mainBanner = useRef(null);

    const toggleMobileFilter = () =>{
        setMobileFilter(!mobileFilter);
    }




    function scrollSmoothTo() {
        if (aboutSection.current) {
            aboutSection.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }

    // useEffect(() => {
  
    //     if (!isTouchDevice) {
    //       // Apply ScrollTrigger normalization only on non-touch devices (like desktops)
    //       ScrollTrigger.normalizeScroll(true);
    //     }
      
    //     return () => {
    //       if (!isTouchDevice) {
    //         ScrollTrigger.normalizeScroll(false);
    //       }
    //     };
    //   }, []);

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])

    useEffect(() => {

        document.querySelector('body').classList.add('loading');

        if(mainBanner.current){
        let animationPageTitleSpans = document.querySelectorAll('.page-title-animation span');

        animationPageTitleSpans.forEach(function(title, index) {
            let pageTitleAnimation = gsap.timeline({ delay: index * 0.6 });

            pageTitleAnimation.fromTo(title, {rotateX: "-90", opacity: 1}, {rotateX: "0", delay: 0.4, duration: 0.4});
            pageTitleAnimation.to(title, {height: "auto", y: "0", delay: 0.3, duration: 0.4});
        });

        gsap.fromTo('.about-intro-sub', {y: 100, opacity: 0}, {y: 0, opacity: 1, delay: 2.5, duration: 0.6});

        document.querySelectorAll('.about-anim-banner').forEach(function(title, index) {
            let AboutBannerTl = gsap.timeline({delay: index * 1});
            AboutBannerTl.fromTo(title, {rotateX: "-90", y: "40px"}, {rotateX: 0, y: "40px", duration: 0.4});
            AboutBannerTl.to(title, {y: 0, delay: 0.2, duration: 0.3});
        });

        setTimeout(() => {
            document.querySelector('.scrollbanner').classList.add('active');
            document.querySelector('body').classList.remove('loading');
        }, 2000);

        let AboutAnimeTextElem = document.querySelector('.about-anim-text');
        let aboutAnimTitles = AboutAnimeTextElem.getAttribute('data-titles');
        let aboutAnimArray = aboutAnimTitles.split(',');
        let currentIndex = 0;

        // Function to change the text
        function changeText() {
            // Split the current title into words
            const words = aboutAnimArray[currentIndex].trim().split(' ');
            
            // Wrap each word in a <span> and join them back with spaces
            AboutAnimeTextElem.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
        
            currentIndex = (currentIndex + 1) % aboutAnimArray.length; // Loop back to the start if reached the end
        }

        // Call the function initially
        changeText();

        // Set interval to change text every 0.5 seconds
        const IntervalId = setInterval(changeText, 500);
    
        return () => clearInterval(IntervalId);

        }
        // Create a timeline for the animation
        // let timeline = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: '#ksa-slider',
        //         start: "top 80%",
        //         end: "top 30%",
        //         scrub: true,
        //     }
        // });
        
         // Clean up on unmount

    }, [showTabs]);


    


    useEffect(() => {
        let ctx = gsap.context(() => {

            document.querySelectorAll('.about-pinned-anim').forEach((pinned,index)=>{
                let ab2head = pinned.querySelector('.ab-2-head');
                let abPara = pinned.querySelector('.about-para');

                // Play Second Animation
                let ksaAbout2TL = gsap.timeline();
                ksaAbout2TL.to(ab2head, {duration: 1, opacity:1, scale: 1})
                    .to(abPara, {duration: 1, opacity: 1, scale: 1.1})
                    .to(ksaAbout2TL, {delay: 0.5});

                ScrollTrigger.create({
                    scrub: true,
                    trigger: pinned,
                    start: "top top",
                    end: "+=900",
                    pin: true,
                    animation: ksaAbout2TL,
               
                });

            })

            
        });

        return () => ctx.revert();
    }, [showTabs]);

    // useEffect(() => {
    //     let ctx = gsap.context(() => {
    //         document.querySelectorAll('.about-pinned-anim').forEach((pinned, index) => {
    //             let ab2head = pinned.querySelector('.ab-2-head');
    //             let abPara = pinned.querySelector('.about-para');
    
    //             // Create the timeline with ScrollTrigger
    //             let ksaAbout2TL = gsap.timeline({
    //                 scrollTrigger: {
    //                     trigger: pinned,
    //                     start: "top 50%",
    //                     //end: "+=1000s", // Adjust this value as needed
    //                     //scrub: true, // Sync with scroll position
    //                     onEnter:() => ksaAbout2TL.play(),
    //                     onLeave: () => ksaAbout2TL.reverse(),    // Reverse animation on leave
    //                     onEnterBack: () => ksaAbout2TL.play(),   // Play again on enter back
    //                     onLeaveBack: () => ksaAbout2TL.reverse() // Reverse again on leave back
    //                     // pin: true, // Uncomment if you want to pin
    //                 }
    //             });
    
    //             ksaAbout2TL
    //                 .to(ab2head, { duration: 1, scale: 1 })
    //                 .to(abPara, { duration: 0.5, opacity: 1, scale: 1 });
    //         });
    //     });
    
    //     return () => ctx.revert();
    // }, [showTabs]);


    // useEffect(() => {
    //     $(document).ready(function () {
    //       // Initialize Scrollify
    //       $.scrollify.enable();
    //       $.scrollify({
    //         section: ".about-snap",
    //         sectionName: "about-snap",
    //         interstitialSection: "",
    //         easing: "easeOutExpo",
    //         scrollSpeed: isTouchDevice?100:1500,
    //         offset: 0,
    //         scrollbars: true,
    //         standardScrollElements: "",
    //         setHeights: true,
    //         overflowScroll: true,
    //         updateHash: false,
    //         touchScroll: true,
    //       });

    //       $.scrollify.move(0);
      
    //       // Refresh ScrollTrigger after Scrollify initializes
    //       ScrollTrigger.refresh();
    //     });
      
    //     return () => $.scrollify.disable(); // Cleanup Scrollify when component unmounts
    //   }, []);



    useEffect(() => {
        if (AboutProjects.current) {

            let Abouttimeline = gsap.timeline();
            Abouttimeline.fromTo('.about-item', {y: "50", opacity: 0}, {y: "0", opacity: 1, duration: 1, ease: "power3.out", stagger: 0.05});
            
            // Function to activate the Discipline tab
            const initActiveNow = () => {
                setActiveCulture(false);
                setActiveDiscipline(true);
                Abouttimeline.play();
            };
    
            // Function to deactivate the Discipline tab
            const removeActiveNow = () => {
                setActiveCulture(true);
                setActiveDiscipline(false);
                Abouttimeline.play();
            };
    
            // Create a ScrollTrigger instance
            const scrollTriggerInstance = ScrollTrigger.create({
                trigger: '#discipline',
                start: 'top 50%',
                end: 'bottom 0%',
                onEnter: initActiveNow,
                onEnterBack: initActiveNow,
                onLeave: removeActiveNow,
                onLeaveBack: removeActiveNow,
            });
    
            // Cleanup function to remove ScrollTrigger when component unmounts or dependencies change
            return () => {
                scrollTriggerInstance.kill();
            };
        }
    }, [activeCulture, activeDiscipline, showTabs]);
    




    const updateSections = (name)=>{
        setShowTabs(name);
        setMobileFilter(false);
        if(name=='culture'){
            setActiveDiscipline(false);
        }
    }


    return(
        <>
            <ScrollifyDisabled/>
            <DarkTheme/>
            <NavbarIntroPage heading={'CULTURE'}/>
            {/* <div class="header-gap"></div> */}
            <div class="filter-launch" onClick={toggleMobileFilter}>
                {mobileFilter?<IoCloseOutline />:<BsThreeDots />}
            </div>    
        <ul className={mobileFilter?'top-section-filter active':'top-section-filter'}>
            <li className={showTabs=='culture' || activeCulture ?'filter-trigger active':'filter-trigger'} style={{fontFamily:'Signifier'}} id="cultureTrigger" onClick={()=>{updateSections('culture')}} data-target="#culture">Culture</li>
            <li className={showTabs=='discipline' || activeDiscipline ?'filter-trigger active':'filter-trigger'} style={{fontFamily:'Signifier'}} id="disciplineTrigger" onClick={()=>{updateSections('discipline')}} data-target="#discipline">Discipline</li>
        </ul>
        
        {showTabs=='All' || showTabs=='culture'?
        <div className="target-section signifier" ref={mainBanner} id="culture">
            
            <div className="full-section px-4 about-snap" id="about-intro">
                <div className=" text-uppercase">
                    <h2 className="page-title-animation signifier"><span>Know</span> <span>Our</span> <span>Culture</span></h2>
                    <h4 className="about-intro-sub fw-light mb-0">Be Certain to Buzz us!!</h4>
                </div>
                
                <div>
                    <a onClick={scrollSmoothTo}><div className="scroll-downlink">
                        
                    </div></a>
                    <div className="scrollbanner">
                        <div className="scrollbanner-box"></div>
                    </div>
                </div>

            </div>

            <div className="about-snap">
            <div ref={aboutSection} className="full-section about-pinned-anim px-4 overflow-hidden" >
                <div className=" billy-text">
                    <div className="mx-auto ab-width">
                    <h3 className="ab-2-head signifier">KSA aims to transform every aspect of human life.</h3>
                    <p className="about-para mx-auto signifier">KSA has grown from a founder to a big family. 
                        A dynamic and evolving practice that responds to the shifting and advancing social, cultural, political economic and technological conditions of modern life. 
                        Interdisciplinary Research and Design practice with projects of various scales ranging from Architecture, Landscape, Urban Design and Planning, Design Management and Interiors.</p>
                    </div>
                </div>
            </div>
            </div>

            <div className="about-snap">
            <div ref={aboutSection2} className="full-section about-pinned-anim px-4 overflow-hidden">
                <div className=" billy-text">
                    <div className="mx-auto ab-width">
                    <h3 className="ab-2-head ab-2-head-sm signifier">KSA’s pedagogies focuses on creation of intelligent forms while inventing new possibilities for future use.</h3>
                    <p className="about-para mx-auto signifier">KSA emphasize on design performance: An amalgamation of program, organization, analysis,
                        innovation and form calibrated to each client’s aspirations and each project’s constraints.
                        KSA is a diverse team dedicated to creating environments where individuals can thrive, not
                        just survive. Resulting in healthier spaces, buildings and cities that improve the quality of life to
                        whatever the future may bring.</p>
                    </div>
                </div>
            </div>
            </div>

            <div className="full-section overflow-x-hidden px-4 about-snap" id="ksa-points">
                <div className="px-4 billy-text">
                    <div className="mx-auto" style={{maxWidth:'100%'}}>
                        <h4 className="signifier fw-light fs-2 m-0"><i>We Are,</i></h4>
                        <i><h3 className="about-anim-text signifier" data-titles="Thinkers & Makers,Scrupulous & Creative,Colaborative & Humane,Innovators & Pragmatic"></h3></i>
                    </div>
                </div>
            </div>
        </div> 
        :''}
    
        {showTabs=='All' || showTabs=='discipline'?
        <div className="target-section position-relative about-snap" ref={AboutProjects} id="discipline">
        <div className="full-section " id="ksa-slider">
            <Link href={'/expertise'}><div className=" billy-text">
                <div className="about-project-box">
                    <div className="about-item">
                        <img src="./images/about/KSA_planning.webp" />
                        <h4>KSA_Planning</h4>
                    </div>
                    <div className="about-item">
                        <img src="./images/about/KSA_Engineering.webp"/>
                        <h4>KSA_Engineering</h4>
                    </div>
                    <div className="about-item">
                        <img src="./images/about/KSA_Architecture.webp"/>
                        <h4>KSA_Architecture</h4>
                    </div>
                    <div className="about-item">
                        <img src="./images/about/KSA_Landscape.webp"/>
                        <h4>KSA_Landscape</h4>
                    </div>
                    <div className="about-item">
                        <img src="./images/about/KSA_Sustainability.webp"/>
                        <h4>KSA_Sustainability</h4>
                    </div>
                </div>
            </div></Link>
            <div className="hello-about" style={{opacity:'0.5'}}>
            <Link href={'/contact'}>
            <div className="signifier">Say Hello!</div>
            <div className="white-stick mb-2"><div className="white-stick-content"></div></div>
            </Link>
        </div>  
        </div>
          
        </div>
        :''}

        </>
    )

}