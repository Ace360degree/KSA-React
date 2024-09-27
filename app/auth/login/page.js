// app/auth/login/page.js
'use client';
import dynamic from "next/dynamic";

const DynamicLogin = dynamic(() => import('./dynimcLogin'), {
  ssr: false,
});


export default function LoginPage() {
  
  return(<>
    <DynamicLogin/>
  </>)
}
