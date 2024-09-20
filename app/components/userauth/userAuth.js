import { cookies } from "next/headers";
import SetUserAuth from "./setUserAuth";

export default function UserAuthorization(){


    const cookieStore = cookies();
    const userLoggedin = cookieStore.get('isLogin');
    let  userLoggedinTrue = false;
    if(userLoggedin && userLoggedin.value==true){
        userLoggedinTrue = userLoggedin.value;
    }

    return(
        <>
            {userLoggedinTrue ? <SetUserAuth/>:''}
        </>
    );

}