import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user: localStorage.getItem("user") ?? JSON.parse(localStorage.getItem("user")) | null,
    loading:false,
    playList:[],
}

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload
            //localStorage.setItem("user",JSON.stringify(value.payload));
        },
        addPlayList:(state,action)=>{
            state.playList.push(action.payload);
        },
        removePlayList:(state,action)=>{
            return state.playList.filter((item) => item.id !== action.payload);
        },
    }
});

export const {setUser,addPlayList,removePlayList} = profileSlice.actions;
export default profileSlice.reducer;