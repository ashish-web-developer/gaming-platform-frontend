import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { loginInitialState } from "@/types/redux";
import type { RootState } from "./rootReducer";


const initialState:loginInitialState = {
    showModal:true,
    name:null,
    username:null,
    email:null,
    password:null,
}

export const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        toggleModal:(state,action:PayloadAction<boolean>)=>{
            state.showModal = action.payload;
        },
        updateName:(state,action:PayloadAction<string>)=>{
            state.name = action.payload;
        },
        updateUserName:(state,action:PayloadAction<string>)=>{
            state.username = action.payload;
        },
        updateEmail:(state,action:PayloadAction<string>)=>{
            state.email = action.payload;
        },
        updatePassword:(state,action:PayloadAction<string>)=>{
            state.password = action.payload;
        }
    }
})


export const {toggleModal,updateName,updateUserName,updateEmail,updatePassword}  = loginSlice.actions;
export const showModal = (state:RootState) => state.login.showModal;
export const name = (state:RootState) => state.login.name;
export const username = (state:RootState) => state.login.username;
export const email = (state:RootState) => state.login.email;
export const password = (state:RootState) => state.login.password;
export default loginSlice.reducer;