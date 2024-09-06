'use client';
import { useEffect } from "react";

export default function LightTheme(){

    useEffect(()=>{
        document.querySelector('body').classList.remove('dark');
    })

}