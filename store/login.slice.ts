import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { loginInitialState } from "@/types/redux";
import type { RootState } from "./rootReducer";


const initialState:loginInitialState = {
    showModal:true,
}

export const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        toggleModal:(state,action:PayloadAction<boolean>)=>{
            state.showModal = action.payload;
        }
    }
})


export const {toggleModal}  = loginSlice.actions;
export const showModal = (state:RootState) => state.login.showModal;
export default loginSlice.reducer;