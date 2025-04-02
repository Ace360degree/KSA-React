'use client';
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function CheckUserStatus(){

    const {data:session} = useSession();
    useEffect(()=>{
    if(session) {
            const checkStatus = async()=>{
                const getStatus = await fetch('/api/auth/check',{
                    method:'POST',
                    body:JSON.stringify({"email":session.user.email}),
                })

                const userStatus = await getStatus.json();
                if(userStatus.data.status!=1){
                    signOut();
                }
            }
            setInterval(checkStatus,3000*10);
    }
    },[session])


    return null;
}