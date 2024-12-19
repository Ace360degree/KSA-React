'use client';
import { useEffect } from "react";
import Scrollbar from "smooth-scrollbar";

export default function CheckNavTransparent() {
    useEffect(() => {
        const navbar = document.getElementById('navbar');
        const heroImages = document.querySelectorAll('.hero-image');
        const projectSections = document.querySelectorAll('.remove-transparent');
        const allSections = document.querySelectorAll('section');
        const SVGIcons = document.querySelectorAll('.change-svg');
        const transparentClass = 'transparent';
        const underlinedClass = 'underlined';

        // Initialize the custom scrollbar
        const scrollbarContainer = document.getElementById('expertise-inner-page');
        const scrollbar = Scrollbar.init(scrollbarContainer);

        function checkNavbarPosition() {
            let shouldAddTransparent = false;
            let shouldAddUnderlined = false;

            // Recalculate navbar's position in every check
            const navbarRect = navbar.getBoundingClientRect();

            // Check against all hero images for transparency
            heroImages.forEach(heroImage => {
                const heroRect = heroImage.getBoundingClientRect();
                if (navbarRect.bottom > heroRect.top && navbarRect.top < heroRect.bottom) {
                    shouldAddTransparent = true;
                }
            });

            // Check against project sections to remove transparency
            projectSections.forEach(projectSection => {
                const projectRect = projectSection.getBoundingClientRect();
                if (navbarRect.bottom > projectRect.top && navbarRect.top < projectRect.bottom) {
                    shouldAddTransparent = false;
                }
            });

            // Add or remove the transparent class based on the conditions
            if (shouldAddTransparent) {
                navbar.classList.add(transparentClass);
            } else {
                navbar.classList.remove(transparentClass);
            }

            // Check all sections to manage light class on the navbar and SVG icons
            allSections.forEach(section => {
                const sectionRect = section.getBoundingClientRect();

                if (navbarRect.bottom > sectionRect.top && navbarRect.top < sectionRect.bottom) {
                    if (section.classList.contains('project-underline-section')) {
                        shouldAddUnderlined = true;
                    } else {
                        shouldAddUnderlined = false;
                    }

                    if (!section.classList.contains('remove-transparent')) {
                        navbar.classList.add('light');
                    }
                }
            });

            // Update underlined class on the navbar
            if (shouldAddUnderlined) {
                navbar.classList.add(underlinedClass);
            } else {
                navbar.classList.remove(underlinedClass);
            }

            // Separate check for SVGIcons colliding with hero images
            SVGIcons.forEach((curr) => {
                let svgShouldAddLight = false;
                heroImages.forEach(heroImage => {
                    const heroRect = heroImage.getBoundingClientRect();
                    const svgRect = curr.getBoundingClientRect();
                    
                    if (svgRect.bottom > heroRect.top && svgRect.top < heroRect.bottom) {
                        svgShouldAddLight = true;
                    }
                });

                // Add or remove light class on individual SVG icons based on collision
                if (svgShouldAddLight) {
                    curr.classList.add('light');
                } else {
                    curr.classList.remove('light');
                }
            });
        }

        // Ensure elements are fully loaded before checking positions
        const waitForElements = setInterval(() => {
            if (navbar && heroImages.length > 0 && projectSections.length > 0) {
                clearInterval(waitForElements);
                // Initial check in case the page is loaded at a scroll position
                checkNavbarPosition();
                // Add event listener on custom scrollbar instance
                scrollbar.addListener(checkNavbarPosition);

                // Add resize observer to handle window resize
                const resizeObserver = new ResizeObserver(checkNavbarPosition);
                resizeObserver.observe(document.body);  // Observe body for any layout changes

                // Cleanup event listener and observer on component unmount
                return () => {
                    scrollbar.removeListener(checkNavbarPosition);
                    resizeObserver.disconnect();
                };
            }
        }, 100);

        // Cleanup interval after 5 seconds just in case
        setTimeout(() => clearInterval(waitForElements), 5000);
        
    }, []);

    return null;
}
