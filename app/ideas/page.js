'use client';
import dynamic from "next/dynamic";
import IdeasComponent from "./ideasComponent";
import { ready } from "jquery";

const IdeasComponent = dynamic(() => import("./ideasComponent"));


export default  function Ideas(){

    return IdeasComponent;

}