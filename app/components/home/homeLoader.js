'use client';
import { useEffect, useRef, useState } from 'react';
import '../../loader.css';
import { useVisitedStore } from '@/app/states/store';

export default function HomeLoader(){

    const { visited, setVisited } = useVisitedStore();

    const[spinning,setSpinning] = useState(true);

    const handleClick = ()=>{
        setVisited();
    }

    useEffect(()=>{
        setTimeout(()=>{
            setSpinning(false);
        },1000);

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
                <h4 className='loader-text'>Click anywhere to Continue</h4>
                }
            </div>
        </>
    )

}