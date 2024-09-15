import { useEffect, useRef, useState } from 'react';
import { TweenMax } from 'gsap/gsap-core';
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";


export default function SliderCursor(){

    const [arrowIcon,setArrowIcon] =useState('left');  
    
  useEffect(()=>{

    

    const sliderCursor = document.querySelector('.slider-cursor');
    const sliderIcon = document.querySelector('.slider-cursor-icon');
    var posX = 0,
        posY = 0;
    
    var mouseX = 0,
        mouseY = 0;
    
    TweenMax.to({}, 0.016, {
      repeat: -1,
      onRepeat: function() {
        posX += (mouseX - posX) / 8;
        posY += (mouseY - posY) / 8;
        
        TweenMax.set(sliderCursor, {
            css: {    
            left: posX - 24,
            top: posY - 24
            }
        });
        
        TweenMax.set(sliderIcon, {
            css: {    
            left: mouseX - 12,
            top: mouseY - 18,
            }
        });
      }
    });
    
    document.addEventListener("mousemove", function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

        function onEnterShow(){
            document.querySelector('.cursor-lg').classList.add('hide-cs');
           document.querySelector('.cursor-sm').classList.add('hide-cs');
           
           document.querySelector('.slider-cursor').classList.add('show-cursor');
           document.querySelector('.slider-cursor-icon').classList.add('show-cursor');
        }
        
        function onLeaveHide(){
            document.querySelector('.cursor-lg').classList.remove('hide-cs');
           document.querySelector('.cursor-sm').classList.remove('hide-cs');
           
           document.querySelector('.slider-cursor').classList.remove('show-cursor');
           document.querySelector('.slider-cursor-icon').classList.remove('show-cursor');
        }
            
      
        let rightArrow = document.querySelector('.splide__arrow--prev');    
        let leftArrow = document.querySelector('.splide__arrow--next');
        
      if(rightArrow){
      //   Left Side
      rightArrow.addEventListener('mouseenter',function(){
        onEnterShow();
        setArrowIcon('right'); 
      });
      rightArrow.addEventListener('mouseleave',function(){
        onLeaveHide();
        setArrowIcon('right');
      });

      //   Right Side
      leftArrow.addEventListener('mouseenter',function(){
        setArrowIcon('left');
        onEnterShow();
      });
      leftArrow.addEventListener('mouseleave',function(){
        setArrowIcon('left');
        onLeaveHide();
      });

        }  


    },[]);


    return(
    <>

          {/* Slider Cursor */}
          <div className="slider-cursor"></div>
        <div className="slider-cursor-icon fa-solid">
            {arrowIcon=='left'?  
              <BsArrowRightShort  height={30} width={30} />
              : 
              <BsArrowLeftShort height={30} width={30} />
            } 

        </div>
        {/* Slider Cursor */}
    </>
    )

}