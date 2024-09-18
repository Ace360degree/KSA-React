'use client'
import Link from "next/link";
import DarkTheme from "../components/body/darkTheme";
import NavbarIntroPage from "../components/NavbarIntroPage";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import $ from "jquery";
import  "jquery-scrollify";
import ScrollifyDisabled from "../components/commons/disableScrollify";



gsap.registerPlugin(ScrollTrigger);

export default function AboutComponent(){

    
    gsap.defaults({inherit:false});

    const aboutSection = useRef(null);
    const mainBanner = useRef(null);

    function scrollSmoothTo() {
        if (aboutSection.current) {
            aboutSection.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }



    useEffect(() => {
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
        }, 2000);

        let AboutAnimeTextElem = document.querySelector('.about-anim-text');
        let aboutAnimTitles = AboutAnimeTextElem.getAttribute('data-titles');
        let aboutAnimArray = aboutAnimTitles.split(',');
        let currentIndex = 0;

        // Function to change the text
        function changeText() {
            AboutAnimeTextElem.textContent = aboutAnimArray[currentIndex];
            currentIndex = (currentIndex + 1) % aboutAnimArray.length; // Loop back to the start if reached the end
        }

        // Call the function initially
        changeText();

        // Set interval to change text every 0.5 seconds
        let intervalId = setInterval(changeText, 500);

        // Create a timeline for the animation
        let timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#ksa-slider',
                start: "top 80%",
                end: "top 30%",
                scrub: true,
            }
        });

        let Abouttimeline = gsap.timeline();
        Abouttimeline.fromTo('.about-item', {y: "100%", opacity: 0}, {y: "0", opacity: 1, duration: 1.5, ease: "power3.out", stagger: 0.05});

        function resetTargetSections() {
            document.querySelectorAll('.target-section').forEach(function(obj) {
                obj.classList.remove('active');
            });
        }

        document.querySelectorAll('.filter-trigger').forEach(function(menu) {
            menu.addEventListener('click', function(e) {
                let targetTabs = menu.getAttribute('data-target');
                resetTargetSections();
                document.querySelector(targetTabs).classList.add('active');
                Abouttimeline.restart();
                document.querySelectorAll('.filter-trigger').forEach(function(itemMenu) {
                    itemMenu.classList.remove('active');
                });
                menu.classList.add('active');
                gsap.to(window, {scrollTo: {y: 0, autoKill: false}});
            });
        });

    }, []);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Play Second Animation
            let ksaAbout2TL = gsap.timeline();
            ksaAbout2TL.to('.ab-2-head', {duration: 1, scale: 1})
                .to('.about-para', {duration: 1, opacity: 1, scale: 1.1})
                .to(ksaAbout2TL, {delay: 0.5});

            ScrollTrigger.create({
                scrub: true,
                trigger: '#ksa-about',
                start: "top top",
                end: "+=1000",
                pin: true,
                animation: ksaAbout2TL,
            });
        });

        return () => ctx.revert();
    }, []);


    useEffect(()=>{
        // $.scrollify.destroy();
        $.scrollify.move(0);
    },[])


    return(
        <>
            <ScrollifyDisabled/>
            <DarkTheme/>
            <NavbarIntroPage heading={'ETHIOS'}/>
            {/* <div class="header-gap"></div> */}
        <ul className="top-section-filter">
            <li className="filter-trigger " id="cultureTrigger" data-target="#culture">Culture</li>
            <li className="filter-trigger" id="disciplineTrigger" data-target="#discipline">Discipline</li>
        </ul>
     
        <div className="target-section active overflow-hidden" ref={mainBanner} id="culture">
            
            <div className="full-section px-4" id="about-intro">
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
            <div ref={aboutSection} className="full-section px-4" id="ksa-about">
                <div className=" billy-text">
                    <div className="mx-auto">
                    <h3 className="ab-2-head signifier">KSA has grown from a founder to a big family.</h3>
                    <p className="about-para mx-auto signifier">KSA is a team with plethora of inhouse perspectives where Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper sus</p>
                    </div>
                </div>
            </div>
            <div className="full-section px-4" id="ksa-points">
                <div className="px-4 billy-text">
                    <div className="mx-auto" style={{maxWidth:'100%'}}>
                        <h4 className="avelir-text fs-1"><i>We Are</i></h4>
                        <h3 className="about-anim-text signifier" data-titles="Thinkers & Makers,Scrupulous & Creative,Colaborative & Humane,Innovators & Pragmatic">Pragmatic & Else and Stuff</h3>
                    </div>
                </div>
            </div>
        </div> 
    
        <div className="target-section active overflow-hidden position-relative" id="discipline">
        <div className="full-section" id="ksa-slider">
            <Link href={'/expertise'}><div className=" billy-text">
                <div className="about-project-box">
                    <div className="about-item">
                        <img src="https://media.architecturaldigest.com/photos/5d3f6c8084a5790008e99f37/master/w_1600%2Cc_limit/GettyImages-1143278588.jpg" />
                        <h4>KSA_Planning</h4>
                    </div>
                    <div className="about-item">
                        <img src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJjaGl0ZWN0dXJlfGVufDB8fDB8fHww"/>
                        <h4>KSA_Engineering</h4>
                    </div>
                    <div className="about-item">
                        <img src="https://img.freepik.com/free-photo/low-angle-shot-grey-concrete-building-representing-modern-architecture_181624-4719.jpg"/>
                        <h4>KSA_Architecture</h4>
                    </div>
                    <div className="about-item">
                        <img src="https://images.adsttc.com/media/images/6308/2af8/fa26/793f/ed20/7aab/newsletter/cilada-verde-potenciais-problemas-no-projeto-paisagistico_1.jpg?1661479681"/>
                        <h4>KSA_Landscape</h4>
                    </div>
                    <div className="about-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqftw_F2PUXjlAtrJ_dTTCcXfhEAuTfArsVPV2wFVHQ&s"/>
                        <h4>KSA_Sustainability</h4>
                    </div>
                </div>
            </div></Link>
        </div>
        <div className="hello-about" style={{opacity:'0.5'}}>
            <Link href={'/contact'}>
            <div className="white-stick"><div className="white-stick-content"></div></div>
            <div>Say Hello</div>
            </Link>
        </div>    
        </div>

        </>
    )

}