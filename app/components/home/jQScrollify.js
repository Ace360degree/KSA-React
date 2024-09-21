'use client';
import { useEffect } from "react";
import $ from 'jquery';
import 'jquery-scrollify';


export default function ScrollifyComponent(){
    useEffect(()=>{
        $(document).ready(function(){
          $.scrollify.enable();
                $.scrollify({
                  section: ".home-snapping",
                  sectionName: "home-snapping",
                  interstitialSection: "",
                  easing: "easeOutExpo",
                  scrollSpeed: 500,
                  offset: 0,
                  scrollbars: true,
                  standardScrollElements: "",
                  setHeights: true,
                  overflowScroll: true,
                  updateHash: false,
                  touchScroll: true,
                });
        });
       
      },[])

    return;
}