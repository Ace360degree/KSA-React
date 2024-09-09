'use client';
import { useEffect, useRef } from "react";
import UserClock from "../commons/userClock";
import Link from "next/link";

export default function HomeMenu() {
  useEffect(() => {
    const updateClock = () => {
      const hoursHand = document.querySelectorAll(".user-clock-hour");
      const currentDate = new Date();
      const currentHour = currentDate.getHours() % 12;
      const currentMinute = currentDate.getMinutes();
      const minuteProcessed = currentMinute / 2;

      hoursHand.forEach((obj) => {
        obj.style.transform = `rotate(${currentHour * 30 + minuteProcessed}deg)`;
      });
    };

    updateClock();
    const interval = setInterval(updateClock, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    let hoverTitles = document.querySelectorAll('.hover-titles');
    
    hoverTitles.forEach(function(titles,index){
        let currentTitles = titles.getAttribute('data-text');
        let titlesArray = currentTitles.split(',');
        let textNum = 1;
        let intervalId; 
        
        
        function hoverTitleAnimation(){
                
                intervalId = setInterval(function(){
                    titles.innerHTML = titlesArray[textNum];
                    textNum = (textNum + 1) % titlesArray.length;
                },600);
        }
        
        function stopHoverAnimation() {
            clearInterval(intervalId); // Clear the interval
        }
        
        titles.addEventListener('mouseover', function(){
            
            stopHoverAnimation();
        });
        
        titles.addEventListener('mouseout', function(){
            hoverTitleAnimation();
        });
        hoverTitleAnimation();
    })
  },[])  

    const clickHandle= (elm)=>{
        elm.parentElement.classList.toggle('active');
        let dataMenuTraget = elm.getAttribute('data-target');
        let TargetMenu = document.querySelector(dataMenuTraget);
        TargetMenu.classList.toggle('active');
        checkMenuScreen();
        menuAnimation(TargetMenu);
    }  

    const menuAnimation = (elem)=>{
      
        let linksItems = elem.querySelectorAll('li');
        console.log(linksItems);
        linksItems.forEach((link,index)=>{
            setTimeout(()=>{
              link.classList.toggle('active');
            },100*index)
        })
    }

    const checkMenuScreen=()=>{
      let anyMenuActive = Array.from(document.querySelectorAll('.menu-screen')).some(menu => menu.classList.contains('active'));
      let TitlesBox = document.querySelector('.home-content-control');
      // Toggle hide class on TitlesBox only if no menu screen is active
      if (!anyMenuActive) {
          TitlesBox.classList.remove('hide');
      } else {
          TitlesBox.classList.add('hide');
      }
    }

    const menuLinks = document.querySelectorAll('.menu-link-li');

    const linkHover = (link)=>{
      dimMenus();
      // removeCurrentDim(link);
    }

    const linkOut = ()=>{
      dimMenusReset();
    }
    

    const dimMenus = ()=>{
      menuLinks.forEach((link)=>{
        link.classList.add('dim');
      })
    }

    const dimMenusReset = ()=>{
      menuLinks.forEach((link)=>{
        link.classList.remove('dim');
      })
    }
    
    const removeCurrentDim =(elm)=>{
      elm.classList.remove('dim');
    }
  


  return (
    <>
      <UserClock />
      <div className="h-100">
        <div className="home-content-control">
          <div className="home-content">
            <h4 className="hero-sub">We Are</h4>
            <h2
              className="hero-title hover-titles"
              data-text="Loud,Bold,Fearless,Intense,Awesome"
            >
              Loud
            </h2>
          </div>
          <div></div>
          <div className="home-content">
            <h4 className="hero-sub">It's time to</h4>
            <h2
              className="hero-title hover-titles"
              data-text="Create,Innovate,Inspire,Discover,Thoughtful,Curious,Unique,Timeless"
            >
              Create
            </h2>
          </div>
        </div>
      </div>
      <div className="side-menu left" id="leftmenutrigger">
        <div
          className="menu-icon"
          data-target="#leftMenu"
          onClick={(e)=>{clickHandle(e.currentTarget)}}
        >
          <div className="menu-circles">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="side-menu right" id="rightmenutrigger">
        <div
          className="menu-icon"
          data-target="#rightMenu"
          onClick={(e)=>{clickHandle(e.currentTarget)}}
        >
          <div className="menu-circles">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div>
        <div
          className="menu-screen"
          id="leftMenu"
          data-target="#leftmenutrigger"
        >
          <div className="menu-link">
              <li className="menu-link-li" onMouseEnter={(e)=>{linkHover(e.currentTarget)}} onMouseLeave={linkOut}>
                <Link href={'/about'}><span>About</span></Link>
              </li>
              <li className="menu-link-li" onMouseEnter={(e)=>{linkHover(e.currentTarget)}}  onMouseLeave={linkOut}>
              <Link href={'/contact'}><span>Contact</span></Link>
              </li>
          </div>
        </div>
        <div
          className="menu-screen"
          id="rightMenu"
          data-target="#rightmenutrigger">
          <div className="menu-link">
              <li className="menu-link-li" onMouseEnter={(e)=>{linkHover(e.currentTarget)}} onMouseLeave={linkOut}>
              <Link href={'/expertise'}><span>Expertise</span></Link>
              </li>
              <li className="menu-link-li" onMouseEnter={(e)=>{linkHover(e.currentTarget)}} onMouseLeave={linkOut}>
              <Link href={'/ideas'}><span>Ideas</span></Link>
              </li>
          </div>
        </div>
      </div>
    </>
  );
}
