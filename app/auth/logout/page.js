// app/auth/logout/page.js
'use client';
import dynamic from "next/dynamic";

const DynamicLogout = dynamic(() => import('./dynamicLogout'), {
  ssr: false,
});

export default function LogoutPage() {
  return <DynamicLogout/>
}
