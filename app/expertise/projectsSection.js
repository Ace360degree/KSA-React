'use client';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide styles

export default function ProjectSection({ section, slides }) {

    let SliderSettings= {
            type      : 'loop',
            perPage   : 1,
            autoplay  : true,
            interval:4000,
            pagination: false,
            arrows    : true,
            loop       : false,
    }

    if (section.section_type == 1) {
      return (
        <div className="project-info-section my-1 project-border-bottom">
          <div className="row m-0 g-0">
            <div className="col-md-7">
              <div className="project-image-info p-4">
                <h2>{section.section_title}</h2>
                <h4>{section.content}</h4>
              </div>
            </div>
            <div className="col-md-5">
              <div className="project-info-image">
                <img src={process.env.NEXT_PUBLIC_SITE_URL + section.section_image} alt="Project" />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (section.section_type == 2) {
      return (
        <div className="project-info-section my-1 project-border-bottom">
          <div className="row m-0 g-0">
            <div className="col-md-7">
              <div className="project-image-info p-4">
                <h2>{section.section_title}</h2>
                <h4>{section.content}</h4>
              </div>
            </div>
            <div className="col-md-5">
              <div className="project-info-image">
              <Splide
              options={SliderSettings}
            >
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
        <div className="project-info-section position-relative">
          <img className="project-slider-img" src={process.env.NEXT_PUBLIC_SITE_URL + section.section_image} alt="Project" />
        </div>
      );
    } else if (section.section_type == 4) {
        console.log(slides.slides);
      return (
        slides.slides.length !== 0 ? (
          <div className="project-info-section position-relative">
            <Splide
              options={SliderSettings}
            >
              {slides.slides.map((slide, index) => (
                <SplideSlide key={index}>
                  <img className="project-slider-img" src={process.env.NEXT_PUBLIC_SITE_URL + slide.desktop} alt={`Slide ${index}`} />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        ) : null
      );
    }
  }
