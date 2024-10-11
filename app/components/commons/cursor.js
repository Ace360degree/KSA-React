'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { TweenMax } from 'gsap/all';
import { HiOutlineUser } from "react-icons/hi2";
import Link from 'next/link';
import { useAuth } from "@/app/context/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";
import { GrPowerForceShutdown } from "react-icons/gr";
import { GrPowerShutdown } from "react-icons/gr";
import { usePathname, useRouter } from 'next/navigation';





gsap.registerPlugin(ScrollTrigger);

export default function CursorAudio() {
  const path = usePathname();

  const audioRef = useRef(null); // Ref to access the audio element
  const playSVGRef = useRef(null); // Ref for play SVG icon
  const pauseSVGRef = useRef(null); // Ref for pause SVG icon
  const bigCursorRef = useRef(null); // Ref for big cursor
  const smCursorRef = useRef(null); // Ref for small cursor
  const [isTouchscreen, setIsTouchscreen] = useState(false);
  const { isLoggedIn } = useAuth();
  
  const [cursorStatus,setcursorStatus] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false); // State to manage play/pause

  // Function to toggle play/pause
  const toggleAudio = () => {
    const mainAudio = audioRef.current;
    if (mainAudio.paused) {
      mainAudio.play();
      setIsPlaying(true);
    } else {
      mainAudio.pause();
      setIsPlaying(false);
    }
  };

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
  }, []); 

  // Function to request fullscreen
  const requestFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  };

  useEffect(() => {
    const mainAudio = audioRef.current;

    // Function to play audio conditionally
    const playAudioConditionByInteraction = () => {
      mainAudio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Unable to play the audio, User has not interacted yet.');
      });
    };

    playAudioConditionByInteraction();

    // Set up an event listener to play audio on user interaction
    const handleUserInteraction = () => {
      playAudioConditionByInteraction();
      // setTimeout(()=>{
      //   requestFullscreen();
      // },0);
    //  // Request fullscreen on user interaction
      document.removeEventListener('click', handleUserInteraction); // Remove listener once audio starts
    };

    
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('keydown', event => {
      // Check if the F12 key is pressed
      if (event.key === 'F12') {
          event.preventDefault(); // Prevent the default action (opening Developer Tools)
      }
  });

    document.addEventListener('click', handleUserInteraction); // Set up listener on document click

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    const bigCursor = bigCursorRef.current;
    const smCursor = smCursorRef.current;
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    // Animation loop for cursor movement
    gsap.to({}, 0.016, {
      repeat: -1,
      onRepeat: function () {
        posX += (mouseX - posX) / 8;
        posY += (mouseY - posY) / 8;

        gsap.set(bigCursor, {
          css: {
            left: posX - 10,
            top: posY - 10,
          },
        });

        gsap.set(smCursor, {
          css: {
            left: mouseX - 2,
            top: mouseY - 2,
          },
        });
      },
    });

    const handleMouseMove = (e) => {
      bigCursor.classList.remove('hidden-cs');
      smCursor.classList.remove('hidden-cs');
      mouseX = e.clientX;
      mouseY = e.clientY;

      const cursorIsPointer = window.getComputedStyle(e.target).cursor ===
        'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/yiH2YIAAAAASUVORK5CYII="), pointer';

      if (cursorIsPointer) {
        bigCursor.classList.add('sm-cs');
      } else {
        bigCursor.classList.remove('sm-cs');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  useEffect(() => {
    // Method 1: Using matchMedia to detect coarse pointer (touch devices)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    // Method 2: Check for touch events to confirm touch support
    const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
    // Set initial state for touchscreen devices
    if (isTouchDevice || hasTouchSupport) {
      setIsTouchscreen(true);
    }
  
    // Detect touch input interaction
    const onTouchStart = () => {
      setIsTouchscreen(true);
      setcursorStatus(false); // Set cursorStatus to false when touch is detected
    };
  
    // Detect mouse input interaction
    const onMouseMove = () => {
      setIsTouchscreen(false);
      setcursorStatus(true); // Set cursorStatus to true when mouse movement is detected\
    };
  
    // Add event listeners for touch and mouse interactions
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('mousemove', onMouseMove);
  
    // Cleanup event listeners when component unmounts
   
  }, []);
  




  return (
    <>
      <audio ref={audioRef} id="mainAudio" autoPlay loop>
        <source src="/audio/main-audio.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Link href={`/auth/${isLoggedIn?`logout?route=${path}`:`login?route=${path}`}`}><div className='auth-icon-box slide-up change-svg'>
        {isLoggedIn? <GrPowerForceShutdown /> :  <GrPowerShutdown className='shutdown' /> }
        
      </div></Link>

      <div className="audio-box change-svg slide-up" onClick={toggleAudio}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" viewBox="0 0 24 24">
          {/* Toggle visibility based on state */}
          <path
            id="music-on-icon"
            ref={playSVGRef}
            className={isPlaying ? '' : 'd-none'}
            d="M18.586 10.081c-1.439 0-1.35 2.802-2.029 4.071-.114.211-.425.184-.5-.044-.771-2.364-.419-8.108-2.51-8.108-2.189 0-1.648 7.433-2.5 10.462-.063.23-.381.25-.474.028-.9-2.161-.799-6.875-2.502-6.875-1.762 0-1.612 3.949-2.302 5.54-.091.213-.392.22-.493.01-.503-1.049-.664-3.165-2.564-3.165h-2.213c-.275 0-.499.224-.499.499s.224.501.499.501h2.213c1.572 0 1.038 3.484 2.854 3.484 1.684 0 1.502-3.79 2.223-5.47.088-.208.382-.202.466.006.805 2.047.79 6.98 2.641 6.98 2.077 0 1.337-7.856 2.443-10.621.083-.211.384-.222.479-.012 1.029 2.25.487 8.126 2.344 8.126 1.639 0 1.737-2.706 2.23-4.038.081-.212.373-.227.474-.027.516 1.001.846 2.572 2.4 2.572h2.235c.275 0 .499-.224.499-.499 0-.276-.224-.5-.499-.5h-2.235c-1.323 0-1.117-2.92-2.68-2.92z"
          />
          <line
            id="music-off-icon"
            ref={pauseSVGRef}
            className={isPlaying ? 'd-none' : ''}
            x1="0"
            y1="12"
            x2="28"
            y2="12"
            stroke="black"
            strokeWidth="1"
          />
        </svg>
        
      </div>

      {isTouchscreen && !cursorStatus ?'':
      <>
      <div className="cursor-lg" ref={bigCursorRef}></div>
      <div className="cursor-sm" ref={smCursorRef}></div>
      </>
      }

    </>
  );
}
