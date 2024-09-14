

export default function ProjectSection({section,slides}){


        {if(section.section_type==1){

            return (
                <>
                <div class="project-info-section my-1 project-border-bottom">
                    <div class="row m-0 g-0">
                        <div class="col-md-7">
                            <div class="project-image-info p-4" >
                                <h2>{section.section_title}</h2>
                                <h4>{section.content}</h4>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="project-info-image">
                                <img src="<?= base_url().$row->image?>"/>
                            </div>
                        </div>
                    </div>
                    </div>
                </>
            )
        }
        else if(section.section_type==2){
            return(
                <>
                <div class="project-info-section my-1 project-border-bottom">
                    <div class="row m-0 g-0">
                        <div class="col-md-7">
                            <div class="project-image-info p-4" >
                                <h2>{section.section_title}</h2>
                                <h4>{section.content}</h4>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="project-info-image">
                                <img src="<?= base_url().$row->image?>"/>
                            </div>
                        </div>
                    </div>
                    </div>
                </>
            )
        }

        else if(section.section_type==3){
            return(
                <>
                    <div class="project-info-section position-relative">
                        <img class="project-slider-img" src={process.env.NEXT_PUBLIC_SITE_URL+section.section_image}/>
                    </div>
                </>
            )
        }

        else if(section.section_type==4){
            return(
                <>  
                    {slides.slides.length!=0 ?
                    <div className="project-info-section position-relative">
                        {slides.slides.map((slide,index)=>(
                        <img key={index} className="project-slider-img" src={process.env.NEXT_PUBLIC_SITE_URL+section.section_image}/>
                        ))}    
                    </div>
                    
                    :""}
                </>
            )
        }
    }
        

}