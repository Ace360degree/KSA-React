'use client';
import HomeMenu from "../homeMenu/homeMenu";
import NavbarIntroPage from "../NavbarIntroPage";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import $ from 'jquery';
import 'jquery-scrollify';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from "gsap/ScrollToPlugin";


export default function HomeComponent(){

    gsap.registerPlugin(ScrollTrigger);
  const secondTitleSection = useRef(null);
  
    function scrollSmoothTo() {
      if (secondTitleSection.current) {
        secondTitleSection.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
    
    let windowHeight = window.screen.height;
    let windowWidth = window.screen.width;

  useEffect(()=>{
    
    gsap.to(window, {
        scrollTo: {y: 0, autoKill: false},
    });

    gsap.ticker.lagSmoothing(false);
    
    document.getElementById('clock').classList.remove('d-none');

// Function for Each Section has been Delared
    const navbar = document.getElementById('navbar');
    const LogoClock = document.getElementById('clock');
    const clockAnimationBox = document.getElementById('clockSection');
    const TitleCard = document.getElementById('home-title');
    const mainContent = document.getElementById('mainContent');
    const mainBody = document.querySelector('body');
    const ProjectSlider = document.querySelector('.home-project-slider');
    const projectGridViewer = document.querySelector('.home-grid-viewer');
    
    const secondTitleBox = document.getElementById('second-title');
    const secondTitleTexts = secondTitleBox.querySelectorAll('.intro-title-text');
    
    const homeSLidesItem = document.querySelectorAll('.home-slider-item');


    navbar.classList.remove('active');
    document.querySelector('body').classList.add('loading');
    document.querySelector('body').classList.remove('dark');
    
    homeSLidesItem.forEach(function(item,index){
        item.style.zIndex = 2 +index;
    });
    
    function showNavbar(){
        navbar.classList.add('active');
    }
    
    function hideLogoClock(){
        LogoClock.classList.add('hide');
    }
   
    
    function showTitleAnimation(){
        TitleCard.classList.add('active');
        
        gsap.fromTo('.home-title-grad',{
            background:'conic-gradient(from 45deg, black 0%, transparent 0%)',
        },{
            background:'conic-gradient(from 45deg, black 100%, transparent 100%)',
            duration:2.5,
            ease: "power3.inOut",
            delay:0,
        });
        
        
        
                setTimeout(function(){
                     document.querySelector('body').classList.add('dark');
                     document.querySelector('body').classList.remove('loading');
                    
                            
                    document.querySelectorAll('.intro-txbx').forEach(function(intro, index) {
                    // Create a GSAP timeline for each intro element
                    const tl = gsap.timeline({ delay: index * 1 });
        
                    // First animation: Rotate
                    tl.fromTo(intro, 
                        { 
                            transform: 'translateY(40px) rotateX(-90deg)', 
                            height: 0,
                            opacity: 1
                        }, 
                        { 
                            transform: 'translateY(0) rotateX(0deg)', 
                            opacity: 1,
                            delay:0.2,
                            duration: 0.5, // Duration for the rotation
                        }
                    );
        
                    // Second animation: Move upwards
                    tl.to(intro, 
                        { 
                            transform: 'translateY(0) rotateX(0deg)', 
                            height: "auto", 
                            duration: 0.3, // Duration for the upward movement
                        },
                        0.7 // Start the second animation after 0.5 seconds delay
                    );
                });
                
                
                
              
                
                
                setTimeout(function(){
                    document.querySelector('.expnad-imgn-txt').classList.add('active');
                    // document.querySelector('body').classList.add('dark');
                    
                    setTimeout(function(){
                        document.getElementById('navbar').classList.add('active');
                        document.querySelector('.scrollbanner').classList.add('active');
                    },1500);
                    
                
                },1500);
                document.querySelector('body').classList.remove('loading');    
                    
                },3000);

    }
    
    // showTitleAnimation();

      
                // hide Scoll Indicator on Scroll
                
                gsap.fromTo('.scrollbanner.active',{opacity:1},{
                    opacity:0,
                    duration:0.4,
                    ease: "power4.inOut",
                    scrollTrigger:{
                        trigger:'#second-title',
                        scrub:true,
                        start:"top bottom",
                        end:"bottom bottom",
                    }
                });
                
    
    

    function hideTitleAnimation(){
        
        TitleTexts.forEach(function(title,index){
                setTimeout(function(){
                    title.classList.add('dismiss');
                },150*index);
            });
        
        setTimeout(function(){
            TitleCard.classList.remove('active');
        },4000)
        
    }
    
    function showSecondTitleAnimation(){
        secondTitleBox.classList.add('active');
            
            // secondTitleTexts.forEach(function(title,index){
            //     setTimeout(function(){
            //         title.classList.add('active');
            //     },index *800);
            // });
    }
    
    function hideSecondTitleAnimation(){
        
        secondTitleTexts.forEach(function(title,index){
                setTimeout(function(){
                    title.classList.add('dismiss');
                },150*index);
            });
        
        setTimeout(function(){
            secondTitleBox.classList.remove('active');
        },4000)
        
    }
    
    
    function showMainContent(){
        mainContent.classList.add('active');
    }
    
    function showProjectSlider(){
        ProjectSlider.classList.add('active');
    }
    function hideProjectSlider(){
        ProjectSlider.classList.remove('active');
    }
    
    
    function viewerScaleUp(){
        projectGridViewer.classList.remove('tiny');
        
        let SliderTextsBox = document.querySelector('.slider-texts');
        SliderTextsBox.classList.add('active');
    }
    

    document.querySelectorAll('.hero-sub').forEach(function(heroSub){
        gsap.fromTo(heroSub, {
            opacity:0,
            y:"80px"
        },{
            opacity:1,
            y:"0",
            scrollTrigger:{
                trigger:'#mainContent',
                scrub:true,
                start:"top 20%",
                end:"top 70%",
            }
        });
    })
    
    document.querySelectorAll('.hero-title').forEach(function(heroSub){
        gsap.fromTo(heroSub, {
            opacity:0,
            y:"120px",
        },{
            opacity:1,
            y:0,
            scrollTrigger:{
                trigger:'#mainContent',
                scrub:true,
                start:"top 30%",
                end:"top 80%",
            }
        });
    })
    
        gsap.fromTo('.user-clock', {
            opacity:0,
        },{
            opacity:1,
            scrollTrigger:{
                trigger:'#mainContent',
                scrub:true,
                start:"top 30%",
                end:"top 80%",
                // onEnter:showClock,
            }
        });
    
    
   
   

    let titleTime = 7000;
    setTimeout(function(){
        // After Animation Add Dark Color to Body
        // mainBody.classList.add('dark');
        
        
        setTimeout(function(){
            // With some delay Show Title (BIL)
            showTitleAnimation()
            return;
            setTimeout(function(){
               
                // hide the Animated Logo                   
                hideLogoClock();
        
            },1500)
            
        },100);
        
    },titleTime);
    
  },[])



  useEffect(()=>{
    let totalDurationSecondTitle = '+='+windowHeight*3;
    let ScrollToggleActions = 'play none none reverse';
    
    let quoteTextFontSize;
    let theySayFontSize;
    if (window.innerWidth >= 992) {
        quoteTextFontSize = '3.8vw';
        theySayFontSize = '5vw';
    }
    if (window.innerWidth <= 992) {
        quoteTextFontSize = '7vw';
        theySayFontSize = '10vw';
    }

function showScrollableTitles(){
        
        gsap.to('#they-say',{
            y:0,
            opacity:1,
            duration:1,
            ease: "power1.out",
            scrollTrigger:{
                trigger:'#second-title',
                start:'top 50%',
                toggleActions:ScrollToggleActions ,
                end:totalDurationSecondTitle,
            }
        })
        
        gsap.to('#they-say',{
            fontSize:theySayFontSize,
            ease: "power1.out",
            duration:1,
            scrollTrigger:{
                trigger:'#second-title',
                start:'top top',
                toggleActions: ScrollToggleActions,
                end:totalDurationSecondTitle,
            }
        })
        
        gsap.to('#quote-texts',{
            y:0,
            ease: "power1.out",
            opacity:1,
            duration:1,
            scrollTrigger:{
                trigger:'#quote-texts',
                start:'top top',
                toggleActions: ScrollToggleActions,
                end:totalDurationSecondTitle,
            }
        })
        gsap.to('#quote-texts',{
            fontSize:quoteTextFontSize,
            ease: "power1.out",
            duration:1,
            scrollTrigger:{
                trigger:'#quote-texts',
                start:'100px',
                toggleActions: ScrollToggleActions,
                end:totalDurationSecondTitle,
            }
        })
        
        gsap.to('#we-do',{
            y:0,
            opacity:1,
            ease: "power1.out",
            duration:1,
            delay:0.1,
            scrub:true,
            scrollTrigger:{
                trigger:'#we-do',
                start:'500px',
                toggleActions: ScrollToggleActions,
                end:totalDurationSecondTitle,
            }
        })
        
    }


    let ctx = gsap.context(() => {
     ScrollTrigger.create({
        trigger: '#second-title',
        start: 'top top',
        end: totalDurationSecondTitle,
        pin: true,
        pinSpacing:true,
     });

    }); 
    showScrollableTitles();
    return () => ctx.revert();

    
  },[])

  useEffect(()=>{
    $(document).ready(function(){
    $.scrollify({
      section: ".home-snapping",
      sectionName: "home-snapping",
      interstitialSection: "",
      easing: "easeOutExpo",
      // easing: "swing",
      scrollSpeed: 500,
      offset: 0,
      scrollbars: true,
      standardScrollElements: "",
      setHeights: true,
      overflowScroll: true,
      updateHash: false,
      touchScroll: false,
    });
    });
  },[])
  

  useEffect(()=>{
    let ctxSlides = gsap.context(() => {
      
      ScrollTrigger.create({
        trigger:'.home-project-slider',
        start:'top 5%',
        end:'bottom 95%',
        onEnter:()=>{showPagin()},
        onLeave:()=>{hidePagin()},
        onEnterBack:()=>{showPagin()},
        onLeaveBack:()=>{hidePagin()},
    })
    
    

    const paginationBox = document.querySelector('.pagination');
    function showPagin(){
      paginationBox.classList.add('active');
    }
    
    function hidePagin(){
      paginationBox.classList.remove('active');
    }
    
    
    let homeProjectsBox = document.querySelectorAll('.home-slides-box');

 homeProjectsBox.forEach((box, index) => {
 
  let TitleElement = box.querySelector('h2');
  let subTitleElement = box.querySelector('h4');
  let subTitleImg = box.querySelector('img');
  
  let textTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: box,
      start: `top 50%`,  
      end: 'top bottom',  
      toggleActions: "play none none reverse",
      onEnter:()=>{updatePagination(index)},
      onLeaveBack:()=>{updatePagination(index-1)},
    }
  });

  textTimeline
    .fromTo(subTitleImg,{scale:1.2},{scale:1,delay:0})   
    .fromTo(TitleElement, { scale: 1.8, opacity: 1 }, { scale: 1, opacity: 1, duration: 0.5 })
    .fromTo(subTitleElement, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
    
 });    

    // Update Pagination for Home Project Slides
    let paginationItems = document.querySelectorAll('.pagination ul li');   
    function updatePagination(activeIndex) {
        paginationItems.forEach((item, index) => {
            item.classList.remove('active');
        });
        paginationItems[activeIndex].classList.add('active');
    }

  });


    return () => ctxSlides.revert(); 
  },[])



    return(
        <>
        <NavbarIntroPage/>
            <div id="page">
            
            <div className="nav-title" data-title=""></div>
            
            <div className="home-snapping">
                <div className="home-banner-box">
                
            <div id="clock" className="d-none" >
                <div className="clock-bg"></div>
                <div className="clock-dot">
                    <div className="line primary-line"><div className="clock-title">KSA</div></div>
                    <div className="line extended-line minute-line"></div>
                    <div className="line extended-line hour-line"></div>
                    <div className="line extended-line bottom-line"></div>
                </div>
            </div>
            
            
            <div id="home-title" >
            <div className="home-title-grad"></div>    
            <div className="introtext-box" >
                <div className="intro-text-content">
                    <h1 className="intro-title">
                        <div className="intro-sm-title intro-txbx"><span>Bringing</span></div> 
                        <div className="intro-lg-title intro-txbx"><span className="expnad-imgn-txt">Imagination</span></div> 
                        <div className="intro-sm-title intro-txbx mobile-to-life" style={{lineHeight:'3vw'}} ><span>to Life</span></div>
                    </h1>
                </div>
            </div>
            </div>

            <div>
                <a onClick={scrollSmoothTo} ><div className="scroll-downlink">
                    
                </div></a>
                <div className="scrollbanner">
                    <div className="scrollbanner-box"></div>
                </div>
            </div>
            </div>
            <div id="second-title" ref={secondTitleSection} className="active" >
            <div className="introtext-box" >
                <div className="intro-text-content">
                    <h1 className="">
                        <div className="qoute-text text-capitalize scale-down second-transition" id="they-say"><span><i>They say,</i></span></div> 
                        <div className="duo-quotation scale-down second-transition" id="quote-texts">
                            <div className="qoute-text text-uppercase"><span >"It takes 7 Seconds</span></div> 
                            <div className="qoute-text text-uppercase"><span >to make an Impression."</span></div> 
                        </div>
                        <div className="qoute-text text-uppercase scale-down fw-bold second-transition" id="we-do"><span>We do it in 5</span></div>
                    </h1>
                </div>
            </div>
            </div>
            </div>
            
            
            
            
            
            
           
            <div className="home-project-slider">
                
                    <div className="pagination">
                      <ul>
                        <li data-index="0">1</li>
                        <li data-index="1">2</li>
                        <li data-index="2">3</li>
                        <li data-index="3">4</li>
                        <li data-index="4">5</li>
                      </ul>
                    </div>
                
                    <div className="home-slides-box home-snapping">
                        <div className="slider-texts">
                            <h2>CLUSTER A</h2>
                            <h4>GREEN FACADE, VIBRANT SPACE. LIVE THE CASCADED DIFFERENCE</h4>
                        </div>
                        <img src="/images/home/1.jpg"/>
                    </div>
                    
                    <div className="home-slides-box home-snapping">
                         <div className="slider-texts">
                            <h2>VU_T_SCHOOL</h2>
                            <h4>ARCHITECTURE MEETS EDUCATION : A SCHOOL REIMAGINED</h4>
                        </div>
                        <img src="/images/home/2.jpg"/>
                    </div>
                    
                    <div className="home-slides-box home-snapping" >
                         <div className="slider-texts">
                            <h2>BEVAB HEIGHTS</h2>
                            <h4>TWISTING LUXURY: REDEFINING THE SKYLINE</h4>
                        </div>
                        <img src="/images/home/3.jpg"/>
                    </div>
                    
                    <div className="home-slides-box home-snapping" >
                         <div className="slider-texts">
                            <h2>VAULT</h2>
                            <h4>THE ART OF HOSPITALITY, REDEFINED</h4>
                        </div>
                        <img src="/images/home/4.jpg"/>
                    </div>
                    
                    <div className="home-slides-box home-snapping" >
                         <div className="slider-texts">
                            <h2>LIVINE PARK</h2>
                            <h4>A PINNACLE OF MODERN LUXURY</h4>
                        </div>
                        <img src="/images/home/5.jpg"/>
                    </div>
            </div>

            <div className="page-section home-snapping" id="mainContent">
              <HomeMenu/>    
            </div>    
        </div>
        </>
    )

}