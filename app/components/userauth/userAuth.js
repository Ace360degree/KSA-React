import { cookies } from "next/headers";
import SetUserAuth from "./setUserAuth";

export default function UserAuthorization(){


    const cookieStore = cookies();
    const userLoggedin = cookieStore.get('isLogin');
    

    return(
        <>
            {userLoggedin.value===true ? <SetUserAuth/>:''}
        </>
    );

}