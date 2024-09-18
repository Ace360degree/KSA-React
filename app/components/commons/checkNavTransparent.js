'use client';
import { useEffect } from "react";


export default function CheckNavTransparent(){
    
    useEffect(()=>{
            const navbar = document.getElementById('navbar');
            const heroImages = document.querySelectorAll('.hero-image');
            const transparentClass = 'transparent';
        
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
        
                if (shouldAddTransparent) {
                    navbar.classList.add(transparentClass);
                } else {
                    navbar.classList.remove(transparentClass);
                }
            }
        
            // Check position on page load
            checkNavbarPosition();
        
            // Check position on scroll
            window.addEventListener('scroll', checkNavbarPosition);
        
    },[])

    return ;
}