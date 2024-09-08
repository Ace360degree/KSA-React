'use client'

import { useEffect } from "react";
import '../../projects.css';
import gsap from "gsap";

export default function ProjectClock() {

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

    // Timeline for adding and removing the active class to each clock indicator
    const timeline = gsap.timeline({ repeat: -1 }); // Repeat infinitely
    
    // Add `active` class to each clock indicator in a staggered manner every 5 seconds
    timeline.to(clockDots, {
      className: "+=active", // Add the active class
      stagger: 5, // Apply this to each element every 5 seconds
      duration: 1, // Duration of the effect on each indicator
      onComplete: function() {
        // Remove `active` class after 5 seconds to simulate toggle effect
        gsap.to(clockDots, {
          className: "-=active", 
          delay: 5 // Wait 5 seconds before removing `active`
        });
      }
    });

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
