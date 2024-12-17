'use client';
import { useEffect } from "react"
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { IoChevronDownCircleOutline } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectEssencials({essecials,points,scroller}){
    
    useEffect(()=>{
                let projectTititleTL = gsap.timeline();
                projectTititleTL.to('.project-title',{scale:1, duration:0.8, delay:1});
                projectTititleTL.play();
                
                
                function StartCounter() {
                    document.querySelectorAll('.fx-counter').forEach(function(fx) {
                        // Extract the original data-number with commas
                        let dataCount = fx.getAttribute('data-number'); 
                        // Remove commas for numeric calculations
                        let targetNumber = parseInt(dataCount.replace(/,/g, '')); 
                        let currentCount = 0;
                        let increment = Math.ceil(targetNumber / 100); // Speed adjustment
                
                        function formatWithCommas(number) {
                            // Add commas back to the number
                            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }
                
                        function incrementNumber() {
                            let interval = setInterval(function () {
                                currentCount += increment;
                
                                // Stop at the exact target number
                                if (currentCount >= targetNumber) {
                                    currentCount = targetNumber;
                                    clearInterval(interval);
                                }
                
                                // Format the number with commas and update the display
                                fx.innerHTML = formatWithCommas(currentCount);
                            }, 30); // Adjust for speed
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
           scroller:'#expertise-inner-page',
           animation:fxTl,
        });
        
    },[])
    
    return(
    <>
        <div id="project-counter">
            <div class="border-section"> 
                <div class="row m-0 g-0 mobile-signifier">
                    
                    <div class="col-lg-3">
                        <div class="project-title-padding">
                        <h4 class="fw-light essential-title signifier">
                            <span className="project-icon"><IoChevronDownCircleOutline /></span>
                         Project Essentials</h4>
                        </div>
                    </div>
                    
                    <div class="col-lg-9 border-left-info">
                        <div class="p-4">
                            <div class="row g-5">
                                
                                <div class="col-lg-4 essetials-flex">
                                    {/* Loop for Points Attributes  */}
                                    {essecials.map((essecial,index)=>(
                                    <div class="glance-sections" key={index}>
                                        <h4 class="glance-side-title">{essecial.title}</h4>
                                        <div className="glance-points signifier" dangerouslySetInnerHTML={{ __html: essecial.content }} />
                                    </div>
                                    ))}
                                    {/* Loop for Points Attributes  */}
                                    
                                </div>
                                
                                <div class="col-lg-8">
                                    <div class="row padding-points gap-hilghlights">
                                        {/* Loop for Points Counter  */}
                                        {points.map((point,index)=>(
                                        <div class="col-md-6 col-lg-6 col-6" key={index}>
                                            <div class="project-info-highlights">
                                                <h2><span class="fx-counter" data-number={point.number}>0</span> {point.number_title}</h2>
                                                <h4 className="signifier">{point.title}</h4>
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