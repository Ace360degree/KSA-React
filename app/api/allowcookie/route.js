import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req,res){

        // res.setHeader('Set-Cookie', 'acceptedCookies=true; Path=/; HttpOnly; SameSite=Strict; Max-Age=31536000');

        cookies().set('acceptedCookies',true,{ maxAge: 20*24*60*60 });

        return NextResponse.json({status:'ok',message:'cookie-set-succesffuly'},{status:200});
}