'use client';

import DarkTheme from "../components/body/darkTheme";
import NavbarIntroPage from "../components/NavbarIntroPage";
import { LuArrowRightCircle } from "react-icons/lu";



export default function Policies(){

    return(
    <>  
        <DarkTheme/>
        <NavbarIntroPage/>
        <div className="header-gap"></div>
        <div className="container" style={{maxWidth:'850px'}}>
        <div className="policies-page">
            <h2 className="policy-border-title">Policies</h2>
            <div>
                <a href="./files/privacy_policy.pdf" target="_blank"><div className="policy-item">
                    Privacy Policy <LuArrowRightCircle   className="policy-downloadicon"/>

                </div>
                </a>
                <a href="./files/Terms and Conditions.pdf" target="_blank">
                <div className="policy-item">
                    Terms & Conditions <LuArrowRightCircle  className="policy-downloadicon" />

                </div>
                </a>
                <a href="./files/Intellectual Property Policy.pdf" target="_blank">
                    <div className="policy-item">
                        Intellectual Property Policy <LuArrowRightCircle  className="policy-downloadicon" />

                    </div>
                </a>
                </div>
            </div>
        </div>
    </>
    );

} 