'use client';
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from "@/app/context/AuthContext";
import dynamic from "next/dynamic";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { usePathname, useRouter, useSearchParams } from "next/navigation";


gsap.registerPlugin(ScrollToPlugin);

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
    function ReRouteIt() {
      if(isLoggedIn===false && path ==='/expertise' ){
        router.push(`/auth/login?route=${path}`);
      }
    }
  },[])
  

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(()=>{
    async function getProjectsAPI(){
      const fetchProjects = await fetch(`/api/get-projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        
        cache: 'no-store',
        revalidate:0, 
      });

      const getProjects = await (fetchProjects.json());
      
      setProjects(getProjects.projects);
      setCategories(getProjects.categories);
    }

    getProjectsAPI();

  },[]);



  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);


  const handleFilterChange = (filter) => {   
    setSelectedFilter(filter);
    setMobileFilter(false);
      gsap.to(window, {
        scrollTo: {
          y: 0, // Adjust scroll position, subtracting 100px as an offset
          autoKill: false,    // Auto-stop scrolling if the user interacts
        },
        duration: 0.6,  
        delay:0,      // Duration in seconds for the scroll
        ease: "power4.out",// Use ease for smooth scrolling
      });
  };

  useEffect(()=>{
    if(searchCatagories){
      handleFilterChange(searchCatagories);
    }
  },[])



  useEffect(() => {
    let lastScrollPos = undefined;
    let lastScrollTime = undefined;
    let touchStartY = 0;
    let scrollTimeout; // Variable to hold the timeout ID
  
    const wrapper = projectScrollerRef.current;
  
    const clamp = (value, min, max) => {
      return Math.max(min, Math.min(value, max));
    };
  
    const scaleDown = () => {
      if (wrapper) {
        // Scale the wrapper down to 0.5
        wrapper.style.transform = 'scale(0.8)';
      }
    };
  
    const resetScale = () => {
      if (wrapper) {
        // Reset the scale back to 1
        wrapper.style.transform = 'scale(1)';
      }
    };
  
    const onScroll = () => {
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
  
      let speed = dp / dt / 8; // Adjust divisor for better scaling
  
      // Clamp the speed between a minimum and maximum value
      speed = clamp(speed, 0.05, 1.5); // Adjust values to suit your needs
  
      // Scale the wrapper while scrolling
      scaleDown();
  
      // Set scroll position
      wrapper.style.setProperty("--scroll", `${window.scrollY}px`);
  
      // Clear any existing timeout to prevent immediate reset
      clearTimeout(scrollTimeout);
  
      // Set a new timeout to reset the scale after scrolling stops
      scrollTimeout = setTimeout(resetScale, 200); // Adjust the delay as needed
    };
  
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
  
    const onTouchMove = (e) => {
      if (!wrapper) return;
  
      const currentTouchY = e.touches[0].clientY;
      const dp = Math.abs(currentTouchY - touchStartY);
      const dt = performance.now() - lastScrollTime;
  
      lastScrollTime = performance.now();
      touchStartY = currentTouchY;
  
      let speed = dp / dt / 20; // Adjust divisor for better scaling
  
      // Clamp the speed between a minimum and maximum value
      speed = clamp(speed, 0.05, 1.5); // Adjust values to suit your needs
  
      // Scale the wrapper while touching
      scaleDown();
  
      wrapper.style.setProperty("--scroll", `${window.scrollY}px`);
  
      // Clear any existing timeout to prevent immediate reset
      clearTimeout(scrollTimeout);
  
      // Set a new timeout to reset the scale after touch stops
      scrollTimeout = setTimeout(resetScale, 200); // Adjust the delay as needed
    };
  
    // Add both scroll and touch event listeners
    window.addEventListener('scroll', onScroll);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
  
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      clearTimeout(scrollTimeout); // Clean up timeout on unmount
    };
  }, [projects]);
  
  
  



  

  // useEffect(() => {
  //   let isDragging = false;
  //   let startX, scrollLeft;

  //   const onMouseDown = (e) => {
  //     isDragging = true;
  //     startX = e.pageX - window.scrollX;
  //     scrollLeft = window.scrollX;
  //     // document.body.style.cursor = "grabbing";
  //     // document.body.style.userSelect = "none";
  //   };

  //   const onMouseMove = (e) => {
  //     if (!isDragging) return;
  //     e.preventDefault();
  //     const x = e.pageX - window.scrollX;
  //     const walk = (x - startX) * 2;
  //     window.scrollTo({ left: scrollLeft - walk, behavior: "auto" });
  //   };

  //   const onMouseUp = () => {
  //     isDragging = false;
  //     // document.body.style.cursor = "default";
  //     // document.body.style.removeProperty("user-select");
  //   };

  //   document.body.addEventListener("mousedown", onMouseDown);
  //   document.body.addEventListener("mousemove", onMouseMove);
  //   document.body.addEventListener("mouseup", onMouseUp);

  //   return () => {
  //     document.body.removeEventListener("mousedown", onMouseDown);
  //     document.body.removeEventListener("mousemove", onMouseMove);
  //     document.body.removeEventListener("mouseup", onMouseUp);
  //   };
  // }, [projects]);


  let tabIndex = 0;

  useEffect(() => {
    let scrollerIndex = 0;
    let isScrolling =false; 

    let timeoutId; 
    const handleScroll = () => {
      isScrolling=true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        updateScrollerIndex();
        isScrolling= false;
      }, 1000);
    };

    const handleTouchEnd = () => {
      isScrolling = false;
      updateScrollerIndex(); // Update the index when touch ends
    };

    document.addEventListener('wheel', handleScroll);
    document.addEventListener('touchstart', handleScroll);
    document.addEventListener('touchmove', handleScroll);
    // document.addEventListener('touchend', handleTouchEnd);
    
    const initProjects = () => {
      const allProjects = document.querySelectorAll('.projects-items.active');
      if (!allProjects.length) return;
  
      const currProject = allProjects[scrollerIndex] || allProjects[0];
      if (currProject && !isScrolling) {
        const targetY = currProject.offsetTop;
        gsap.to(window, {
          scrollTo: {
            y: targetY-100, // Adjust scroll position, subtracting 100px as an offset
            autoKill: false,    // Auto-stop scrolling if the user interacts
          },
          duration: 0.5,  
          delay:0,      // Duration in seconds for the scroll
          ease: "power4.out",// Use ease for smooth scrolling
        });
      }
    };
  
    

    function updateScrollerIndex() {
      const allProjects = document.querySelectorAll('.projects-items.active');
      const scrollPosition = window.scrollY;
  
      allProjects.forEach((project, index) => {
        const projectOffsetTop = project.offsetTop;
        const projectHeight = project.offsetHeight;
  
        if (
          scrollPosition >= projectOffsetTop - 100 &&
          scrollPosition < projectOffsetTop + projectHeight - 100
        ) {
          scrollerIndex = index; // Update scrollerIndex
        }
      });
    }
    
    let lastScrollerIndex = -1;
    const rotateSecondsHandsNormal = () => {
      scrollerIndex = (scrollerIndex + 1) % projectItemsRef.current.length;
      while (scrollerIndex === lastScrollerIndex) {
        scrollerIndex = (scrollerIndex + 1) % projectItemsRef.current.length;
      }
  
      lastScrollerIndex = scrollerIndex;
        initProjects();
    };
    
  
  
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
  
        const offset = 1;
  
        const isOverlapping = !(
          secondsClockRect.right < spanRect.left - offset ||
          secondsClockRect.left > spanRect.right + offset ||
          secondsClockRect.bottom < spanRect.top - offset ||
          secondsClockRect.top > spanRect.bottom + offset
        );
  
        if (isOverlapping && !spanParent.classList.contains('active')) {
          tabIndex = index;
          spanParent.classList.add('active');
          
          rotateSecondsHandsNormal();
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
      window.removeEventListener('scroll', updateScrollerIndex);
      clearTimeout(timeoutId); // Clear timeout on cleanup
      document.removeEventListener('wheel', handleScroll); 
      document.removeEventListener('touchstart', handleScroll);
      document.removeEventListener('touchmove', handleScroll);
      // document.removeEventListener('touchend', handleTouchEnd);

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

  useEffect(() => {
    // Function to handle fullscreen changes
    const handleFullscreenChange = () => {
      // Update GSAP ScrollTrigger points
      ScrollTrigger.refresh();
    };

    // Add event listener for fullscreen change
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari
    document.addEventListener('mozfullscreenchange', handleFullscreenChange); // Firefox
    document.addEventListener('MSFullscreenChange', handleFullscreenChange); // IE/Edge

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []); // Empty dependency array to run once on mount




  return (
    <>
    <div class="filter-launch" onClick={toggleMobileFilter}>
      {mobileFilter?<IoCloseOutline />:<BsThreeDots />}
    </div>
    
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
      <div className="project-overflow">
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
                  <h4>{project.project_name}</h4>
                  <h6>{project.description}</h6>
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