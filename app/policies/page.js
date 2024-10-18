'use client';

import '../legal.css';
import DarkTheme from "../components/body/darkTheme";
import NavbarIntroPage from "../components/NavbarIntroPage";
import { LuArrowRightCircle } from "react-icons/lu";



export default function Policies(){

    return(
    <>  
        <DarkTheme/>
        <NavbarIntroPage heading={'Legal'}/>
        <ul className='top-section-filter'>
            <li className='filter-trigger active' style={{fontFamily:'Signifier'}} id="cultureTrigger"  data-target="#culture">Legal </li>
            <li className='filter-trigger active' style={{fontFamily:'Signifier'}} id="disciplineTrigger" data-target="#discipline">Polices</li>
        </ul>
        <div className="container" style={{maxWidth:'850px'}}>
            
        <div className="policies-page signifier">
            <div>
                <a href="./files/privacy_policy.pdf" target="_blank"><div className="policy-item">
                    Privacy Policy 

                </div>
                </a>
                <a href="./files/Terms and Conditions.pdf" target="_blank">
                <div className="policy-item">
                    Terms & Conditions

                </div>
                </a>
                <a href="./files/Intellectual Property Policy.pdf" target="_blank">
                    <div className="policy-item">
                        Intellectual Property Policy

                    </div>
                </a>

                <a href="./files/Intellectual Property Policy.pdf" target="_blank">
                    <div className="policy-item">
                        Human Rights Policy

                    </div>
                </a>
                </div>
                <div class="legal-bottom signifier">Legal and Policies © 2024 KSA. All Rights Reserved </div>

            </div>


        </div>
    </>
    );

} 