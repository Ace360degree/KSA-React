'use client';
import HomeMenu from "../homeMenu/homeMenu";
import '../../home.css';
import NavbarIntroPage from "../NavbarIntroPage";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from "gsap/all";
import $ from 'jquery';
import 'jquery-scrollify';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

import ScrollifyComponent from "./jQScrollify";
import CheckNavTransparent from "../commons/checkNavTransparent";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Scrollbar from 'smooth-scrollbar';




gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

export default function HomeComponent(){
  
  const [showNabar,setShowNavbar] =useState(false);
  const [snapping, setSnapping] = useState(false);
  const [fullScreenCheck, setFullScreenCheck] = useState(1); 
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const router = useRouter();
  const secondTitleSection = useRef(null);
  const page = useRef(null);
  const [fullscreen, setFullScreen] = useState(1);
  const [homeBanners,setHomeBanners] = useState([]);
  const bottomPage = useRef(null);

  const SliderRefs = useRef(null);


  const scrollContainerRef = useRef(null);



  useEffect(()=>{

    const fetchHomeBanners= async()=>{
        const fetchAPI = await fetch('api/home/fetchBanners',{method:'GET'});
        const fetchedBanners = await (fetchAPI.json());
        setHomeBanners(fetchedBanners.rows);
    }

    fetchHomeBanners();

  },[])
  
  // Smooth scroll to the section
  const scrollSmoothTo = () => {
    if (secondTitleSection.current) {
      secondTitleSection.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };


  const scrollbarRef = useRef(null);  // Store the scrollbar instance in a ref

  useEffect(() => {
    // Initialize Smooth Scrollbar
    scrollbarRef.current = Scrollbar.init(scrollContainerRef.current, {
      damping: 0.10, 
      thumbMinSize: 20, // Minimum thumb size for the scrollbar
    });

    // Set up GSAP ScrollTrigger to sync with Smooth Scrollbar
    ScrollTrigger.scrollerProxy(scrollContainerRef.current, {
      scrollTop(value) {
        return value === undefined ? scrollbarRef.current.scrollTop : scrollbarRef.current.scrollTo(value, 0, 0);
      },
    });

    // Update ScrollTrigger on scroll
    scrollbarRef.current.addListener(ScrollTrigger.update);

    // Clean up on unmount
    return () => {
      if (scrollbarRef.current) {
        scrollbarRef.current.destroy();
      }
    };
  }, []);





  useEffect(() => {
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
        scroller: scrollContainerRef.current,
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
          scroller: scrollContainerRef.current,
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
          scroller: scrollContainerRef.current,
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
        scroller: scrollContainerRef.current,
        start: "top 30%",
        end: "top 80%",
      }
    });

  }, []);

  useEffect(() => {
    const totalDurationSecondTitle = `+=${window.innerHeight * 2}`;
    const ScrollToggleActions = 'play none none reverse';
    const quoteTextFontSize = window.innerWidth >= 992 ? '2.8rem' : '1.8rem';
    const theySayFontSize = window.innerWidth >= 992 ? '3.2rem' : '2rem';

    function showScrollableTitles() {
      gsap.to('#they-say', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: '#second-title',
          scroller: scrollContainerRef.current,
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
          scroller: scrollContainerRef.current,
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
          scroller: scrollContainerRef.current,
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
          scroller: scrollContainerRef.current,
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
          scroller: scrollContainerRef.current,
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
        scroller: scrollContainerRef.current,
        end: totalDurationSecondTitle,
        pin: true,
        pinSpacing: true,
      });
    });

    showScrollableTitles();

    return () => ctx.revert();
  }, [fullScreenCheck,homeBanners]);

  useEffect(() => {
    setSnapping(false);
    let ctxSlides = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.home-project-slider',
        start: 'top 5%',
        scroller: scrollContainerRef.current,
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

      const homeProjectsBox = document.querySelectorAll('.slider-hero-snapping');
      homeProjectsBox.forEach((box, index) => {
        const TitleElement = box.querySelector('h2');
        const subTitleElement = box.querySelector('h4');
        const subTitleImg = box.querySelector('img');

        function initTitleAnimation(){
          homeProjectsBox.forEach((obj)=>{
            obj.classList.remove('active');
          })
          box.classList.add('active');
        }

        function removeAnimation(){
          box.classList.remove('active');
        }

        function replayAnimation(ind){
          homeProjectsBox.forEach((obj)=>{
            obj.classList.remove('active');
          })
          if(homeProjectsBox[ind]){
            homeProjectsBox[ind].classList.add('active');
          }
        }

        ScrollTrigger.create({
            trigger: box,
            start: 'top 80%',
            end: 'top bottom',
            scroller: scrollContainerRef.current,
            onEnter: () =>{ updatePagination(index);initTitleAnimation();},
            // onEnterBack:()=>{replayAnimation(index);},
            onLeaveBack: () =>{ updatePagination(index - 1);replayAnimation(index-1)},
        });

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
  }, [fullScreenCheck,homeBanners]);

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
  
  useEffect(()=>{
    $.scrollify.move(0);
    $.scrollify.destroy();
  },[])


  // useEffect(() => {
  //   $(document).ready(function () {
  //     // Initialize Scrollify
  //     $.scrollify.enable();
  //     $.scrollify({
  //       section: ".home-snapping",
  //       sectionName: "home-snapping",
  //       interstitialSection: "",
  //       easing: "easeOutExpo",
  //       scrollSpeed: isTouchDevice?100:1500,
  //       offset: 0,
  //       scrollbars: true,
  //       standardScrollElements: "",
  //       setHeights: true,
  //       overflowScroll: true,
  //       updateHash: false,
  //       touchScroll: true,
  //       // before: function(index, sections) {
  //       //   const nextSection = sections[index]; // Get the next section
  //       //   if ($(nextSection).hasClass('hero-image')) {
  //       //       $('#navbar').addClass('transparent');
  //       //       $('.change-svg').addClass('light');
  //       //   }
  //       //   else{
  //       //     $('#navbar').removeClass('transparent');
  //       //     $('.change-svg').removeClass('light');
  //       //   }
  //       // },
  //     });
  
  //     // Refresh ScrollTrigger after Scrollify initializes
  //     ScrollTrigger.refresh();
  //   });
  
  //   return () => $.scrollify.disable(); // Cleanup Scrollify when component unmounts
  // }, [fullScreenCheck,homeBanners]);


  useEffect(()=>{
      const sliderText = document.querySelectorAll('.slider-texts');
      sliderText.forEach((text) => {
        let currheading = text.querySelector('h2');
        if (currheading) {
          let words = currheading.textContent.split(' '); // Split the heading text into words
          currheading.innerHTML = ''; // Clear the existing text content

          words.forEach((word) => {
            let span = document.createElement('span'); // Create a span element
            span.textContent = word + ' '; // Add the word inside the span
            currheading.appendChild(span); // Append the span to the heading
          });
        }
      })
  },[homeBanners]);




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
  },[fullScreenCheck,homeBanners]);


  // useEffect(()=>{
  //   if(bottomPage.current){
  //     ScrollTrigger.create({
  //       trigger:bottomPage.current,
  //       start:'top 40%',
  //       markers:true,
  //       onEnter:()=>{console.log('Lol');},
  //     })
  //   }
  // },[fullScreenCheck,homeBanners]);

  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Run your function only on touch screens
          if (isTouchCheckDevice()) {
            yourFunction();
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null, // Use the viewport as the container
      threshold: 0.1 // Trigger when 10% of the section is visible
    });

    if (bottomPage.current) {
      observer.observe(bottomPage.current);
    }

    return () => {
      if (bottomPage.current) {
        observer.unobserve(bottomPage.current);
      }
    };
  }, []);

  const isTouchCheckDevice = () => {
    // Use navigator to detect touch support
    return (
      'ontouchstart' in window ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0)
    );
  };

  const yourFunction = () => {
    console.log('Hero section is in the viewport on a touch device!');
    // Add your functionality here
    setTimeout(()=>{
      router.push('/home');
    },1000);
    
  };
  



    return( 
        <>

       <NavbarIntroPage active={showNabar} transparent={true}/>
        
        {/* <ScrollifyComponent/> */}
        {/* {homeBanners!=''?
        // <CheckNavTransparent/>
      :''} */}
            <div id="page" ref={scrollContainerRef} style={{ height: '100vh', overflow: 'hidden' }} >
            
            <div className="nav-title" data-title=""></div>
            
            <div className="home-snapping">
                <div className="home-banner-box ">
                
            
            
            
            <div id="home-title" >
            <div className="home-title-grad"></div>    
            <div className="introtext-box" >
                <div className="intro-text-content">
                    <h1 className="intro-title">
                        <div className="intro-sm-title intro-txbx"><span>Bringing</span></div> 
                        <div className="intro-lg-title intro-txbx billy-text"><span className="expnad-imgn-txt">Imagination</span></div> 
                        <div className="intro-sm-title intro-txbx mobile-to-life bil-sml-gap" ><span>to Life</span></div>
                    </h1>
                </div>
            </div>
            </div>

            <div>
                <a 
                  onClick={()=>{scrollSmoothTo()}} 
                  href="#second-title"
                  ><div className="scroll-downlink">
                    
                </div></a>
                <div className="scrollbanner">
                    <div className="scrollbanner-box"></div>
                </div>
            </div>
            </div>
            <div id="second-title" ref={secondTitleSection} className="active" >
            <div className="introtext-box" >
                <div className="intro-text-content">
                    <h1 className="they-say-titlebox billy-text" >
                        <div className="qoute-text text-capitalize scale-down second-transition" id="they-say"><span><i>They say,</i></span></div> 
                        <div className="duo-quotation scale-down second-transition" id="quote-texts">
                            <div className="qoute-text text-uppercase"><span >"It takes 7 Seconds</span></div> 
                            <div className="qoute-text text-uppercase"><span >to make an Impression",</span></div> 
                        </div>
                        <div className="qoute-text text-uppercase scale-down fw-bold second-transition" id="we-do" style={{fontFamily:'serif'}}><span>We do it in 5</span></div>
                    </h1>
                </div>
            </div>
            </div>
            </div>
            
            
            
            
            
            
           
            <div className="home-project-slider hero-image">
                
                    

                    {homeBanners.map((banner,index)=>(
                    <>
                    <div className="home-slides-box hero-image home-snapping slider-hero-snapping" key={index}>
                        <div className="slider-texts">
                            <h2 className="ms-0">{banner.title}</h2>
                            <h4 className="ms-0"><span>{banner.content}</span></h4>
                        </div>
                        <img className="hero-image desktop-home-banner" width={1240} height={768} src={'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg'}/>
                        <img className="hero-image desktop-home-banner" width={1240} height={768} src={'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg'}/>
                       
                        {/* <Image className="hero-image mobile-home-banner" width={420} quality={60} height={800} src={process.env.NEXT_PUBLIC_SITE_URL+banner.mobile_images}/> */}
                        {/* <Image className="hero-image mobile-home-banner" width={420} quality={60} height={800} src={process.env.NEXT_PUBLIC_SITE_URL+banner.mobile_images}/> */}
                    </div>
                    {banner.bottom_title && banner.bottom_title!=null?
                      <div class="home-banner-desc-box signifier"><h4>{banner.bottom_title}</h4></div>
                    :''}
                    </>
                    ))}
                    
            </div>

            <div className="page-section home-page-bottom-section page-section-100 slider-hero-snapping home-snapping hero-image" id="mainContent" ref={bottomPage}>
              <HomeMenu/>    
            </div>    
        </div>

        <div className="pagination">
          <ul>
          {homeBanners.map((banner,index)=>(
            <li data-index={index} key={index}>1</li>
          ))}
          </ul>
        </div>
        </>
    )

}