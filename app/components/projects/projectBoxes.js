import { useEffect } from "react"
import gsap from "gsap";

export default function ProjectBoxes(){

    useEffect(()=>{
        let projectBoxItems = document.querySelectorAll('.projects-items');
            
        projectBoxItems.forEach((box,index)=>{
            let dataURL = box.getAttribute('data-url');
            box.addEventListener('click', function(){
                if(dataURL){
                    window.location.href = dataURL;
                }
               
            });
        });
        
        let windowheight = screen.height/2;

        let lastScrollPos = undefined;
        let lastScrollTime = undefined;
        const wrapper = document.querySelector("#projects-Scroller");
        const wrapperBox = document.querySelector(".projects-main");
        
        document.addEventListener('scroll', () => {
          if (lastScrollTime === undefined) {
            lastScrollPos = window.scrollY;
            lastScrollTime = performance.now();
            return;
          }
        
          const dp = Math.abs(window.scrollY - lastScrollPos);
          const dt = performance.now() - lastScrollTime;
          
          lastScrollTime = performance.now();
          lastScrollPos = window.scrollY;
        
          // Reduce the speed multiplier for a slower effect
          const speed = dp / dt / 20;
          
          // Clamp speed to prevent too much scaling on fast scrolls
          const clampedSpeed = Math.min(speed, 0.10);
        
          wrapper.style.setProperty("--speed", clampedSpeed + 0.01);
          wrapper.style.setProperty("--scroll", `${window.scrollY + windowheight -100}px`);
        });
        
        document.addEventListener('scrollend', () => {
          lastScrollTime = undefined;
          wrapper.style.setProperty("--speed", 0);
        });
        
        
        
        
        let isDragging = false;
        let startX, scrollLeft;

        document.body.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - window.scrollX;
        scrollLeft = window.scrollX;
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        });

        document.body.addEventListener('mouseleave', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
        document.body.style.removeProperty('user-select');
        });

        document.body.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
        document.body.style.removeProperty('user-select');
        });

        document.body.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - window.scrollX;
        const walk = (x - startX) * 2; // The * 2 is for speed
        window.scrollTo({
            left: scrollLeft - walk,
            behavior: 'auto',
        });
        });

    },[]);

    useEffect(()=>{

        let scrollerIndex = 0;

        function smoothScroll(targetY, duration) {
            const startY = window.scrollY;
            const diff = targetY - startY;
            let startTime = null;
        
            function scrollAnimation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const scrollPosition = easeInOutQuad(timeElapsed, startY, diff, duration);
        
                window.scrollTo(0, scrollPosition);
        
                if (timeElapsed < duration) {
                    requestAnimationFrame(scrollAnimation);
                }
            }
        
            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
        
            requestAnimationFrame(scrollAnimation);
        }
        
        
        function initProjects() {
            let allProjects = document.querySelectorAll('.projects-items.active');
            let currProjectArry;
            
            if (scrollerIndex < allProjects.length) {
                currProjectArry = allProjects[scrollerIndex];
            } else {
                scrollerIndex = 0;
                currProjectArry = allProjects[scrollerIndex];
            }
        
            smoothScroll(currProjectArry.offsetTop - 100, 100);
        
        }
        
        
            
        
        let SecondsClock = document.getElementById('seconds-clock');
        let incrementClockNumber = 1;
        
        
        let clockIndicators = document.querySelectorAll('.clock-indicator');
        let clockIndiNum = 0;
        function clearIndicators(){
            clockIndicators.forEach(function(el){
                el.classList.remove('active');
            })
        }
        
        function activeIndicators(el){
            el.classList.add('active');
        }
        
        function IndicatorsAnimation(){
            if(clockIndiNum == clockIndicators.length){
                clockIndiNum = 1;
                clearIndicators();
                console.log(clockIndiNum)
                activeIndicators(clockIndicators[clockIndiNum]);
                
                
            }else{
                clearIndicators();
                activeIndicators(clockIndicators[clockIndiNum]);
                console.log(clockIndiNum)
                clockIndiNum = clockIndiNum + 1;
                
            }
        }
        
        
        
        
        
        function rotateSecondsHandsNormal() {
            SecondsClock.style.transform = 'rotate(' + (incrementClockNumber * 30) + 'deg)';
            incrementClockNumber += 1;
            scrollerIndex += 1;
            initProjects();
            IndicatorsAnimation();
        }
        
        function startClockAnimation() {
            setInterval(rotateSecondsHandsNormal, 5000);
        }
        
        initProjects();
        rotateSecondsHandsNormal();
        startClockAnimation();
        
        // Function to update scrollerIndex based on visible project
        function updateScrollerIndex() {
            const allProjects = document.querySelectorAll('.projects-items.active');
            const scrollPosition = window.scrollY; // Current scroll position
        
            // Loop through all projects to find the currently visible one
            allProjects.forEach((project, index) => {
                const projectOffsetTop = project.offsetTop;
                const projectHeight = project.offsetHeight;
        
                // Check if the current scroll position is within the bounds of the project
                if (scrollPosition >= projectOffsetTop - 100 && scrollPosition < projectOffsetTop + projectHeight - 100) {
                    scrollerIndex = index; // Update scrollerIndex to the current project
                }
            });
        }
        
        // Add scroll event listener
        window.addEventListener('scroll', updateScrollerIndex);
    });

    return(
        <>
            
        <div className="position-relative">
        <div className="filter-box-control">
           <div className="filter-box">
               <li data-filter="residental">Residental</li>
               <li data-filter="commercial">Commercial</li>
               <li data-filter="urbandesign">UrbanDesign + Planning</li>
               <li data-filter="institution">Institution</li>
               <li data-filter="hospitality">Hospitality</li>
               <li data-filter="interiors">Interior</li>
           </div>
       </div>
       
       <div id="projects-Scroller" data-scroll-container>
       <div className="projects-main">
           
           <div className="projects-items" data-filter="residental">
               <div className="projects-items-controls">
                   <div className="project-image-wrap">
                        <div className="wrap-box"></div>
                        <img src="https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2014/12/17/1/Teresa-Ryback_Contemporary-West-Coast-Exterior.jpg.rend.hgtvcom.1280.1280.suffix/1418836105562.jpeg"/>
                   </div>
                   <div className="project-item-content">
                    <h6>Where communities bridge the sky</h6>   
                    <h4>Vistas Enclosure</h4>
                   </div>
               </div>
           </div>
           
           <div className="projects-items" data-filter="commercial">
              <div className="projects-items-controls">
                    <div className="project-image-wrap">
                        <div className="wrap-box"></div>
                       <img src="https://img.freepik.com/premium-photo/rows-balconies-corner-urban-building_294094-123.jpg"/>
                    </div>
                   <div className="project-item-content"> 
                        <h6>Where communities bridge the sky</h6>   
                        <h4>Sai Samast</h4>
                   </div>
               </div>
           </div>
           
           <div className="projects-items" data-filter="commercial">
               <div className="projects-items-controls">
                   <div className="project-image-wrap">
                        <div className="wrap-box"></div>
                         <img src="https://images.adsttc.com/media/images/5df0/f70c/3312/fd16/7900/0716/newsletter/Vasiliy_Khurtin.jpg?1576072963"/>
                   </div>
                   <div className="project-item-content">
                   <h6>Where communities bridge the sky</h6>          
                   <h4>Mindspace</h4>
                   </div>
               </div>
           </div>
           
          <div className="projects-items" data-filter="institution">
              <div className="projects-items-controls">
                    <div className="project-image-wrap">
                        <div className="wrap-box"></div>
                        <img src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?cs=srgb&dl=pexels-pixasquare-1115804.jpg&fm=jpg"/>
                    </div>
                    <div className="project-item-content">
                        <h6>Where communities bridge the sky</h6>   
                        <h4>Bivab Heights</h4>
                   </div>
               </div>
           </div>
           
           <div className="projects-items" data-filter="healthcare">
             <div className="projects-items-controls">
                   <div className="project-image-wrap">
                        <div className="wrap-box"></div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT0KgUMhyQ8NXxLgF3HmrDwHL51dn_ojJcBN0hk1N3dA&s"/>
                    </div>
                   <div className="project-item-content"> 
                   <h6>Where communities bridge the sky</h6>   
                    <h4>Mission Heights</h4>
                   </div>
               </div>
           </div>
           
           <div className="projects-items" data-filter="hospitality">
              <div className="projects-items-controls">
                   <div className="project-image-wrap">
                        <div className="wrap-box"></div>
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4583d634063352.56c2f1a60fea8.jpg"/>
                    </div>
                   <div className="project-item-content">
                       <h6>Where communities bridge the sky</h6>   
                        <h4>Sapphire</h4>
                   </div>
               </div>
           </div>
           
           <div className="projects-items" data-filter="hospitality">
              <div className="projects-items-controls">
                   <div className="project-image-wrap">
                        <div className="wrap-box"></div>
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4583d634063352.56c2f1a60fea8.jpg"/>
                    </div>
                   <div className="project-item-content">
                       <h6>Where communities bridge the sky</h6>   
                        <h4>Sapphire</h4>
                   </div>
               </div>
           </div>
           
           <div className="projects-items" data-filter="hospitality">
              <div className="projects-items-controls">
                   <div className="project-image-wrap">
                        <div className="wrap-box"></div>
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4583d634063352.56c2f1a60fea8.jpg"/>
                    </div>
                   <div className="project-item-content">
                       <h6>Where communities bridge the sky</h6>   
                        <h4>Sapphire</h4>
                   </div>
               </div>
           </div>
           
           <div className="projects-items" data-filter="hospitality">
              <div className="projects-items-controls">
                   <div className="project-image-wrap">
                        <div className="wrap-box"></div>
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4583d634063352.56c2f1a60fea8.jpg"/>
                    </div>
                   <div className="project-item-content">
                       <h6>Where communities bridge the sky</h6>   
                        <h4>Sapphire</h4>
                   </div>
               </div>
           </div>
           
           <div className="projects-items" data-filter="hospitality">
              <div className="projects-items-controls">
                   <div className="project-image-wrap">
                        <div className="wrap-box"></div>
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4583d634063352.56c2f1a60fea8.jpg"/>
                    </div>
                   <div className="project-item-content">
                       <h6>Where communities bridge the sky</h6>   
                        <h4>Sapphire</h4>
                   </div>
               </div>
           </div>
           
           <div className="projects-items" data-filter="hospitality">
              <div className="projects-items-controls">
                   <div className="project-image-wrap">
                        <div className="wrap-box"></div>
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4583d634063352.56c2f1a60fea8.jpg"/>
                    </div>
                   <div className="project-item-content">
                       <h6>Where communities bridge the sky</h6>   
                        <h4>Sapphire</h4>
                   </div>
               </div>
           </div>
           
           <div className="projects-items" data-filter="hospitality">
              <div className="projects-items-controls">
                   <div className="project-image-wrap">
                        <div className="wrap-box"></div>
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4583d634063352.56c2f1a60fea8.jpg"/>
                    </div>
                   <div className="project-item-content">
                       <h6>Where communities bridge the sky</h6>   
                        <h4>Sapphire</h4>
                   </div>
               </div>
           </div>
           
           <div className="projects-items" data-filter="hospitality">
              <div className="projects-items-controls">
                   <div className="project-image-wrap">
                        <div className="wrap-box"></div>
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4583d634063352.56c2f1a60fea8.jpg"/>
                    </div>
                   <div className="project-item-content">
                       <h6>Where communities bridge the sky</h6>   
                        <h4>Sapphire</h4>
                   </div>
               </div>
           </div>
           
       </div>
       </div>
        </div>
        </>
    )

}