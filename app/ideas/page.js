'use client';
import dynamic from "next/dynamic";

const IdeasComponent = dynamic(() => import("./ideasComponent"));


export default  function Ideas(){

    return IdeasComponent;

}