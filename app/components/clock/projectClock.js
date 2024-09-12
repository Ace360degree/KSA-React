'use client'

import { useEffect, useRef } from "react";
import '../../projects.css';
import gsap from "gsap";

export default function ProjectClock() {
  const clockIndicators = useRef([]);

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
    const secondsHand = document.querySelector('#seconds-clock');

    const animateSecondsHand = () => {
      gsap.to(secondsHand, {
        rotate: "+=360",   // Incrementally rotate the second hand by 360 degrees
        duration: 60,      // Complete the rotation in 60 seconds
        ease: "linear",    // Use a linear easing for smooth rotation
        repeat: -1         // Infinite repeat for continuous rotation
      });
    };

    animateSecondsHand();

  }, []);

  useEffect(() => {
    const checkOverlap = () => {
      const highlightElement = (element, color = 'red') => {
        const rect = element.getBoundingClientRect();
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.left = `${rect.left}px`;
        overlay.style.top = `${rect.top}px`;
        overlay.style.width = `${rect.width}px`;
        overlay.style.height = `${rect.height}px`;
        overlay.style.border = `2px solid ${color}`;
        overlay.style.pointerEvents = 'none';  // So it doesn't interfere with interactions
        overlay.style.zIndex = '10000';  // Make sure it's on top of everything
        document.body.appendChild(overlay);
    
        console.log('Bounding Client Rect:', rect);
    
        // Optionally remove the overlay after a few seconds
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 3000);
      };
    
      const secondsClockBound = document.getElementById('clock-bound-box');
      if (secondsClockBound) {
        highlightElement(secondsClockBound);
      }

      const secondsClock = document.getElementById('clock-bound-box');
      const indicators = clockIndicators.current;
  
      if (!secondsClock || !indicators.length) return;
  
      // Get bounding box of the rotating seconds hand
      const secondsClockRect = secondsClock.getBoundingClientRect();
  
      indicators.forEach((indicator) => {
        // Get the bounding box of the span inside each clock-indicator
        const spanElement = indicator;
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
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    };
  
    // Use requestAnimationFrame for smoother updates
    const handleScroll = () => {
      requestAnimationFrame(checkOverlap);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  return (
    <>
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
            <em id="clock-bound-box"></em>
          </div>
        </div>

        <div className="clock-indicator-box">
          {/* Rendering 12 clock indicators */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="clock-indicator">
              <span >
                <em ref={(el)=>(clockIndicators.current[index] = el)}></em>
              </span>
            </div>
          ))}
        </div>

        <div className="clock-smallindicator-box"></div>
      </div>
    </>
  );
}
