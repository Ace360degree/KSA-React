'use client';
import { useEffect } from "react";

export default function CheckNavTransparent() {
    useEffect(() => {
        const navbar = document.getElementById('navbar');
        const heroImages = document.querySelectorAll('.hero-image');
        const projectSections = document.querySelectorAll('.remove-transparent');
        const allSections = document.querySelectorAll('section');
        const SVGIcons = document.querySelectorAll('.change-svg');
        const transparentClass = 'transparent';
        const underlinedClass = 'underline-nav';
    
        function checkNavbarPosition() {
            let shouldAddTransparent = false;
            let shouldAddUnderlined = false;
    
            const navbarRect = navbar.getBoundingClientRect();
    
            heroImages.forEach(heroImage => {
                const heroRect = heroImage.getBoundingClientRect();
                if (navbarRect.bottom > heroRect.top && navbarRect.top < heroRect.bottom) {
                    shouldAddTransparent = true;
                }
            });
    
            projectSections.forEach(projectSection => {
                const projectRect = projectSection.getBoundingClientRect();
                if (navbarRect.bottom > projectRect.top && navbarRect.top < projectRect.bottom) {
                    shouldAddTransparent = false;
                }
            });
    
            if (shouldAddTransparent) {
                navbar.classList.add(transparentClass);
            } else {
                navbar.classList.remove(transparentClass);
            }
    
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
    
            SVGIcons.forEach((curr) => {
                let svgShouldAddLight = false;
                heroImages.forEach(heroImage => {
                    const heroRect = heroImage.getBoundingClientRect();
                    const svgRect = curr.getBoundingClientRect();
                    
                    if (svgRect.bottom > heroRect.top && svgRect.top < heroRect.bottom) {
                        svgShouldAddLight = true;
                    }
                });
    
                if (svgShouldAddLight) {
                    curr.classList.add('light');
                } else {
                    curr.classList.remove('light');
                }
            });
        }

            checkNavbarPosition();

        window.addEventListener('scroll', checkNavbarPosition);

        return () => {
            window.removeEventListener('scroll', checkNavbarPosition);
        };
    }, []);
    
    return null;
}
