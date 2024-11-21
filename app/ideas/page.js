'use client';
import dynamic from "next/dynamic";
import { useVisitedIdeasStore } from "../states/store/ideasStore";

const IdeasComponent = dynamic(() => import("./ideasComponent"),{ssr: false,});
const IdeasIntro = dynamic(() => import("./ideasIntro"),{ssr: false,});

export default  function Ideas(){

    const {visited} = useVisitedIdeasStore();

    return (
    <>
    {!visited? <IdeasIntro/> :''}
    <IdeasComponent/>
    </>
    )
}