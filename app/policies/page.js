'use client';

import '../legal.css';
import DarkTheme from "../components/body/darkTheme";
import NavbarIntroPage from "../components/NavbarIntroPage";
import { LuArrowRightCircle } from "react-icons/lu";



export default function Policies(){

    return(
    <>  
        <DarkTheme/>
        <NavbarIntroPage heading={'Policies'}/>
        <ul className='top-section-filter'>
            <li className='filter-trigger active' style={{fontFamily:'Signifier'}} id="cultureTrigger"  data-target="#culture">Legal </li>
            <li className='filter-trigger active' style={{fontFamily:'Signifier'}} id="disciplineTrigger" data-target="#discipline">Polices</li>
        </ul>
        <div className="container" style={{maxWidth:'850px'}}>
            
        <div className="policies-page signifier">
            <div>
                <a href={process.env.NEXT_PUBLIC_SITE_URL+'uploads/policies/KSA V1.0 _Privacy Policy.pdf'} target="_blank">
                <div className="policy-item">
                    Privacy Policy 

                </div>
                </a>
                <a href={process.env.NEXT_PUBLIC_SITE_URL+'uploads/policies/KSA V1.0 _Terms of Use.pdf'} target="_blank">
                    <div className="policy-item">
                        Terms of Use
                    </div>
                </a>
                <a href={process.env.NEXT_PUBLIC_SITE_URL+'uploads/policies/KSA V1.0 _Cookie List.pdf'} target="_blank">
                    <div className="policy-item">
                        Cookie Policy
                    </div>
                </a>

                <a href={process.env.NEXT_PUBLIC_SITE_URL+'uploads/policies/KSA V1.0 _Human Rights.pdf'} target="_blank">
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