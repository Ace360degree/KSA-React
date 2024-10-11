'use client';
import dynamic from "next/dynamic";

const IdeasComponent = dynamic(() => import("./ideasComponent"),{ssr: false,});


export default  function Ideas(){

    return <IdeasComponent/>;

}