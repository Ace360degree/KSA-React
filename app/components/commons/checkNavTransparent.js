'use client';
import { useEffect } from "react";

export default function CheckNavTransparent() {
    useEffect(() => {
        const navbar = document.getElementById('navbar');
        const heroImages = document.querySelectorAll('.hero-image');
        const projectSections = document.querySelectorAll('.remove-transparent');
        const allSections = document.querySelectorAll('section'); // Get all sections
        const SVGIcons = document.querySelectorAll('.change-svg');
        const transparentClass = 'transparent';

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
                SVGIcons.forEach((curr) => {
                    curr.classList.add('light');
                });
            } else {
                navbar.classList.remove(transparentClass);
                SVGIcons.forEach((curr) => {
                    curr.classList.remove('light');
                });
            }

            // Check all sections: if the section does not have the `.remove-transparent` class, add `.light`
            allSections.forEach(section => {
                const sectionRect = section.getBoundingClientRect();

                // Check if the navbar overlaps with a section
                if (navbarRect.top <= sectionRect.bottom && navbarRect.bottom >= sectionRect.top) {
                    if (!section.classList.contains('remove-transparent')) {
                        // If the section does not have the `remove-transparent` class, add light to the navbar
                        navbar.classList.add('light');
                        SVGIcons.forEach((curr) => {
                            curr.classList.add('light');
                        });
                    }
                }
            });
        }

        // // Attach the scroll event listener
        // window.addEventListener('wheel', checkNavbarPosition);

        // // Initial check in case the page is loaded at a scroll position
        checkNavbarPosition();

        // Cleanup event listener on component unmount
        // return () => {
        //     window.removeEventListener('wheel', checkNavbarPosition);
        // };
    }, []);

    return null;
}
