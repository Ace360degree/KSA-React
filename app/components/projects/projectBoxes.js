import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

export default function ProjectBoxes() {
  const projectScrollerRef = useRef(null);
  const projectItemsRef = useRef([]);


  const [projects,setProjects] = useState([]);

  useEffect(()=>{

    async function getProjectsAPI(){

      const fetchProjects = await fetch('/api/get-projects',{method:'GET',headers: {'Content-Type': 'application/json',}});
      const getProjects = await (fetchProjects.json());
      
      setProjects(getProjects.projects);
      console.log(projects)
    }

    getProjectsAPI();

  },[]);



  useEffect(() => {
    const projectBoxItems = projectItemsRef.current;
    
    projectBoxItems.forEach((box) => {
      const dataURL = box.getAttribute('data-url');
      if (dataURL) {
        box.addEventListener('click', () => {
          window.location.href = dataURL;
        });
      }
    });

    const windowHeight = window.innerHeight / 2;
    let lastScrollPos = undefined;
    let lastScrollTime = undefined;

    const onScroll = () => {
      const wrapper = projectScrollerRef.current;
      if (!wrapper) return;

      if (lastScrollTime === undefined) {
        lastScrollPos = window.scrollY;
        lastScrollTime = performance.now();
        return;
      }

      const dp = Math.abs(window.scrollY - lastScrollPos);
      const dt = performance.now() - lastScrollTime;

      lastScrollTime = performance.now();
      lastScrollPos = window.scrollY;

      const speed = dp / dt / 20;
      const clampedSpeed = Math.min(speed, 0.10);

      wrapper.style.setProperty("--speed", clampedSpeed + 0.01);
      wrapper.style.setProperty("--scroll", `${window.scrollY + windowHeight - 100}px`);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    let isDragging = false;
    let startX, scrollLeft;

    const onMouseDown = (e) => {
      isDragging = true;
      startX = e.pageX - window.scrollX;
      scrollLeft = window.scrollX;
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - window.scrollX;
      const walk = (x - startX) * 2;
      window.scrollTo({ left: scrollLeft - walk, behavior: "auto" });
    };

    const onMouseUp = () => {
      isDragging = false;
      document.body.style.cursor = "default";
      document.body.style.removeProperty("user-select");
    };

    document.body.addEventListener("mousedown", onMouseDown);
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp);

    return () => {
      document.body.removeEventListener("mousedown", onMouseDown);
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    let scrollerIndex = 0;

    const smoothScroll = (targetY, duration) => {
      const startY = window.scrollY;
      const diff = targetY - startY;
      let startTime = null;

      const scrollAnimation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollPosition = easeInOutQuad(timeElapsed, startY, diff, duration);

        window.scrollTo(0, scrollPosition);

        if (timeElapsed < duration) {
          requestAnimationFrame(scrollAnimation);
        }
      };

      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(scrollAnimation);
    };

    const initProjects = () => {
      const allProjects = projectItemsRef.current;
      if (!allProjects.length) return;

      const currProject = allProjects[scrollerIndex] || allProjects[0];
      if (currProject) {
        smoothScroll(currProject.offsetTop - 100, 100);
      }
    };

    const rotateSecondsHandsNormal = () => {
      const secondsClock = document.getElementById('seconds-clock');
      if (secondsClock) {
        secondsClock.style.transform = `rotate(${(scrollerIndex + 1) * 30}deg)`;
      }
      scrollerIndex = (scrollerIndex + 1) % projectItemsRef.current.length;
      initProjects();
    };

    initProjects();
    const clockInterval = setInterval(rotateSecondsHandsNormal, 5000);

    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  return (
    <>

    <div className="position-relative">
      <div className="filter-box-control">
        <div className="filter-box">
          {["Residental", "Commercial", "UrbanDesign + Planning", "Institution", "Hospitality", "Interior"].map((filter) => (
            <li key={filter} data-filter={filter.toLowerCase()}>
              {filter}
            </li>
          ))}
        </div>
      </div>

      <div id="projects-Scroller" ref={projectScrollerRef}>
        <div className="projects-main">
          
          {projects.map((project,index)=>(
            <div
              key={project.projectid}
              className="projects-items active"
              data-filter={project.category}
              ref={(el) => (projectItemsRef.current[index] = el)}
            >
              <div className="projects-items-controls">
                <div className="project-image-wrap">
                  <div className="wrap-box"></div>
                  <Link href={'/expertise/test'}>
                  <Image height={300} width={400} style={{maxWidth:'100%',height:'auto'}}  src={`${process.env.NEXT_PUBLIC_SITE_URL+project.project_image}`} alt={project.project_name} />
                  </Link>
                </div>
                <div className="project-item-content">
                  <h6>{project.description}</h6>
                  <h4>{project.project_name}</h4>
                </div>
              </div>
            </div>
            ))}
        </div>
      </div>
    </div>

    <div className="user-clock projects-clock">
        <div className="user-clock-control">
          <div className="user-hands user-clock-hour" style={{ opacity: '0' }}>
            <span></span>
          </div>
          <div
            id="seconds-clock"
            className="user-hands user-clock-seconds project-hands clock-paused"
          >
            <span></span>
          </div>
        </div>

        <div className="clock-indicator-box">
          {/* Rendering 12 clock indicators */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="clock-indicator"></div>
          ))}
        </div>

        <div className="clock-smallindicator-box"></div>
      </div>

   </>
          
  );
}
