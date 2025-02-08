
import { createSlice } from "@reduxjs/toolkit";


const IdeasSlicer = createSlice({

    name:'ideas',
    initialState:{
        ideaid:null,
        selected:null,
        category:'All',
        image:null,
    },
    reducers:{
        setIdeaId(state,action){
            state.ideaid = action.payload;
        },
        setSelected(state,action){
            state.selected = action.payload;
        },
        setCategory(state,action){
            state.category = action.payload;
        },
        setImage:(state,action)=>{
            state.image = action.payload;
        }
    }

})

export const {setCategory,setSelected,setIdeaId,setImage} = IdeasSlicer.actions;

export default IdeasSlicer.reducer;