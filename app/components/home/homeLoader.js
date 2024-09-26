'use client';
import { useEffect, useRef, useState } from 'react';
import '../../loader.css';
import { useVisitedStore } from '@/app/states/store';
import gsap from 'gsap/all';

export default function HomeLoader(){

    const { visited, setVisited } = useVisitedStore();
    const [showTitle, setShowTitle] = useState(false);
    const homeGrad = useRef(null);

    const[spinning,setSpinning] = useState(true);

    const handleClick = ()=>{
        setVisited();
    }

    useEffect(()=>{
        setTimeout(()=>{
            setSpinning(false);
        },1000);
    },[])

    useEffect(()=>{
        document.querySelector('body').classList.remove('dark');
        setTimeout(()=>{
            if(homeGrad.current){
        
                gsap.fromTo(homeGrad.current,{
                    background:'conic-gradient(from 45deg, black 0%, transparent 0%)',
                },{
                    background:'conic-gradient(from 45deg, black 100%, transparent 100%)',
                    duration:2.5,
                    ease: "power3.inOut",
                    delay:0,
                });
            }

            setTimeout(()=>{
                document.querySelector('body').classList.add('dark');
                setShowTitle(true);
                
            },2000);

        },10000);
        
    },[])

 
    return(
        
        <>
            <div className="loader-box" onClick={handleClick}>
                {spinning?
                <div className="spinner-box">
                    <div className="pulse-container">  
                        <div className="pulse-bubble pulse-bubble-1"></div>
                        <div className="pulse-bubble pulse-bubble-2"></div>
                        <div className="pulse-bubble pulse-bubble-3"></div>
                    </div>
                </div>
                 :
                <>
                <div id="clock" >
                <div className="clock-bg"></div>
                <div className="clock-dot">
                    <div className="line primary-line"><div className="clock-title">KSA</div></div>
                    <div className="line extended-line minute-line"></div>
                    <div className="line extended-line hour-line"></div>
                    <div className="line extended-line bottom-line"></div>
                </div>
                </div>
                <div className="home-title-grad" ref={homeGrad}></div>
                {showTitle?
                    <h4 className="loader-text">Click to Continue</h4>
                :
                    ''   
                }
                </>
                }
            </div>
        </>
    )

}