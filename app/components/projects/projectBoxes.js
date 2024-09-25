'use client';
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function ProjectBoxes() {

  const clockIndicators = useRef([]);
  const clockMainIndicators = useRef([]);

  const projectScrollerRef = useRef(null);
  const projectItemsRef = useRef([]);
  const [indiIndex,setIndiIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [categories,setCategories] = useState([]);
  const [projects,setProjects] = useState([]);
  const [mobileFilter,setMobileFilter] =useState(false);
  
  const router  = useRouter();
  const searchParams = useSearchParams();
  const searchCatagories = searchParams.get('category');

  const path = usePathname();
  
  const { isLoggedIn } = useAuth();

  gsap.ticker.lagSmoothing(false);

  useEffect(()=>{
    window.onscroll = function() {
      if(projectScrollerRef.current){
      if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
          // Call your function here
          ReRouteIt();
      }
    }
    };
    console.log(isLoggedIn);
    function ReRouteIt() {
      if(isLoggedIn===false && path ==='/expertise' ){
        router.push('/auth/login')
      }
    }
  },[])
  

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

  useEffect(()=>{
    if(searchCatagories){
      handleFilterChange(searchCatagories);
    }
  },[])



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

      const speed = dp / dt / 15;
      const clampedSpeed = Math.min(speed, 4);

      wrapper.style.setProperty("--speed", clampedSpeed + 0.01);
      wrapper.style.setProperty("--scroll", `${window.scrollY + windowHeight - 100}px`);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [projects]);

  useEffect(() => {
    let isDragging = false;
    let startX, scrollLeft;

    const onMouseDown = (e) => {
      isDragging = true;
      startX = e.pageX - window.scrollX;
      scrollLeft = window.scrollX;
      // document.body.style.cursor = "grabbing";
      // document.body.style.userSelect = "none";
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
      // document.body.style.cursor = "default";
      // document.body.style.removeProperty("user-select");
    };

    document.body.addEventListener("mousedown", onMouseDown);
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp);

    return () => {
      document.body.removeEventListener("mousedown", onMouseDown);
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    };
  }, [projects]);


  let tabIndex = 0;

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

      window.scrollTo(100, scrollPosition);

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
      smoothScroll(currProject.offsetTop - 50, 100);
    }
  };

  const rotateSecondsHandsNormal = () => {
    scrollerIndex = (scrollerIndex + 1) % projectItemsRef.current.length;
    initProjects();
  };
  initProjects();

  function updateScrollerIndex() {
    const allProjects = document.querySelectorAll('.projects-items.active');
    const scrollPosition = window.scrollY; // Current scroll position

    allProjects.forEach((project, index) => {
      const projectOffsetTop = project.offsetTop;
      const projectHeight = project.offsetHeight;

      if (
        scrollPosition >= projectOffsetTop - 100 &&
        scrollPosition < projectOffsetTop + projectHeight - 100
      ) {
        scrollerIndex = index; // Update scrollerIndex to the current project
      }
    });
  }

  window.addEventListener('scroll', updateScrollerIndex);

  const checkOverlap = () => {
    const secondsClock = document.getElementById('clock-bound-box');
    const indicators = clockIndicators.current;

    if (!secondsClock || !indicators.length) return;

    const secondsClockRect = secondsClock.getBoundingClientRect();

    indicators.forEach((indicator, index) => {
      const spanElement = indicator;
      const spanParent = clockMainIndicators.current[index];
      if (!spanElement) return;

      const spanRect = spanElement.getBoundingClientRect();

      const offset = 1; // 1px offset for detection

      const isOverlapping = !(
        secondsClockRect.right < spanRect.left - offset ||
        secondsClockRect.left > spanRect.right + offset ||
        secondsClockRect.bottom < spanRect.top - offset ||
        secondsClockRect.top > spanRect.bottom + offset
      );

      if (isOverlapping && !spanParent.classList.contains('active')) {
        tabIndex = index;
        spanParent.classList.add('active');
        rotateSecondsHandsNormal(); // Trigger function when class changes
      } else if (!isOverlapping && spanParent.classList.contains('active')) {
        spanParent.classList.remove('active');
      }
    });

    clockMainIndicators.current[tabIndex].classList.add('active');
  };

  const handleUpdate = () => {
    requestAnimationFrame(checkOverlap);
  };

  handleUpdate();
  const intervalId = setInterval(handleUpdate, 100);

  return () => {
    clearInterval(intervalId);
    window.removeEventListener('scroll', updateScrollerIndex); // Clean up scroll event listener
  };
}, [projects]);


  const toggleMobileFilter = () =>{
    setMobileFilter(!mobileFilter);
  }



  useEffect(() => {
    // Select clock indicator box and clock dots
    const clockIndicatorBox = document.querySelector('.clock-indicator-box');
    const clockDots = clockIndicatorBox.querySelectorAll('.clock-indicator');
    const clockDotsLength = clockDots.length;

    // Set the rotation for each dot
    const numToDivide = 360 / clockDotsLength;
    clockDots.forEach((dot, index) => {
      dot.style.transform = `rotate(${numToDivide * index}deg)`;
    });

    // Select the small indicator box
    const smallIndicatorBox = document.querySelector('.clock-smallindicator-box');

    // Add 360 small indicators dynamically
    for (let i = 1; i <= 360; i++) {
      const smallIndicator = document.createElement('div');
      smallIndicator.className = 'clock-smallindicator';
      smallIndicator.style.transform = `rotate(${i}deg)`;
      smallIndicatorBox.appendChild(smallIndicator);
    }

  }, []);



  const usermainClockRef = useRef(null);
  let scrollerClockIndex = 0;
  let touchStartY = 0;
  
  useEffect(() => {
    const scrollSpeedFactor = 0.03; 
  
    const handleWheel = (e) => {
      const rotationClock = e.deltaY * scrollSpeedFactor;
      scrollerClockIndex += rotationClock;
      usermainClockRef.current.style.transform = `rotate(${scrollerClockIndex}deg)`;   
    };
  
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
  
    const handleTouchMove = (e) => {
      const touchMoveY = e.touches[0].clientY;
      const deltaY = touchStartY - touchMoveY;
      const rotationClock = deltaY * scrollSpeedFactor;
      scrollerClockIndex += rotationClock;
      usermainClockRef.current.style.transform = `rotate(${scrollerClockIndex}deg)`;
      touchStartY = touchMoveY;  // Update touchStartY for continuous rotation
    };
  
    // Add wheel and touch event listeners
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
  
    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  
  }, []);
  
  
  
  useEffect(() => {
    // const checkOverlap = () => {
    //   const secondsClock = document.getElementById('clock-bound-box');
    //   const indicators = clockIndicators.current;
  
    //   if (!secondsClock || !indicators.length) return;
  
    //   // Get bounding box of the rotating seconds hand
    //   const secondsClockRect = secondsClock.getBoundingClientRect();
  
    //   indicators.forEach((indicator, index) => {
    //     // Get the bounding box of the span inside each clock-indicator
    //     const spanElement = indicator;
    //     const spanParent = clockMainIndicators.current[index];
    //     if (!spanElement) return;
  
    //     const spanRect = spanElement.getBoundingClientRect();
  
    //     // Collision detection with a 1px offset
    //     const offset = 1; // 1px offset for detection
  
    //     const isOverlapping = !(
    //       secondsClockRect.right < spanRect.left - offset ||
    //       secondsClockRect.left > spanRect.right + offset ||
    //       secondsClockRect.bottom < spanRect.top - offset ||
    //       secondsClockRect.top > spanRect.bottom + offset
    //     );
  
    //     if (isOverlapping) {
    //       tabIndex = index;
    //       spanParent.classList.add('active');
    //     } else {
    //       spanParent.classList.remove('active');
    //     }
  
    //     clockMainIndicators.current[tabIndex].classList.add('active');
    //   });
    // };
  
    // // Use requestAnimationFrame for smoother updates
    // const handleUpdate = () => {
    //   requestAnimationFrame(checkOverlap);
    // };
  
    // handleUpdate();
    // const intervalId = setInterval(handleUpdate, 100);
  
    // return () => clearInterval(intervalId);
  
  }, []);
  
  const secondsClock = useRef(null);
  useEffect(() => {
    if (secondsClock.current) {
      secondsClock.current.classList.remove('clock-paused');
    }
  }, []);





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



    <div className="user-clock projects-clock" >
        <div className="user-clock-control" ref={usermainClockRef} style={{transition:'all 0.3s ease'}}>
          <div className="user-hands user-clock-hour" style={{ opacity: '0' }}>
            <span></span>
          </div>
          <div
            id="seconds-clock"
            className="user-hands user-clock-seconds project-hands clock-paused"
            ref={secondsClock}
          >
            <span></span>
            <em id="clock-bound-box"></em>
          </div>
        </div>

        <div className="clock-indicator-box">
          {/* Rendering 12 clock indicators */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="clock-indicator" ref={(el)=>(clockMainIndicators.current[index]=el)}>
              <span >
                <em  ref={(el)=>(clockIndicators.current[index] = el)}></em>
              </span>
            </div>
          ))}
        </div>

        <div className="clock-smallindicator-box"></div>
      </div>


   </>
          
  );
}