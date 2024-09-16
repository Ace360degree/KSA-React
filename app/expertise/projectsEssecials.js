'use client';
import { useEffect } from "react"
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectEssencials({essecials,points}){
    
    useEffect(()=>{
                let projectTititleTL = gsap.timeline();
                projectTititleTL.to('.project-title',{scale:1, duration:0.8, delay:1});
                projectTititleTL.play();
                
                
                function StartCounter(){
                document.querySelectorAll('.fx-counter').forEach(function(fx, index) {
                let dataCount = parseInt(fx.getAttribute('data-number'));
                let currentCount = 0;
                let increment = Math.ceil(dataCount / 100); // adjust this for speed
                
                function incrementNumber() {
                    let interval = setInterval(function() {
                        currentCount += increment;
                        if (currentCount >= dataCount) {
                            currentCount = dataCount;
                            clearInterval(interval);
                        }
                        fx.innerHTML = currentCount;
                    }, 30); // adjust this for speed
                }
                
                incrementNumber();


            });
            }

        let fxTl = gsap.timeline();
        fxTl.add(function(){StartCounter()});
        
        ScrollTrigger.create({
           trigger:'#project-counter',
           start:"top 50%",
           end:"top 80%",
        //   onEnter:StartCounter,
        //   scrub:fasle,
           animation:fxTl,
        });
        
    },[])
    
    return(
    <>
        <div class="project-info-section my-5" id="project-counter">
            <div class="border-section"> 
                <div class="row m-0 g-0">
                    
                    <div class="col-md-3">
                        <div class="p-4">
                        <h4 class="fs-1 fw-light essential-title">Project Essentials</h4>
                        </div>
                    </div>
                    
                    <div class="col-md-9 border-left-info">
                        <div class="p-4">
                            <div class="row">
                                
                                <div class="col-md-4">
                                    {/* Loop for Points Attributes  */}
                                    {essecials.map((essecial,index)=>(
                                    <div class="mb-4" key={index}>
                                        <h4 class="glance-side-title">{essecial.title}</h4>
                                        <div class="glance-points">
                                            {essecial.content}
                                        </div>
                                    </div>
                                    ))}
                                    {/* Loop for Points Attributes  */}
                                    
                                </div>
                                
                                <div class="col-md-8 ">
                                    <div class="row g-5 padding-points">
                                        {/* Loop for Points Counter  */}
                                        {points.map((point,index)=>(
                                        <div class="col-md-6 col-6" key={index}>
                                            <div class="project-info-highlights">
                                                <h2><span class="fx-counter" data-number={point.number}>0</span>{point.number_title}</h2>
                                                <h4>{point.title}</h4>
                                            </div>
                                        </div>
                                        ))}
                                        {/* Loop for Points Counter  */}

                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div> 
            </div>  
        </div>
    </>
    )

}