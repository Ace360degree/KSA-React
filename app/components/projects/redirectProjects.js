'use client';
import { useAuth } from "@/app/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";


export default function RedirectProjects(){

    const router  = useRouter();
    const path = usePathname();
    
    const { isLoggedIn } = useAuth();
  

    useEffect(()=>{
        window.onscroll = function() {
          if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
              // Call your function here
              ReRouteIt();
          }
        };
        console.log(isLoggedIn);
        function ReRouteIt() {
          if(isLoggedIn===false && path==='/expertise'){
            router.push('/auth/login')
          }
        }
      },[])

      return;

}