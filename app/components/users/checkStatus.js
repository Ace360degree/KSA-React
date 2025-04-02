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
                console.log(userStatus.data.length);
                if(userStatus.data.length>0){
                    signOut();
                }
            }
            setInterval(checkStatus,3000*10);
    }
    },[session])


    return null;
}