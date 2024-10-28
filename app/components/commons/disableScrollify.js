'use client';
import { useEffect } from "react";
import $ from 'jquery';
import 'jquery-scrollify';


export default function ScrollifyDisabled(){
    useEffect(() => {
        // Ensure scrollify only initializes if it's available
        if ($.scrollify) {
            // Reset scroll to top and destroy scrollify on mount
            // $.scrollify.move(0);
            $.scrollify.destroy();

            // Clean up by destroying scrollify if needed when component unmounts
            return () => {
                if ($.scrollify) {
                    $.scrollify.destroy();
                }
            };
        }
    }, []);

    return;
}