'use client';
import { useUserAuthStore } from "@/app/states/store/userAuthStore";
import { useEffect } from "react";

export default function SetUserAuth(){
    const {loggedin,setLoggedIn} = useUserAuthStore();

    useEffect(()=>{
        setLoggedIn();
        alert('Logged in');
    },[])

    

    return;
}