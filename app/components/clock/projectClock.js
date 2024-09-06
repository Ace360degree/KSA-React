'use client'

import { useEffect } from "react"

export default function ProjectClock(){

    useEffect(()=>{
        let clockIndicatorBox = document.querySelector('.clock-indicator-box');
    
        let clockDots = clockIndicatorBox.querySelectorAll('.clock-indicator');
        
        let clockDotsLength = clockDots.length;
        
        let numtoDivide = 360/clockDotsLength;
        
        clockDots.forEach(function(dot,index){
            dot.style.transform = 'rotate('+(numtoDivide*index)+'deg)'
        });
        
        
        let smallIndicatorBox = document.querySelector('.clock-smallindicator-box'); 
        
        for(let i=1; i<=360;i++){
            smallIndicatorBox.innerHTML += '<div class="clock-smallindicator" style="transform:rotate('+i+'deg)"></div>'; 
        }
    },[])

    return(<>
        <div class="user-clock projects-clock">
                <div class="user-clock-control">
                    <div class="user-hands user-clock-hour" style={{opacity:'0'}}><span></span></div>
                    <div id="seconds-clock" class="user-hands user-clock-seconds project-hands clock-paused"><span></span></div>
                </div>
                <div class="clock-indicator-box">
                    <div class="clock-indicator"></div>
                    <div class="clock-indicator"></div>
                    <div class="clock-indicator"></div>
                    <div class="clock-indicator"></div>
                    <div class="clock-indicator"></div>
                    <div class="clock-indicator"></div>
                    <div class="clock-indicator"></div>
                    <div class="clock-indicator"></div>
                    <div class="clock-indicator"></div>
                    <div class="clock-indicator"></div>
                    <div class="clock-indicator"></div>
                    <div class="clock-indicator"></div>
                </div>
                <div class="clock-smallindicator-box">
                    <div class="clock-smallindicator"></div>
                </div>
            </div>
    </>)
}