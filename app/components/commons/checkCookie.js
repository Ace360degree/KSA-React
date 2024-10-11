
import { cookies } from "next/headers";
import CookieWindow from "./cookieWindow";

export default function CheckCookie(){

    const cookieStore = cookies()
    const acceptedCookies = cookieStore.get('acceptedCookies');

    if(!acceptedCookies){
        return <CookieWindow/>
    }

}
