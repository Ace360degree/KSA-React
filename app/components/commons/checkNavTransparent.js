'use client';
import { useEffect } from "react";

export default function CheckNavTransparent() {
    useEffect(() => {
        const navbar = document.getElementById('navbar');
        const heroImages = document.querySelectorAll('.hero-image');
        const projectSections = document.querySelectorAll('.remove-transparent');
        const SVGIcons = document.querySelectorAll('.change-svg');
        const transparentClass = 'transparent';
        let intervalId;

        function checkNavbarPosition() {
            let shouldAddTransparent = false;

            // Recalculate navbar's position in every check
            const navbarRect = navbar.getBoundingClientRect();

            // Iterate over all hero images
            heroImages.forEach(heroImage => {
                const heroRect = heroImage.getBoundingClientRect();

                // Check if the hero image is in view considering a 100px offset
                if (heroRect.top <= window.innerHeight && heroRect.bottom >= 0) {
                    shouldAddTransparent = true;
                }
            });

            // Check against project sections to remove transparency
            projectSections.forEach(projectSection => {
                const projectRect = projectSection.getBoundingClientRect();
                
                // Check if the navbar overlaps with a project section
                if (navbarRect.bottom >= projectRect.top && navbarRect.top <= projectRect.bottom) {
                    shouldAddTransparent = false; // If the navbar overlaps with a project section, remove transparency
                }
            });

            // Add or remove the transparent class based on the conditions
            if (shouldAddTransparent) {
                navbar.classList.add(transparentClass);
                SVGIcons.forEach((curr) => {
                    curr.classList.add('light');
                });
            } else {
                navbar.classList.remove(transparentClass);
                SVGIcons.forEach((curr) => {
                    curr.classList.remove('light');
                });
            }
        }

        // Check every 200ms
        intervalId = setInterval(() => {
            checkNavbarPosition();
        }, 200);

        // Cleanup interval on component unmount
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return null;
}
