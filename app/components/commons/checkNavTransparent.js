'use client';
import { useEffect } from "react";

export default function CheckNavTransparent() {

    useEffect(() => {
        const navbar = document.getElementById('navbar');
        const heroImages = document.querySelectorAll('.hero-image');
        const transparentClass = 'transparent';
        let isScrolling;

        function checkNavbarPosition() {
            let shouldAddTransparent = false;

            // Iterate over all hero images
            heroImages.forEach(heroImage => {
                const navbarRect = navbar.getBoundingClientRect();
                const heroRect = heroImage.getBoundingClientRect();

                // Check if the navbar is close to or overlapping with the current hero image
                if (navbarRect.top <= heroRect.bottom && navbarRect.bottom >= heroRect.top) {
                    shouldAddTransparent = true;
                }
            });

            // Add or remove the transparent class based on the condition
            if (shouldAddTransparent) {
                navbar.classList.add(transparentClass);
            } else {
                navbar.classList.remove(transparentClass);
            }
        }

        // Function to detect when scrolling stops
        function handleScroll() {
            // Clear the previous timeout to debounce
            clearTimeout(isScrolling);

            // Set a timeout to run after scroll settles (100ms delay)
            isScrolling = setTimeout(() => {
                checkNavbarPosition(); // Check position when scroll has stopped
            }, 100);
        }

        // Initial check when the page loads
        checkNavbarPosition();

        // Add scroll event listener to check when scrolling stops
        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return null;
}
