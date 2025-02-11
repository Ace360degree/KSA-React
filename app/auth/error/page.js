'use client';
import DarkTheme from "@/app/components/body/darkTheme";
import Link from "next/link";


export default function ErrorPageAuth(){

    return(
        <>
            <DarkTheme/>
            <div className="text-center signifier container d-flex align-items-center flex-column justify-content-center" style={{height:'100vh'}}>
                <h2>Login Failed!</h2>
                <p>Please try again later.</p>
                <Link href={'/auth/login'}><button className="btn btn-light px-4">Back to Login</button></Link>
            </div>
        </>
    )

}