'use client';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide styles
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ProjectEssencials from './projectsEssecials';
import Image from 'next/image';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection({ section, slides, essecials, points }) {

  const InfoSection = useRef(null);

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
            // markers: true, // Enable markers for debugging if needed
          }
        }
      );
    }
  }, [section]);

  let SliderSettings = {
    type: 'loop',
    perPage: 1,
    autoplay: true,
    interval: 4000,
    pagination: false,
    arrows: true,
    loop: false,
  };

  if (section.section_type === 1) {
    return (
      <div className="project-info-section remove-transparent full-bleed-image  project-border-bottom" ref={InfoSection}>
        <div className="row m-0 g-0">
          <div className="col-lg-7">
            <div className="project-image-info">
              <h2>{section.section_title}</h2>
              <h4>{section.content}</h4>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="project-info-image">
              {windowSize.width <= 750 && section.section_image_mobile ? 
                <Image height={500} width={500} placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + section.section_image_mobile} alt="Mobile Image"/>
                : windowSize.width > 750 && section.section_image ? 
                <Image height={500} width={500} unoptimized placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + section.section_image} alt="PC Image"/> 
                : null }
            </div>
          </div>
        </div>
      </div>
    );
  } else if (section.section_type === 2) {
    return (
        <div className="project-info-section remove-transparent project-border-bottom" ref={InfoSection}>
          <div className="row m-0 g-0">
            <div className=" col-lg-7">
              <div className="project-image-info">
                <h2>{section.section_title}</h2>
                <h4>{section.content}</h4>
              </div>
            </div>
            <div className=" col-lg-5">
              <div className="project-info-image info-slider-section">
                <Splide options={SliderSettings}>
                  {slides.slides.map((slide, index) => (
                    <SplideSlide key={index}>
                      {windowSize.width <= 750 && slide.mobile ? 
                        <Image height={500} width={500} style={{ width: '100%', height: '100%' }} placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + slide.mobile} alt="Mobile Slide" />
                        : windowSize.width > 750 && slide.desktop ?
                        <Image height={500} width={500} unoptimized style={{ width: '100%', height: '100%' }} placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + slide.desktop} alt="PC Slide" />
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
            <div className="project-info-section full-bleed-container position-relative hero-image" style={{ minHeight: '100vh' }} ref={InfoSection}>
              <Image className='hero-image' height={500} width={500} style={{ width: '100%', height: '100vh', objectFit: 'cover' }} unoptimized placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + section.section_image_mobile} alt="Mobile Hero Image" />
            </div>
          )
          : windowSize.width > 750 && section.section_image ? 
          (
            <div className="project-info-section full-bleed-container position-relative hero-image" style={{ minHeight: '100vh' }} ref={InfoSection}>
              <Image className='hero-image' height={500} width={500} unoptimized style={{ width: '100%', height: '100vh', objectFit: 'cover' }} placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + section.section_image} alt="PC Hero Image" />
            </div>
          )
          : null}
      </>
    );
}

  else if (section.section_type === 4) {
    return slides.slides.length !== 0 ? (
      <div className="project-info-section full-bleed-container position-relative hero-image" ref={InfoSection}>
        <Splide options={SliderSettings}>
          {slides.slides.map((slide, index) => (
            <SplideSlide key={index}>
              {windowSize.width <= 750 && slide.mobile ? 
                <Image className='hero-image' height={500} width={500} style={{ width: '100%', height: '100vh', objectFit: "cover" }} placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + slide.mobile} alt="Mobile Slide"/>
                : windowSize.width > 750 && slide.desktop ? 
                <Image className='hero-image' height={500} width={500} unoptimized style={{ width: '100%', height: '100vh', objectFit: "cover" }} placeholder='blur' blurDataURL='/images/white-blur.png' src={process.env.NEXT_PUBLIC_SITE_URL + slide.desktop} alt="PC Slide"/>
                : null}
            </SplideSlide>
          ))}
        </Splide>
      </div>
    ) : null;
  }
  else if (section.section_type === 5) {
    return (
      <div ref={InfoSection} className='remove-transparent project-info-section' style={{ transition: 'all 1.2s ease' }}>
        <ProjectEssencials essecials={essecials} points={points} />
      </div>
    );
  }
}
