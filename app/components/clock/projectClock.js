'use client'

import { useEffect, useRef } from "react";
import '../../projects.css';
import gsap from "gsap";

export default function ProjectClock() {
  const clockIndicators = useRef([]);
  const clockMainIndicators = useRef([]);

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

    // Animate the second hand using GSAP
    // const secondsHand = document.querySelector('#seconds-clock');

    // const animateSecondsHand = () => {
    //   gsap.to(secondsHand, {
    //     rotate: "+=360",   // Incrementally rotate the second hand by 360 degrees
    //     duration: 60,      // Complete the rotation in 60 seconds
    //     ease: "linear",    // Use a linear easing for smooth rotation
    //     repeat: -1,         // Infinite repeat for continuous rotation
    //   });
    // };

    // animateSecondsHand();

  }, []);

  const usermainClockRef = useRef(null);
  let scrollerClockIndex = 0;

  useEffect(()=>{
    const handleWheel = (e) => {
      const scrollSpeedFactor = 0.03; 

      const rotationClock = e.deltaY * scrollSpeedFactor;
      scrollerClockIndex += rotationClock;
      usermainClockRef.current.style.transform = `rotate(${scrollerClockIndex}deg)`;   
    };

    // Add wheel event listener
    window.addEventListener('wheel', handleWheel);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };

  },[]);


  let tabIndex = 0;

  useEffect(() => {
    const checkOverlap = () => {
      const secondsClock = document.getElementById('clock-bound-box');
      const indicators = clockIndicators.current;
  
      if (!secondsClock || !indicators.length) return;
  
      // Get bounding box of the rotating seconds hand
      const secondsClockRect = secondsClock.getBoundingClientRect();
  
      indicators.forEach((indicator,index) => {
        // Get the bounding box of the span inside each clock-indicator
        const spanElement = indicator;
        const spanParent = clockMainIndicators.current[index];
        if (!spanElement) return;
  
        const spanRect = spanElement.getBoundingClientRect();
  
        // Collision detection with a 1px offset
        const offset = 1; // 1px offset for detection
  
        const isOverlapping = !(
          secondsClockRect.right < spanRect.left - offset ||
          secondsClockRect.left > spanRect.right + offset ||
          secondsClockRect.bottom < spanRect.top - offset ||
          secondsClockRect.top > spanRect.bottom + offset
        );
  
        if (isOverlapping) {
          tabIndex=index;
          spanParent.classList.add('active');
        } else {
          spanParent.classList.remove('active');
        }

        clockMainIndicators.current[tabIndex].classList.add('active');
      });
    };
  
    // Use requestAnimationFrame for smoother updates
    const handleUpdate = () => {
      requestAnimationFrame(checkOverlap);
    };

    handleUpdate();
    const intervalId = setInterval(handleUpdate, 100);

    return () => clearInterval(intervalId);

    
  }, []);

  const secondsClock = useRef(null);
  useEffect(()=>{
    if(secondsClock.current){
      secondsClock.current.classList.remove('clock-paused');
    }
  },[])
  

  return (
    <>
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
