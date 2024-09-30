'use client';
import { useEffect } from "react";

export default function CheckNavTransparent() {

    useEffect(() => {
        const navbar = document.getElementById('navbar');
        const heroImages = document.querySelectorAll('.hero-image');
        const projectSections = document.querySelectorAll('.remove-transparent');
        const transparentClass = 'transparent';
        let intervalId;

        function checkNavbarPosition() {
            let shouldAddTransparent = false;

            // Recalculate navbar's position in every check
            const navbarRect = navbar.getBoundingClientRect();

            // Iterate over all hero images
            heroImages.forEach(heroImage => {
                const heroRect = heroImage.getBoundingClientRect();
                
                // Check if the navbar is close to or overlapping with the current hero image
                if (navbarRect.top <= heroRect.bottom && navbarRect.bottom >= heroRect.top) {
                    shouldAddTransparent = true;
                }
            });

            // Check against project sections to remove transparency
            projectSections.forEach(projectSection => {
                const projectRect = projectSection.getBoundingClientRect();
                if (navbarRect.top <= projectRect.bottom && navbarRect.bottom >= projectRect.top) {
                    shouldAddTransparent = false;
                }
            });

            // Add or remove the transparent class based on the conditions
            if (shouldAddTransparent) {
                navbar.classList.add(transparentClass);
            } else {
                navbar.classList.remove(transparentClass);
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
