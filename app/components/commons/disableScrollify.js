'use client';
import { useEffect } from "react";
import $ from 'jquery';
import 'jquery-scrollify';


export default function ScrollifyDisabled(){
    useEffect(()=>{
        $(document).ready(function(){

            $.scrollify.move(0);
            $.scrollify.destroy();
    
        });
        
       
      },[])

    return;
}