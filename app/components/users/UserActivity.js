'use client';

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function UserActivity(){

    const location = usePathname();
    const {data:session} = useSession();

    useEffect(()=>{
        if(session){
                const form = new FormData();
                form.append('user_id',session.user.id);
                form.append('pathname',location);
                const setUserData = async()=>{
                const submitData = await fetch('/api/user/submitactivity',{
                    method:'POST',
                    body:form,
                
                });
                const response = await submitData.json();
                if(!response.status=='success'){
                    console.error('Something went Wrong. Could not Submit User Data');
                }
            }
            setUserData();
        }
        
    },[location]);

}