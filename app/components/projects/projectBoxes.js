'use client';
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";



export default function ProjectBoxes() {
  const projectScrollerRef = useRef(null);
  const projectItemsRef = useRef([]);
  const [indiIndex,setIndiIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [categories,setCategories] = useState([]);
  const [projects,setProjects] = useState([]);
  const [mobileFilter,setMobileFilter] =useState(false);

  const isTouchDevice = useRef(window.matchMedia("(pointer: coarse)").matches);

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(()=>{
    async function getProjectsAPI(){

      const fetchProjects = await fetch('/api/get-projects',{method:'GET',headers: {'Content-Type': 'application/json',}});
      const getProjects = await (fetchProjects.json());
      
      setProjects(getProjects.projects);
      console.log(projects)

      setCategories(getProjects.categories);
    }

    getProjectsAPI();

  },[]);



  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);


  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };







  useEffect(() => {

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
    if (isTouchDevice.current) return; // Skip dragging logic on touch devices

    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    const onMouseDown = (e) => {
      isDragging = true;
      startX = e.pageX - window.scrollX;
      startY = e.pageY - window.scrollY;
      scrollLeft = window.scrollX;
      scrollTop = window.scrollY;
      document.body.style.cursor = "grabbing";
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - window.scrollX;
      const y = e.pageY - window.scrollY;
      const walkX = (x - startX) * 2; // Example value; adjust as needed
      const walkY = (y - startY) * 2; // Example value; adjust as needed
      window.scrollTo({
        left: scrollLeft - walkX,
        top: scrollTop - walkY,
        behavior: "auto"
      });
    };

    const onMouseUp = () => {
      isDragging = false;
      document.body.style.cursor = "default";
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
    if (!isTouchDevice.current) return; // Skip touch logic on non-touch devices

    let startX, startY, scrollLeft, scrollTop;

    const onTouchStart = (e) => {
      startX = e.touches[0].pageX - window.scrollX;
      startY = e.touches[0].pageY - window.scrollY;
      scrollLeft = window.scrollX;
      scrollTop = window.scrollY;
    };

    const onTouchMove = (e) => {
      if (!startX || !startY) return; // If no start position, return
      const x = e.touches[0].pageX - window.scrollX;
      const y = e.touches[0].pageY - window.scrollY;
      const walkX = (x - startX) * 2; // Adjust multiplier as needed
      const walkY = (y - startY) * 2; // Adjust multiplier as needed
      window.scrollTo({
        left: scrollLeft - walkX,
        top: scrollTop - walkY,
        behavior: "auto"
      });
    };

    const onTouchEnd = () => {
      startX = null;
      startY = null;
    };

    document.body.addEventListener("touchstart", onTouchStart);
    document.body.addEventListener("touchmove", onTouchMove);
    document.body.addEventListener("touchend", onTouchEnd);

    return () => {
      document.body.removeEventListener("touchstart", onTouchStart);
      document.body.removeEventListener("touchmove", onTouchMove);
      document.body.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice.current) return; // Skip smooth scroll logic on touch devices

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
      const allProjects = document.querySelectorAll('.projects-items.active');
      if (!allProjects.length) return;

      const currProject = allProjects[scrollerIndex] || allProjects[0];
      if (currProject) {
        smoothScroll(currProject.offsetTop - 100, 100);
      }
    };

    const rotateSecondsHandsNormal = () => {
      scrollerIndex = (scrollerIndex + 1) % projectItemsRef.current.length;
      initProjects();
    };

    initProjects();
    const clockInterval = setInterval(rotateSecondsHandsNormal, 5000);

    function updateScrollerIndex() {
      const allProjects = document.querySelectorAll('.projects-items.active');
      const scrollPosition = window.scrollY;

      allProjects.forEach((project, index) => {
        const projectOffsetTop = project.offsetTop;
        const projectHeight = project.offsetHeight;

        if (scrollPosition >= projectOffsetTop - 100 && scrollPosition < projectOffsetTop + projectHeight - 100) {
          scrollerIndex = index;
        }
      });
    }

    window.addEventListener('scroll', updateScrollerIndex);

    return () => {
      clearInterval(clockInterval);
      window.removeEventListener('scroll', updateScrollerIndex);
    };
  }, []);

  const toggleMobileFilter = () =>{
    setMobileFilter(!mobileFilter);
  }


  return (
    <>
    <div class="filter-launch" onClick={toggleMobileFilter}>
      {mobileFilter?<IoCloseOutline />:<BsThreeDots />}
    </div>
    <div className="position-relative">
      <div className={mobileFilter?'filter-box-control active':'filter-box-control'}>
        <div className="filter-box signifier">
          <li data-filer="All" className={selectedFilter === 'All' ? 'selected' : ''}  onClick={() => handleFilterChange('All')}>All</li>
          {categories.map((filter,index) => (
            <li key={index}  className={selectedFilter === filter.category ? 'selected' : ''} data-filter={filter.category} onClick={() => handleFilterChange(filter.category)}>
              {filter.category}
            </li>
          ))}
        </div>
      </div>

      <div id="projects-Scroller" ref={projectScrollerRef}>
        <div className="projects-main">
          
          {filteredProjects.map((project,index)=>(
            <div
              key={project.projectid}
              className="projects-items active"
              data-filter={project.category}
              ref={(el) => (projectItemsRef.current[index] = el)}
            >
              <div className="projects-items-controls">
                <div className="project-image-wrap">
                  <div className="wrap-box"></div>
                  <Link href={`/expertise/${project.url_slug}`}>
                  <Image height={300} width={400} style={{maxWidth:'100%',height:'auto'}} placeholder='blur' blurDataURL="/images/white-blur.png"   src={`${process.env.NEXT_PUBLIC_SITE_URL+project.thumbnail}`} alt={project.project_name} />
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


   </>
          
  );
}