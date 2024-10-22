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
        const underlinedClass = 'underlined';

        function checkNavbarPosition() {
            let shouldAddTransparent = false;
            let shouldAddUnderlined = false; // To track if underlined class should be added

            // Recalculate navbar's position in every check
            const navbarRect = navbar.getBoundingClientRect();

            // Check against all hero images
            heroImages.forEach(heroImage => {
                const heroRect = heroImage.getBoundingClientRect();
                
                // Check if the navbar overlaps with the hero image
                if (navbarRect.bottom > heroRect.top && navbarRect.top < heroRect.bottom) {
                    shouldAddTransparent = true; // Set to true if overlapping
                }
            });

            // Check against project sections to remove transparency
            projectSections.forEach(projectSection => {
                const projectRect = projectSection.getBoundingClientRect();
                if (navbarRect.bottom > projectRect.top && navbarRect.top < projectRect.bottom) {
                    shouldAddTransparent = false; // Remove transparent if overlapping with project section
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
                if (navbarRect.bottom > sectionRect.top && navbarRect.top < sectionRect.bottom) {
                    if (section.classList.contains('project-underline-section')) {
                        shouldAddUnderlined = true; // Add underlined if the current section is a project-underline-section
                    } else {
                        shouldAddUnderlined = false; // Remove underlined if not
                    }

                    if (!section.classList.contains('remove-transparent')) {
                        // If the section does not have the `remove-transparent` class, add light to the navbar
                        navbar.classList.add('light');
                        SVGIcons.forEach((curr) => {
                            curr.classList.add('light');
                        });
                    }
                }
            });

            // Update underlined class based on the shouldAddUnderlined flag
            if (shouldAddUnderlined) {
                navbar.classList.add(underlinedClass);
            } else {
                navbar.classList.remove(underlinedClass);
            }
        }

        // Initial check in case the page is loaded at a scroll position
        checkNavbarPosition();
        window.addEventListener('scroll', checkNavbarPosition);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', checkNavbarPosition);
        };
    }, []);

    return null;
}
