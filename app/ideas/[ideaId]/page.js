'use client';
import NavbarIntroPage from "@/app/components/NavbarIntroPage";
import Link from "next/link";
import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import {motion} from 'framer-motion';
import { TweenMax } from "gsap/all";
import $ from "jquery";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'slick-carousel';
import { usePathname } from "next/navigation";


export default function IdeasPage(){
    
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
            top: mouseY - 12,
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
        
        
      //   Left Side
        document.querySelector('.images-slider-left').addEventListener('mouseenter',()=>{
           onEnterShow();
           document.querySelector('.slider-cursor-icon').classList.add('fa-angle-left');
        });
        
        document.querySelector('.images-slider-left').addEventListener('mouseleave',()=>{
           onLeaveHide();
           document.querySelector('.slider-cursor-icon').classList.remove('fa-angle-left');
        });
        
        
      //   Right Side
        document.querySelector('.images-slider-right').addEventListener('mouseenter',()=>{
           onEnterShow();
           document.querySelector('.slider-cursor-icon').classList.add('fa-angle-right');
        });
        
        document.querySelector('.images-slider-right').addEventListener('mouseleave',()=>{
           onLeaveHide();
           document.querySelector('.slider-cursor-icon').classList.remove('fa-angle-right');
        });
        
        document.querySelector('.images-slider-left').addEventListener('mousemove',()=>{
            if(document.querySelector('.images-slider-left').classList.contains('slick-disabled')){
                document.querySelector('.slider-cursor').classList.add('inactive');
                document.querySelector('.slider-cursor-icon').classList.add('inactive');
            }
        })
        
        document.querySelector('.images-slider-left').addEventListener('mouseleave',()=>{
            if(document.querySelector('.images-slider-left').classList.contains('slick-disabled')){
                document.querySelector('.slider-cursor').classList.remove('inactive');
                document.querySelector('.slider-cursor-icon').classList.remove('inactive');
            }
        })
      
        document.querySelector('.images-slider-right').addEventListener('mousemove',()=>{
            if(document.querySelector('.images-slider-right').classList.contains('slick-disabled')){
                document.querySelector('.slider-cursor').classList.add('inactive');
                document.querySelector('.slider-cursor-icon').classList.add('inactive');
            }
        })
        
        document.querySelector('.images-slider-right').addEventListener('mouseleave',()=>{
            if(document.querySelector('.images-slider-right').classList.contains('slick-disabled')){
                document.querySelector('.slider-cursor').classList.remove('inactive');
                document.querySelector('.slider-cursor-icon').classList.remove('inactive');
            }
        })
    },[]);


    useEffect(() => {
        $('.project-images-slider').slick({
          slidesToShow: 1,
          infinite: false,
          prevArrow: $('.images-slider-left'),
          nextArrow: $('.images-slider-right'),
        });

        return () => {
            if ($('.project-images-slider').slick('getSlick')) {
              $('.project-images-slider').slick('unslick');
            }
          };
    },[]);    

    return(<>
        <NavbarIntroPage heading={'Research'}/>
        {/* Slider Cursor */}
        <div className="slider-cursor"></div>
        <i className="slider-cursor-icon fa-solid"></i>
        {/* Slider Cursor */}

        <div className="project-info-section position-relative">
            <div className="project-images-slider">
                
                <div className="ideas-inner-section">
                    <motion.img className="ideas-section-img" src="https://www.equinoxindia.com/wp-content/uploads/images/commercial-real-estate-projects.jpg" />
                    <div className="row mt-3 align-items-center">
                        <div className="col-md-6">
                            <h2 className="ideas-inner-title">Test Title</h2>
                        </div>
                        <div className="col-md-6">
                            <p className="ideas-inner-content">Text Content</p>
                        </div>
                    </div>
                </div>
                
                <div className="ideas-inner-section">
                    <img className="ideas-section-img" src="https://www.equinoxindia.com/wp-content/uploads/images/commercial-real-estate-projects.jpg" />
                    <div className="row mt-3 align-items-center">
                        <div className="col-md-6">
                            <h2 className="ideas-inner-title">Test Title</h2>
                        </div>
                        <div className="col-md-6">
                            <p className="ideas-inner-content">Content Title</p>
                        </div>
                    </div>
                    
                    
                </div>
                 
            </div>
            <div className="images-slider-left slider-img-nav"></div>
            <div className="images-slider-right slider-img-nav"></div>
        </div>
        
        <Link href={'/ideas'}><div className="close-projects"><FaXmark /></div></Link>
    </>)
}