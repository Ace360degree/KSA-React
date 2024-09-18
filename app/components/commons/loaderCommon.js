import '../../loader.css'

export default function CommonLoader(){

    return(
        <>
             <div className="loader-box" >
             <div className="spinner-box spinner-center">
                    <div className="pulse-container">  
                        <div className="pulse-bubble pulse-bubble-1"></div>
                        <div className="pulse-bubble pulse-bubble-2"></div>
                        <div className="pulse-bubble pulse-bubble-3"></div>
                    </div>
                </div>
             </div>
        </>
    )

}