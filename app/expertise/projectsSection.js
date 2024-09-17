'use client';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide styles
import { useEffect, useRef } from 'react';
import gsap from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ProjectEssencials from './projectsEssecials';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection({ section, slides,essecials,points }) {

  const InfoSection = useRef(null);

  useEffect(() => {
    if (InfoSection.current) {
      // Initialize ScrollTrigger
      gsap.fromTo(InfoSection.current, 
        {
          opacity: 0,
          y: "200px",
        },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: InfoSection.current, // Use the reference element for trigger
            scrub: true,
            start: "top 100%", // Adjust the start position for better control
            end: "top 80%",
            // markers: true, // Enable markers for debugging if needed
          }
        }
      );
    }
  }, [section]); // Add section to dependencies

  let SliderSettings = {
    type: 'loop',
    perPage: 1,
    autoplay: true,
    interval: 4000,
    pagination: false,
    arrows: true,
    loop: false,
  };

  if (section.section_type == 1) {
    return (
      <div className="project-info-section my-1 project-border-bottom" ref={InfoSection}>
        <div className="row m-0 g-0">
          <div className="col-md-4 col-lg-7">
            <div className="project-image-info p-4">
              <h2>{section.section_title}</h2>
              <h4>{section.content}</h4>
            </div>
          </div>
          <div className="col-md-8 col-lg-5">
            <div className="project-info-image">
              <img src={process.env.NEXT_PUBLIC_SITE_URL + section.section_image} alt="Project" />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (section.section_type == 2) {
    return (
      <div className="project-info-section my-1 project-border-bottom" ref={InfoSection}>
        <div className="row m-0 g-0">
          <div className="col-md-4 col-lg-7">
            <div className="project-image-info p-4">
              <h2>{section.section_title}</h2>
              <h4>{section.content}</h4>
            </div>
          </div>
          <div className="col-md-8 col-lg-5">
            <div className="project-info-image">
              <Splide options={SliderSettings}>
                {slides.slides.map((slide, index) => (
                  <SplideSlide key={index}>
                    <img src={process.env.NEXT_PUBLIC_SITE_URL + slide.desktop} alt="Project" />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (section.section_type == 3) {
    return (
      <div className="project-info-section position-relative" ref={InfoSection}>
        <img className="project-slider-img" src={process.env.NEXT_PUBLIC_SITE_URL + section.section_image} alt="Project" />
      </div>
    );
  } else if (section.section_type == 4) {
    return slides.slides.length !== 0 ? (
      <div className="project-info-section position-relative" ref={InfoSection}>
        <Splide options={SliderSettings}>
          {slides.slides.map((slide, index) => (
            <SplideSlide key={index}>
              <img className="project-slider-img" src={process.env.NEXT_PUBLIC_SITE_URL + slide.desktop} alt={`Slide ${index}`} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    ) : null;
  }
  else if (section.section_type == 5) {
    return (
      <ProjectEssencials essecials={essecials} points={points} />
    );
  }
}
