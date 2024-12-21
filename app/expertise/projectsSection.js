'use client';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide styles
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ProjectEssencials from './projectsEssecials';
import Image from 'next/image';
import { Video } from "reactjs-media";



// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection({ section, slides, essecials, points, video}) {

  const InfoSection = useRef(null);
  console.log(video);

  const videoSection = useRef(null);
  const videoElem = useRef(null);

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    // Handle resizing and updating window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if(videoElem.current){
      const trigger = ScrollTrigger.create({
        trigger: videoSection.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          videoElem.current?.play();
        },
        onLeave: () => {
          videoElem.current?.pause();
        },
        onEnterBack: () => {
          videoElem.current?.play();
        },
        onLeaveBack: () => {
          videoElem.current?.pause();
        },
      });

      return () => {
        trigger.kill();
      };
    }

    // Cleanup ScrollTrigger on component unmount
    
  }, [section,video]);

  useEffect(() => {
    if (InfoSection.current) {
      // Initialize ScrollTrigger
      gsap.fromTo(InfoSection.current, 
        {
          opacity: 0,
          y: "200",
        },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: InfoSection.current, // Use the reference element for trigger
            scrub: true,
            start: "top 100%", // Adjust the start position for better control
            end: "top 90%",
          }
        }
      );
    }
  }, [section]);

  let SliderSettings = {
    type: 'slide',
    pagination: true,
    arrows: true,
  };

  let SliderContentSettins = {
    type: 'slide',
    autoWidth:true,
    gap:'2.5rem',
    pagination: true,
    arrows: true,
    breakpoints: {
      992: {              // For screens 768px and below (Mobile Devices)
        autoWidth: true, // Disable autoWidth on mobile
        gap: '12px',       // Disable gap on mobile
      },
    },
  };




  if (section.section_type === 1) {
    return (
      <>
        <div className="project-info-section partially-width remove-transparent project-border-bottom project-info-flex signifier" ref={InfoSection}>
          <div className='info-block-content'>
               <h2 className='info-block-title text-start signifier'>{section.section_title}</h2>
                <h4 className='info-block-desc text-start signifier'>{section.content}</h4>
          </div>
          <div className='info-block-image img-block-border'>
               {windowSize.width <= 840 && section.section_image_mobile ? 
                 <Image className='info-block-img' height={500} width={500} placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + section.section_image_mobile} alt="KSA"/>
                 : windowSize.width > 840 && section.section_image ? 
                 <Image className='info-block-img' height={500} width={500} unoptimized placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + section.section_image} alt="KSA"/> 
                 : null }
          </div>
        </div>
      </>
    );
  } else if (section.section_type === 2) {
    return (
        <div className="project-info-section partially-width remove-transparent project-info-flex project-border-bottom project-section-no-padding" ref={InfoSection}>
              <div className='row'>

                <div className='col-md-4'>
                  <div className="info-block-content">
                    <h2 className='text-start info-block-title signifier'>{section.section_title}</h2>
                    <h4 className='text-start info-block-desc signifier'>{section.content}</h4>
                  </div>
                </div>

                <div className='col-md-8 p-0'>
                    <div className="project-info-image info-block-image info-slider-section project-info-slider-padding">
                    <Splide options={SliderContentSettins}>
                      {slides.slides.map((slide, index) => (
                        <SplideSlide key={index}>
                          {windowSize.width <= 750 && slide.mobile ? 
                            <Image height={500} width={500} className='mobile-slider-img-content' style={{ width: 'auto', height: '100%' }} placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + slide.mobile} alt="KSA" />
                            : windowSize.width > 750 && slide.desktop ?
                            <Image height={500} width={500} unoptimized style={{ width: '100%', height: '100%' }} placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + slide.desktop} alt="KSA" />
                            : null}
                        </SplideSlide>
                      ))}
                    </Splide>
                  </div>
                </div>
              </div>
              
              
        </div>
    );
  } else if (section.section_type === 3) {
    return (
      <>
        {windowSize.width <= 750 && section.section_image_mobile ? 
          (
            <div className="img-border-section position-relative hero-image" style={{ minHeight: '100vh' }} ref={InfoSection}>
              <Image className='hero-image' height={500} width={500} style={{ width: '100%', height: '100vh', objectFit: 'cover' }} unoptimized placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + section.section_image_mobile} alt="KSA" />
            </div>
          )
          : windowSize.width > 750 && section.section_image ? 
          (
            <div className=" img-border-section position-relative hero-image hero-padding" ref={InfoSection}>
              <Image className='hero-image' height={500} width={500} unoptimized style={{ width: '100%', height: '80vh', objectFit: 'cover' }} placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + section.section_image} alt="KSA" />
            </div>
          )
          : null}
      </>
    );
}

  else if (section.section_type === 4) {
    return slides.slides.length !== 0 ? (
      <div className="project-info-section img-border-section full-bleed-container position-relative hero-image" ref={InfoSection}>
        <Splide options={SliderSettings}>
          {slides.slides.map((slide, index) => (
            <SplideSlide key={index}>
              {windowSize.width <= 750 && slide.mobile ? 
                <Image className='hero-image' height={500} width={500} style={{ width: '100%', height: '100vh', objectFit: "cover" }} placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + slide.mobile} alt="KSA"/>
                : windowSize.width > 750 && slide.desktop ? 
                <Image className='hero-image' height={500} width={500} unoptimized style={{ width: '100%', height: '100vh', objectFit: "cover" }} placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + slide.desktop} alt="KSA"/>
                : null}
            </SplideSlide>
          ))}
        </Splide>
      </div>
    ) : null;
  }
  else if (section.section_type === 5) {
    return (
      <div ref={InfoSection} className='remove-transparent partially-width project-underline-section project-info-section project-essentials' style={{ transition: 'all 1.2s ease' }}>
        <ProjectEssencials essecials={essecials} points={points} />
      </div>
    );
  }

    else if (section.section_type === 6) {
    return (
      <>
      <div className="project-info-section video-section hero-image justify-content-center " ref={videoSection}>
        <Video width={'90%'} height={'auto'} style={{background:'transparent',maxHeight:'85vh',margin:'auto'}} ref={videoElem} controls={true} src={process.env.NEXT_PUBLIC_SITE_URL+ video.video} />
      </div>
      </>
    );
  }

  else if(section.section_type === 7){
    return(<>
      <div className="project-info-section project-border-bottom partially-width float-image-container" style={{height:'auto',minHeight:'auto'}}>
          <div class="w-100">
              <div className="w-100">
                <img className={`d-md-block d-none float-img ${section.alignment==1? 'me-auto': section.alignment==2?'mx-auto': section.alignment==3?'ms-auto':''}`} src={process.env.NEXT_PUBLIC_SITE_URL+section.section_image}/>
                <img className="w-100 d-md-none d-block" src={process.env.NEXT_PUBLIC_SITE_URL+section.section_image_mobile}/>
              </div>
          </div>
      </div>
    </>)
  }
  
  }


  

  

