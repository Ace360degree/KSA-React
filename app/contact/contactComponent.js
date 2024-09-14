'use client';
import Image from "next/image";
import DarkTheme from "../components/body/darkTheme";
import NavbarIntroPage from "../components/NavbarIntroPage";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import Link from "next/link";
import "jquery-scrollify";
import $ from "jquery";



export default function ContactComponent(){

    gsap.registerPlugin(ScrollTrigger);

    useEffect(()=>{

        let animationPageTitleSpans =document.querySelectorAll('.page-title-animation span');
    
        animationPageTitleSpans.forEach(function(title,index){
            let pageTitleAnimation = gsap.timeline({ delay: index * 0.6 });
            
            pageTitleAnimation.fromTo(title,
                    {rotateX:"-90",opacity:1},
                    {rotateX:"0", delay:0.4,duration:0.4,}
            );
                    
            pageTitleAnimation.to(title,{height:"auto",y:"0", delay:0.3,duration:0.4}) 
        })

        gsap.fromTo('.form-legend-title',{opacity:0,y:'150px'},
            {
                opacity:1,
                y:0,
                scrollTrigger:{
                    trigger:'.form-legend-title',
                    start:'top 90%',
                    end:'bottom 60%',
                    scrub:true,
                },
            });

            const contactMenuButton = document.querySelectorAll('.contact-menu li');
    
            contactMenuButton.forEach(function(btn){
                let thisTarget = btn.getAttribute('data-target')
                btn.addEventListener('click', function(){
                    contactMenuButton.forEach(function(b){
                        let thisBTarget = b.getAttribute('data-target')
                        b.classList.remove('active');
                        document.querySelector(thisBTarget).classList.remove('active');
                    });
                    btn.classList.add('active');
                    document.querySelector(thisTarget).classList.add('active');
                })
            })    

    },[])

    useEffect(()=>{
        // $.scrollify.destroy();
        $.scrollify.move(0);
    },[])

    return(
        <>
        <DarkTheme/>
        <NavbarIntroPage heading={'Contact'}/>
        <div class="header-gap"></div>
        <div className="contact-menu">
         <li className="" id="contactTrigger" data-target="#contact">Contact</li>
         <li id="officesTrigger" data-target="#offices">Offices</li>
     </div>
     
     <div className="contact-accordion active" id="contact">
        
        <div className="contact-title">
         <i><h2 className="page-title-animation signifier fw-light">
             <span>Hey,</span>
             <span>we were</span>
             <span className="text-uppercase ">Expecting</span>
             <span className="text-uppercase">You</span>
         </h2></i>

     </div> 
         
        <div className="contact-main-section" id="contact-form-section">
         <h3 className="form-legend-title signifier">DONT BE SHY, SAY HI !!!</h3>

         <div className="contact-form-box">
             <div>
                 
                 <div className="form-row">
                     <label>Name*</label>
                     <input className="theme-input" name="full-name" required/>
                 </div>
                 
                 <div className="form-row">
                     <label>Email*</label>
                     <input type="email" className="theme-input" required/>
                 </div>
                 
                 <div className="form-row">
                     <label>Description*</label>
                     <textarea className="theme-input" name="email"  rows="3" required></textarea>
                 </div>
                 
                 
                      
                 
                 <div className="form-row">
                    <button type="submit" className="btn-theme mt-4 w-100"><div className="btn-content">Submit</div></button>
                 </div>
                 
            
     </div>
        </div>     
     </div>  
     
    </div>     
     
     <div className="contact-accordion active" id="offices">
         <div className="map-section active">
           
        <div className="office-section ">
            <div className="image-mapped">
            <div className="map-line london">
                 <div className="location-tag london">
                <h4>UNITED KINGDOM</h4>
                <h6>LONDON</h6>
            </div> 
            </div>    
                    <div className="map-line mumbai">
                        <div className="location-tag mumbai">
                        <h6>MUMBAI</h6>
                        <h4>INDIA</h4>
                    </div> 
                </div>
              
            
            <Image width={1000} height={600} style={{width:'100%',height:'auto',userSelect:'none'}} alt="World Map" className="w-100" src="/images/map/2021-07-03213high-detail-white-world-map.png"/>
            </div>
            </div>
        </div>
        
         
     </div>
    
     
     <div className="contact-footer mt-5">
         <div className="footer-brand">KSA 2024</div>
         <div className="follow-us-text">Follow us on</div>
         <div className="social-links">
            <Link href={'#'}><FaFacebook className="footer-icon" size={22} /></Link>
            <Link href={'#'}><FaInstagram className="footer-icon" size={22} /></Link>
            <Link href={'#'}><FaSquareXTwitter className="footer-icon" size={22} /></Link>
            <Link href={'#'}><FaLinkedin className="footer-icon" size={22} /></Link>
         </div>
     </div>
            
        </>
    )

}