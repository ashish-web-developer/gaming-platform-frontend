// types
import type { InitialState } from "@/types/store/slice/chat";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";
import type { RootState } from "@/store/rootReducer";


// Redux
import { createSlice } from "@reduxjs/toolkit";




const initialState:InitialState = {
    users:[]
}

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        updateUsersList:(state,action:PayloadAction<User>)=>{
            state.users.push(action.payload);
        }
    }
})


export default chatSlice.reducer;
export const users = (state:RootState)=>state.chat.users;
export const {updateUsersList} = chatSlice.actions;