import { createSlice } from "@reduxjs/toolkit";

const initialstate={
        status:false,
        userdata:null
}

const auth=createSlice({
    name:"auth",
    initialState:initialstate,
    reducers:{
            login: (state,action)=>{
                state.status=true,
                state.userdata=action.payload.data
            },
            logout:(state,action)=>{
                state.status=false,
                state.userdata=null
            }
    }
})
export const {login,logout}=auth.actions
export default auth.reducer

