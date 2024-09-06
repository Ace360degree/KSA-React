'use client';
import { useEffect } from "react";

export default function DarkTheme(){

    useEffect(()=>{
        document.querySelector('body').classList.add('dark');
    })

}