'use client';
import dynamic from "next/dynamic";
import { ready } from "jquery";

const IdeasComponent = dynamic(() => import("path_to_dynamicComponent"));


export default  function Ideas(){

    return IdeasComponent;

}