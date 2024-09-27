'use client';
import Image from "next/image";
import DarkTheme from "../components/body/darkTheme";
import NavbarIntroPage from "../components/NavbarIntroPage";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import $ from "jquery";
import  "jquery-scrollify";
import Link from "next/link";
import ScrollifyDisabled from "../components/commons/disableScrollify";


gsap.registerPlugin(ScrollTrigger);
export default function ContactComponent(){
    const [showTabs,setShowTabs] = useState('All');
    const formTitle = useRef(null);
    const animationTitle = useRef(null);

    const [fileName, setFileName] = useState('No File Chosen');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file ? file.name : 'No file chosen');
    };

    useEffect(()=>{

        if(animationTitle.current){
        let animationPageTitleSpans =document.querySelectorAll('.page-title-animation span');
    
        animationPageTitleSpans.forEach(function(title,index){
            let pageTitleAnimation = gsap.timeline({ delay: index * 0.6 });
            
            pageTitleAnimation.fromTo(title,
                    {rotateX:"-90",opacity:1},
                    {rotateX:"0", delay:0.4,duration:0.4,}
            );
                    
            pageTitleAnimation.to(title,{height:"auto",y:"0", delay:0.3,duration:0.4}) 
        })
    }

        if(formTitle.current){
        gsap.fromTo(formTitle.current,{opacity:0,y:'150px'},
            {
                opacity:1,
                y:0,
                scrollTrigger:{
                    trigger:formTitle.current,
                    start:'top 90%',
                    end:'bottom 60%',
                    scrub:true,
                },
            });
        } 

    },[showTabs]);

    useEffect(() => {
        $(document).ready(function () {
          // Initialize Scrollify
          $.scrollify.enable();
          $.scrollify({
            section: ".contact-snap",
            sectionName: "contact-snap",
            interstitialSection: "",
            easing: "easeOutExpo",
            scrollSpeed: 500,
            offset: 0,
            scrollbars: true,
            standardScrollElements: "",
            setHeights: true,
            overflowScroll: true,
            updateHash: false,
            touchScroll: true,
          });
      
          // Refresh ScrollTrigger after Scrollify initializes
          ScrollTrigger.refresh();
        });
      
        return () => $.scrollify.disable(); // Cleanup Scrollify when component unmounts
      }, [showTabs]);

      useEffect(()=>{
        // $.scrollify.destroy();
        $.scrollify.move(0);
    },[])


    return(
        <>
        {/* <ScrollifyDisabled/> */}
        <DarkTheme/>
        <NavbarIntroPage heading={'Contact'}/>
        <div class="header-gap"></div>
        <div className="contact-menu signifier">
         <li className={showTabs=='contact'?'active':''}  onClick={()=>{setShowTabs('contact')}}>Contact</li>
         <li className={showTabs=='offices'?'active':''} onClick={()=>{setShowTabs('offices')}}>Offices</li>
     </div>
     
     {showTabs=='All' || showTabs=='contact'?
     <div className="contact-accordion active" id="contact">
        
        <div className="contact-title contact-snap">
         <i><h2 className="page-title-animation signifier fw-light" ref={animationTitle}>
             <span>Hey,</span>
             <span>we were</span>
             <span className="text-uppercase ">Expecting</span>
             <span className="text-uppercase">You</span>
         </h2></i>

     </div> 
         
        <div className="contact-main-section contact-snap" id="contact-form-section">
         <h3 className="form-legend-title signifier" ref={formTitle}>DONT BE SHY, SAY HI !!!</h3>

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
                     <label>Attach File</label>
                     <div className="file-upload-container px-4">
                            <label for="fileInput" className="input-file-label w-100">Upload</label>
                            <input 
                                type="file" 
                                id="fileInput" 
                                className="file-input" 
                                onChange={handleFileChange} 
                                required 
                            />
                            <div className="file-name">{fileName}</div>
                        </div>
                 </div>
                 
                      
                 
                 <div className="form-row">
                    <button type="submit" className="btn-theme mt-4 w-100"><div className="btn-content">Submit</div></button>
                 </div>
                 
            
     </div>
        </div>     
     </div>  
     
     </div>   
     :''}  
     
     {showTabs=='All' || showTabs=='offices'?
     <div className="contact-accordion active contact-snap" id="offices">
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
         
     </div>
     :''}  
    
     
     
            
        </>
    )

}