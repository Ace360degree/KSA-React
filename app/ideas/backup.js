'use client';

import { useEffect, useState } from "react";
import LightTheme from "../components/body/lightTheme";
import NavbarIntroPage from "../components/NavbarIntroPage";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import Link from "next/link";
import Image from "next/image";

export default function IdeasBackup() {
    const [ideas, setIdeas] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false); // Track when content is fully loaded
    
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Fetch ideas from API
    useEffect(() => {
        const fetchIdeasAPI = async () => {
            try {
                const response = await fetch('/api/get-ideas', { method: 'GET' });
                if (!response.ok) throw new Error('Failed to fetch ideas');
                const data = await response.json();
                setIdeas(data);
                setIsLoaded(true); // Mark content as loaded
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchIdeasAPI();
    }, []);

    // GSAP animations for mousemove effect
    useEffect(() => {
        if (!isLoaded) return; // Wait for data to be loaded

        const handleMouseMove = (e) => {
            const height = window.innerHeight;
            const width = window.innerWidth;
            const PsX = (e.clientX / width) - 0.6;
            const PsY = (e.clientY / height) - 0.6;

            gsap.to('.ideas-item', {
                rotationX: PsX * 30, // scale rotations
                rotationY: PsY * 30,
                ease: "power3.out",
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, [isLoaded]);

    // Trigger animations and scroll snap behavior after data load
    useEffect(() => {
        if (!isLoaded) return;

        const ctx = gsap.context(() => {
            const panels = gsap.utils.toArray(".snap-section");
            let scrollTween;

            const goToSection = (trigger, i) => {
                scrollTween = gsap.to(window, {
                    scrollTo: { y: trigger.start + innerHeight, autoKill: false },
                    duration: 0.5,
                    onComplete: () => (scrollTween = null),
                    overwrite: true,
                });
            };

            panels.forEach((panel, i) => {
                const imgPanel = panel.querySelector('.ideas-cover');
                if (!imgPanel) return; // Skip if no imgPanel found

                const imgPanelTimeline = gsap.timeline().to(imgPanel, { height: "0", duration: 0.5 });

                ScrollTrigger.create({
                    trigger: panel,
                    start: "top bottom",
                    animation: imgPanelTimeline,
                    scrub: true,
                    onToggle: (self) => self.isActive && !scrollTween && goToSection(self, i),
                });
            });

            ScrollTrigger.create({
                start: 0,
                end: "max",
                snap: (v, self) => gsap.utils.snap([0, self.end, ...panels.map(t => t.getBoundingClientRect().top + innerHeight)], self.scroll()) / self.end,
            });

            ScrollTrigger.normalizeScroll(true);
        });

        return () => ctx.revert(); // Clean up GSAP context
    }, [isLoaded]);

    // Animate project headings after load
    useEffect(() => {
        if (!isLoaded) return;

        const projectHeadTitles = document.querySelectorAll('.project-head-title');
        projectHeadTitles.forEach((title, index) => {
            const projectHeadTl = gsap.timeline({ delay: index * 1.1 });
            projectHeadTl
                .fromTo(title, { rotateX: "-90", opacity: 1 }, { rotateX: "0", delay: 0.4, duration: 0.4 })
                .to(title, { height: "auto", y: "0", delay: 0.3, duration: 0.4 });

            gsap.to(title, { opacity: 0, delay: 4, duration: 0.6 });
        });

        const headAnim = document.querySelector('.head-anim');
        const conicAnimation = gsap.timeline();
        conicAnimation.to(headAnim,{background: 'conic-gradient(from 0deg, transparent 0%, black 0%)'})
                        .to(headAnim,{background: 'conic-gradient(from 0deg, transparent 100%, black 100%)',duration:2})
                        .to(headAnim,{background: 'conic-gradient(from 0deg, transparent 100%, black 120%)',duration:0.1})
        setTimeout(() => {
            // gsap.fromTo(headAnim, {
                
            // }, {
            //     background: 'conic-gradient(from 0deg, transparent 100%, black 110%)',
            //     duration: 1.5,
            //     ease: "power3.inOut",
            // });
            conicAnimation.play();  
            document.querySelector('.project-heads').style.display = 'none';
        }, 5000);
    }, [isLoaded]);

    return (
        <>
            <LightTheme />
            <NavbarIntroPage heading={'Research'} />
            <div className="project-heads">
                <div className="head-anim-control">
                    <div className="head-anim"></div>
                </div>
                <h2 className="project-head-title lg-text-title"><i>RESEARCH</i></h2>
                <h2 className="project-head-title sm-text-title">That makes us</h2>
                <h2 className="project-head-title lg-text-title"><i>Awe</i></h2>
            </div>

            <div className="filter-launch"><i className="fa-solid fa-ellipsis"></i></div>
            <div className="filter-box-control">
                <div className="filter-box signifier">
                    <li data-filter="All">All</li>
                    <li data-filter="1">Study</li>
                    <li data-filter="2">Research</li>
                    <li data-filter="3">Experimental</li>
                    <li data-filter="4">Technological</li>
                </div>
            </div>

            <div className="snap-perspective">
                <div className="snap-parent-anim">
                    {ideas.map((idea, index) => (
                        <Link href={`/ideas/${idea.id}`} key={index}>
                            <div className="snap-section filter-main-box active" data-filter="">
                                <div className="scale-up-idea">
                                    <div className="ideas-item">
                                        <div className="ideas-img-section">
                                            <div className="ideas-cover"></div>
                                            <Image
                                                height={500}
                                                width={800}
                                                className="ideas-thumbnail"
                                                src={process.env.NEXT_PUBLIC_SITE_URL + idea.image}
                                                alt={idea.title}
                                            />
                                        </div>
                                        <h5 className="title-tohide">{idea.description}</h5>
                                        <h2 className="title-tohide">{idea.title}</h2>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
