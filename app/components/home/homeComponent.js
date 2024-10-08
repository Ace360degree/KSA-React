'use client';
import HomeMenu from "../homeMenu/homeMenu";
import '../../home.css';
import NavbarIntroPage from "../NavbarIntroPage";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import $ from 'jquery';
import 'jquery-scrollify';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollifyComponent from "./jQScrollify";
import CheckNavTransparent from "../commons/checkNavTransparent";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function HomeComponent(){
  

  const [snapping, setSnapping] = useState(false);
  const [fullScreenCheck, setFullScreenCheck] = useState(1);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const router = useRouter();
  const secondTitleSection = useRef(null);
  const page = useRef(null);
  const [fullscreen, setFullScreen] = useState(1);

  // Smooth scroll to the section
  const scrollSmoothTo = () => {
    if (secondTitleSection.current) {
      secondTitleSection.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    gsap.to(window, { scrollTo: { y: 0, autoKill: false } });
    gsap.ticker.lagSmoothing(false);
    setSnapping(true);

    // Function for Each Section has been Declared
    const navbar = document.getElementById('navbar');
    const TitleCard = document.getElementById('home-title');
    const mainContent = document.getElementById('mainContent');
    const ProjectSlider = document.querySelector('.home-project-slider');
    const homeSlidesItem = document.querySelectorAll('.home-slider-item');
    document.body.classList.add('loading', 'dark');

    homeSlidesItem.forEach((item, index) => {
      item.style.zIndex = 2 + index;
    });

    function showTitleAnimation() {
      TitleCard.classList.add('active');
      setTimeout(() => {
        document.body.classList.add('dark', 'loading');
        document.querySelectorAll('.intro-txbx').forEach((intro, index) => {
          const tl = gsap.timeline({ delay: index * 1 });
          tl.fromTo(intro, {
            transform: 'translateY(40px) rotateX(-90deg)',
            height: 0,
            opacity: 1
          }, {
            transform: 'translateY(0) rotateX(0deg)',
            opacity: 1,
            delay: 0.2,
            duration: 0.5
          }).to(intro, {
            transform: 'translateY(0) rotateX(0deg)',
            height: "auto",
            duration: 0.3
          }, 0.7);
        });
        setTimeout(() => {
          document.querySelector('.expnad-imgn-txt').classList.add('active');
          setTimeout(() => {
            navbar.classList.add('active');
            document.querySelector('.audio-box').classList.add('slide-up');
            document.querySelector('.auth-icon-box').classList.add('slide-up');
            document.querySelector('.scrollbanner').classList.add('active');
          }, 1500);
        }, 1500);
        document.body.classList.remove('loading');
      }, 1000);
    }

    showTitleAnimation();

    gsap.fromTo('.scrollbanner.active', { opacity: 1 }, {
      opacity: 0,
      duration: 0.4,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: '#second-title',
        scrub: true,
        start: "top bottom",
        end: "bottom bottom",
      }
    });

    function hideTitleAnimation() {
      TitleCard.querySelectorAll('.intro-title-text').forEach((title, index) => {
        setTimeout(() => title.classList.add('dismiss'), 150 * index);
      });
      setTimeout(() => TitleCard.classList.remove('active'), 4000);
    }

    function showSecondTitleAnimation() {
      document.getElementById('second-title').classList.add('active');
    }

    function hideSecondTitleAnimation() {
      document.querySelectorAll('#second-title .intro-title-text').forEach((title, index) => {
        setTimeout(() => title.classList.add('dismiss'), 150 * index);
      });
      setTimeout(() => document.getElementById('second-title').classList.remove('active'), 4000);
    }

    function showMainContent() {
      mainContent.classList.add('active');
    }

    function showProjectSlider() {
      ProjectSlider.classList.add('active');
    }

    function hideProjectSlider() {
      ProjectSlider.classList.remove('active');
    }

    function viewerScaleUp() {
      document.querySelector('.home-grid-viewer').classList.remove('tiny');
      document.querySelector('.slider-texts').classList.add('active');
    }

    document.querySelectorAll('.hero-sub').forEach((heroSub) => {
      gsap.fromTo(heroSub, {
        opacity: 0,
        y: "80px"
      }, {
        opacity: 1,
        y: "0",
        scrollTrigger: {
          trigger: '#mainContent',
          scrub: true,
          start: "top 20%",
          end: "top 70%",
        }
      });
    });

    document.querySelectorAll('.hero-title').forEach((heroTitle) => {
      gsap.fromTo(heroTitle, {
        opacity: 0,
        y: "120px",
      }, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: '#mainContent',
          scrub: true,
          start: "top 30%",
          end: "top 80%",
        }
      });
    });

    gsap.fromTo('.user-clock', {
      opacity: 0,
    }, {
      opacity: 1,
      scrollTrigger: {
        trigger: '#mainContent',
        scrub: true,
        start: "top 30%",
        end: "top 80%",
      }
    });

  }, [fullScreenCheck]);

  useEffect(() => {
    const totalDurationSecondTitle = `+=${window.innerHeight * 2}`;
    const ScrollToggleActions = 'play none none reverse';
    const quoteTextFontSize = window.innerWidth >= 992 ? '3.8rem' : '1.8rem';
    const theySayFontSize = window.innerWidth >= 992 ? '5rem' : '2rem';

    function showScrollableTitles() {
      gsap.to('#they-say', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: '#second-title',
          start: 'top 50%',
          toggleActions: ScrollToggleActions,
          end: totalDurationSecondTitle,
        }
      });

      gsap.to('#they-say', {
        fontSize: theySayFontSize,
        ease: "power1.out",
        duration: 1,
        scrollTrigger: {
          trigger: '#second-title',
          start: 'top top',
          toggleActions: ScrollToggleActions,
          end: totalDurationSecondTitle,
        }
      });

      gsap.to('#quote-texts', {
        y: 0,
        ease: "power1.out",
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '#quote-texts',
          start: 'top top',
          toggleActions: ScrollToggleActions,
          end: totalDurationSecondTitle,
        }
      });

      gsap.to('#quote-texts', {
        fontSize: quoteTextFontSize,
        ease: "power1.out",
        duration: 1,
        scrollTrigger: {
          trigger: '#quote-texts',
          start: '100px',
          toggleActions: ScrollToggleActions,
          end: totalDurationSecondTitle,
        }
      });

      gsap.to('#we-do', {
        y: 0,
        opacity: 1,
        ease: "power1.out",
        duration: 1,
        delay: 0.1,
        scrub: true,
        scrollTrigger: {
          trigger: '#we-do',
          start: '500px',
          toggleActions: ScrollToggleActions,
          end: totalDurationSecondTitle,
        }
      });
    }

    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#second-title',
        start: 'top top',
        end: totalDurationSecondTitle,
        pin: true,
        pinSpacing: true,
      });
    });

    showScrollableTitles();

    return () => ctx.revert();
  }, [fullScreenCheck]);

  useEffect(() => {
    setSnapping(false);
    let ctxSlides = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.home-project-slider',
        start: 'top 5%',
        end: 'bottom 95%',
        onEnter: showPagin,
        onLeave: hidePagin,
        onEnterBack: showPagin,
        onLeaveBack: hidePagin,
      });

      const paginationBox = document.querySelector('.pagination');
      function showPagin() {
        paginationBox.classList.add('active');
      }

      function hidePagin() {
        paginationBox.classList.remove('active');
      }

      const homeProjectsBox = document.querySelectorAll('.home-slides-box');
      homeProjectsBox.forEach((box, index) => {
        const TitleElement = box.querySelector('h2');
        const subTitleElement = box.querySelector('h4');
        const subTitleImg = box.querySelector('img');

        let textTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: box,
            start: 'top 50%',
            end: 'top bottom',
            toggleActions: "play none none reverse",
            onEnter: () => updatePagination(index),
            onLeaveBack: () => updatePagination(index - 1),
          }
        });

        textTimeline
          .fromTo(subTitleImg, { scale: 1.2 }, { scale: 1, delay: 0 })
          .fromTo(TitleElement, { scale: 1.8, opacity: 1 }, { scale: 1, opacity: 1, duration: 0.5 })
          .fromTo(subTitleElement, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
      });

      const paginationItems = document.querySelectorAll('.pagination ul li');
      function updatePagination(activeIndex) {
        paginationItems.forEach((item) => {
          item.classList.remove('active');
        });
        paginationItems[activeIndex]?.classList.add('active');
      }
    });

    return () => ctxSlides.revert();
  }, [fullScreenCheck]);

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
  }, [fullScreenCheck]);
  


  useEffect(() => {
    $(document).ready(function () {
      // Initialize Scrollify
      $.scrollify.enable();
      $.scrollify({
        section: ".home-snapping",
        sectionName: "home-snapping",
        interstitialSection: "",
        easing: "easeOutExpo",
        scrollSpeed: isTouchDevice?100:1500,
        offset: 0,
        scrollbars: true,
        standardScrollElements: "",
        setHeights: true,
        overflowScroll: true,
        updateHash: false,
        touchScroll: true,
        before: function(index, sections) {
          const nextSection = sections[index]; // Get the next section
          if ($(nextSection).hasClass('hero-image')) {
              $('#navbar').addClass('transparent');
              $('.change-svg').addClass('light');
          }
          else{
            $('#navbar').removeClass('transparent');
            $('.change-svg').removeClass('light');
          }
        },
      });
  
      // Refresh ScrollTrigger after Scrollify initializes
      ScrollTrigger.refresh();
    });
  
    return () => $.scrollify.disable(); // Cleanup Scrollify when component unmounts
  }, [fullScreenCheck]);




  useEffect(()=>{
    const handleResize = () => {
      setFullScreenCheck(prev => prev + 1);
      console.log(fullScreenCheck);
      ScrollTrigger.refresh();
    };
  
    window.addEventListener('resize', handleResize);
  
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[fullScreenCheck]);




    return( 
        <>
        <NavbarIntroPage/>
        {/* <ScrollifyComponent/> */}
        <CheckNavTransparent/>
            <div id="page" ref={page}>
            
            <div className="nav-title" data-title=""></div>
            
            <div className="home-snapping">
                <div className="home-banner-box">
                
            
            
            
            <div id="home-title" >
            <div className="home-title-grad"></div>    
            <div className="introtext-box" >
                <div className="intro-text-content">
                    <h1 className="intro-title">
                        <div className="intro-sm-title intro-txbx"><span>Bringing</span></div> 
                        <div className="intro-lg-title intro-txbx"><span className="expnad-imgn-txt">Imagination</span></div> 
                        <div className="intro-sm-title intro-txbx mobile-to-life bil-sml-gap" ><span>to Life</span></div>
                    </h1>
                </div>
            </div>
            </div>

            <div>
                <a onClick={()=>{scrollSmoothTo()}} ><div className="scroll-downlink">
                    
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
                
                    <div className="home-slides-box hero-image home-snapping">
                        <div className="slider-texts">
                            <h2>CLUSTER A</h2>
                            <h4>GREEN FACADE, VIBRANT SPACE. LIVE THE CASCADED DIFFERENCE</h4>
                        </div>
                        <img className="hero-image" src="/images/home/1.jpg"/>
                    </div>
                    
                    <div className="home-slides-box hero-image home-snapping">
                         <div className="slider-texts">
                            <h2>VU_T_SCHOOL</h2>
                            <h4>ARCHITECTURE MEETS EDUCATION : A SCHOOL REIMAGINED</h4>
                        </div>
                        <img className="hero-image" src="/images/home/2.jpg"/>
                    </div>
                    
                    <div className="home-slides-box hero-image home-snapping" >
                         <div className="slider-texts">
                            <h2>BEVAB HEIGHTS</h2>
                            <h4>TWISTING LUXURY: REDEFINING THE SKYLINE</h4>
                        </div>
                        <img className="hero-image" src="/images/home/3.jpg"/>
                    </div>
                    
                    <div className="home-slides-box hero-image home-snapping" >
                         <div className="slider-texts">
                            <h2>VAULT</h2>
                            <h4>THE ART OF HOSPITALITY, REDEFINED</h4>
                        </div>
                        <img className="hero-image" src="/images/home/4.jpg"/>
                    </div>
                    
                    <div className="home-slides-box hero-image home-snapping" >
                         <div className="slider-texts">
                            <h2>LIVINE PARK</h2>
                            <h4>A PINNACLE OF MODERN LUXURY</h4>
                        </div>
                        <img className="hero-image" src="/images/home/5.jpg"/>
                    </div>
            </div>

            <div className="page-section page-section-100 home-snapping hero-image" id="mainContent">
              <HomeMenu/>    
            </div>    
        </div>
        </>
    )

}