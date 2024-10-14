'use client';
import Image from "next/image";
import '../contact.css';
import DarkTheme from "../components/body/darkTheme";
import NavbarIntroPage from "../components/NavbarIntroPage";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaFacebook, FaInstagram, FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import $ from "jquery";
import "jquery-scrollify";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import ScrollifyDisabled from "../components/commons/disableScrollify";

gsap.registerPlugin(ScrollTrigger);

export default function ContactComponent() {
    const [showTabs, setShowTabs] = useState('All');
    const formTitle = useRef(null);
    const [mobileFilter,setMobileFilter] =useState(false);
    const[submitting,setSubmitting] = useState(false);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const officeSection = useRef(null);

    const animationTitle = useRef(null);
    const [fileName, setFileName] = useState('No File Chosen');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: '',
        //file: null
    });

    
    const[activeContact,setActiveContact] = useState(true);
    const[activeOffices,setActiveOffices] =useState(false);

    const [showAlert,setshowAlert] = useState(false);
    const [showAlertError,setshowAlertError] = useState(false);

    const toggleMobileFilter = () =>{
        setMobileFilter(!mobileFilter);
    }

    useEffect(() => {
  
        if (!isTouchDevice) {
          // Apply ScrollTrigger normalization only on non-touch devices (like desktops)
          ScrollTrigger.normalizeScroll(true);
        }
      
        return () => {
          if (!isTouchDevice) {
            ScrollTrigger.normalizeScroll(false);
          }
        };
      }, []);

    useEffect(()=>{
        if(officeSection.current){
            
            function initActiveNow(){
                setActiveContact(false);
                setActiveOffices(true);
                
            }

            function removeActiveNow(){
                setActiveContact(true);
                setActiveOffices(false);
            }

            ScrollTrigger.create({
                trigger:officeSection.current,
                start:'top 50%',
                end:'bottom 0%',
                onEnter:initActiveNow,
                onEnterBack:initActiveNow,
                onLeave:removeActiveNow,
                onLeaveBack:removeActiveNow,
            })
        }
    },[activeContact,activeOffices,showTabs])

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     setFileName(file ? file.name : 'No file chosen');
    //     setFormData({
    //         ...formData,
    //         file: file
    //     });
    // };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('description', formData.description);
        // if (formData.file) {
        //     form.append('file', formData.file);
        // }
        setSubmitting(true);
        try {
            const response = await fetch('/api/submitcontact', {
                method: 'POST',
                body: form
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle successful submission (e.g., show a success message)
            setshowAlert(true);
            setSubmitting(false);
            setFormData({
                name: '',
                email: '',
                description: '',
                //file: null
            });
            setFileName('No File Chosen');
        } catch (error) {
            console.error('Error submitting form:', error);
            setshowAlertError(true);
        }
    };

    useEffect(() => {
        if (animationTitle.current) {
            let animationPageTitleSpans = document.querySelectorAll('.page-title-animation span');

            animationPageTitleSpans.forEach(function (title, index) {
                let pageTitleAnimation = gsap.timeline({ delay: index * 0.6 });

                pageTitleAnimation.fromTo(title,
                    { rotateX: "-90", opacity: 1 },
                    { rotateX: "0", delay: 0.4, duration: 0.4 }
                );

                pageTitleAnimation.to(title, { height: "auto", y: "0", delay: 0.3, duration: 0.4 });
            });
        }

        if (formTitle.current) {
            gsap.fromTo(formTitle.current, { opacity: 0, y: '150px' },
                {
                    opacity: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: formTitle.current,
                        start: 'top 90%',
                        end: 'bottom 60%',
                        scrub: true,
                    },
                });
        }

    }, [showTabs]);

    useEffect(() => {
        $(document).ready(function () {
            // Initialize Scrollify
            $.scrollify.enable();
            $.scrollify({
                section: ".contact-snap",
                sectionName: "contact-snap",
                interstitialSection: "",
                easing: "easeOutExpo",
                scrollSpeed: isTouchDevice?100:1500,
                offset: 0,
                scrollbars: true,
                standardScrollElements: "",
                setHeights: true,
                overflowScroll: true,
                updateHash: false,
                touchScroll: true,
            });
            $.scrollify.move(0);
            // Refresh ScrollTrigger after Scrollify initializes
            ScrollTrigger.refresh();
        });

        return () => $.scrollify.disable(); // Cleanup Scrollify when component unmounts
    }, [showTabs]);


    return (
        <>
            <DarkTheme />
            <NavbarIntroPage heading={'Contact'} />
            <div class="filter-launch" onClick={toggleMobileFilter}>
                {mobileFilter?<IoCloseOutline />:<BsThreeDots />}
            </div> 
            <div className={mobileFilter?'contact-menu signifier active':'contact-menu signifier'}>
                <li className={showTabs === 'contact' || activeContact ? 'active' : ''} onClick={() => { setShowTabs('contact');setMobileFilter(false) }}>Contact</li>
                <li className={showTabs === 'offices' || activeOffices ? 'active' : ''} onClick={() => { setShowTabs('offices');setMobileFilter(false) }}>Offices</li>
            </div>

            {showTabs === 'All' || showTabs === 'contact' ?
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

                        <form onSubmit={handleSubmit} className="contact-form-box signifier">
                            <div>
                                <div className="form-row">
                                    <label>Name*</label>
                                    <input className="theme-input" name="name" value={formData.name} onChange={handleChange} placeholder="Type here" required />
                                </div>

                                <div className="form-row">
                                    <label>Email*</label>
                                    <input type="email" className="theme-input" name="email" value={formData.email} onChange={handleChange} placeholder="Type here" required />
                                </div>

                                <div className="form-row">
                                    <label>Description*</label>
                                    <textarea className="theme-input" name="description" value={formData.description} onChange={handleChange} placeholder="Type here" rows="3" required></textarea>
                                </div>

                                {/* <div className="form-row d-none">
                                    <label>Attach File</label>
                                    <div className="file-upload-container ">
                                        <label htmlFor="fileInput" className="input-file-label w-100">Upload</label>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            className="file-input"
                                            onChange={handleFileChange}
                                        />
                                        <div className="file-name">{fileName}</div>
                                    </div>
                                </div> */}

                                <div className="form-row">
                                    {submitting?
                                        <button type="submit" className="btn-theme mt-5 w-100" disabled><div className="btn-content">Please Wait...</div></button>
                                    :
                                    <button type="submit" className="btn-theme mt-5 w-100"><div className="btn-content">Submit</div></button>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                : ''}

            {showTabs === 'All' || showTabs === 'offices' ?
                <div className="contact-section-tab contact-snap overflow-hidden" ref={officeSection} id="offices">
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

                                <Image width={1000} height={600} style={{ width: '100%', height: 'auto', userSelect: 'none' }} alt="World Map" className="w-100" src="/images/map/2021-07-03213high-detail-white-world-map.png" />
                            </div>
                        </div>
                    </div>

                    <div className="contact-footer">
                        <div className="footer-brand"><Link href={'/policies'}>Legal and policies</Link> © 2024 KSA. All Rights Reserved.
                        </div>
                        <div className="social-links">
                            <a href=''  target="_blank"><FaFacebook className="footer-icon" size={22} /></a>
                            <a href='https://www.instagram.com/kuwalsanamarchitekts/?utm_source=qr&igsh=dTgzM2hlOG82aTV1' target="_blank"><FaInstagram className="footer-icon" size={22} /></a>
                            {/* <a href='' target="_blank"><FaSquareXTwitter className="footer-icon" size={22} /></a> */}
                            <a href='https://www.youtube.com/@kuwalsanamarchitekts4285' target="_blank"><FaYoutube className="footer-icon" size={22} /></a>
                            <a href='https://www.linkedin.com/feed/' target="_blank"><FaLinkedin className="footer-icon" size={22} /></a>
                        </div>
                        {/* <div className="footer-policy-box">
                            <Link ><div className="policies-launcher">Policies</div></Link>
                        </div> */}
                    </div>
                </div>
                : ''}
            <ScrollifyDisabled />

            {showAlert?
            <div className="contact-alert-box">
                <div className="contact-alert">
                    <h1>Your Form has been submitted Successfully!</h1>
                    <p></p>
                    <button className="btn btn-light d-block mx-auto" onClick={()=>{setshowAlert(false)}}>Close</button>
                </div>
            </div>
            :''}

            {showAlertError?
            <div className="contact-alert-box">
                <div className="contact-alert">
                    <h1>Something went Wrong! Please try again</h1>
                    <p></p>
                    <button className="btn btn-light d-block mx-auto" onClick={()=>{setshowAlertError(false)}}>Close</button>
                </div>
            </div>
            :''}

        </>
    );
}
