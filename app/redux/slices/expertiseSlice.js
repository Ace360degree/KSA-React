import { createSlice } from "@reduxjs/toolkit";

const expertiseSlice = createSlice({
    name:'expertise',
    initialState:{
        selected:null,
        projectIndex:null,
    },
    reducers:{
        setSelected:(state,action)=>{
            state.selected = action.payload;
        },
        setProjectIndex:(state,action)=>{
            state.projectIndex = action.payload;
        }        
    }
});

export const {setProjectIndex,setSelected} = expertiseSlice.actions;
export default expertiseSlice.reducer;