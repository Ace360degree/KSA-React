'use client'
import LightTheme from "@/app/components/body/lightTheme";
import NavbarIntroPage from "@/app/components/NavbarIntroPage";

export default function ProjectInfo(){

    // const params = useSearchParams();
    // const urlParams = params.get('slug');

    // useEffect(()=>{
        
    //     async function getcurrentProject(){
    //         const reqBody = JSON.stringify({'slug':urlParams});
    //         const fetchProject = await fetch('api/get-projects/getsingle',{method:'POST',body:reqBody,headers: {
    //             'Content-Type': 'application/json',
    //           },})
    //         const getProject = await (fetchProject.json());

    //         console.log(getProject);
    //     }

    //     getcurrentProject();
        
    // },[])

    return (
        <>  
            <LightTheme/>
            <NavbarIntroPage/>
            <div class="project-banner">
               <div class="project-title"><h2>Test Project</h2>
               <h4 class="fw-light m-0"></h4>Lorem Lipsum</div>
                <img class="project-image-hero" src="https://png.pngtree.com/background/20230618/original/pngtree-building-in-progress-3d-render-of-a-construction-project-on-blueprints-picture-image_3750782.jpg" />
            </div>
        </>
    )


}