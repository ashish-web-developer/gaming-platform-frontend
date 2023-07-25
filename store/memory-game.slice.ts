import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";

// types
import type { PayloadAction } from "@reduxjs/toolkit";





const initialState = {
    cardList:{
    }
}
export const memoryGameSlice = createSlice({
    name:"memory-game-slice",
    initialState,
    reducers:{
        updateCard:(state,action:PayloadAction<Object>)=>{
            state.cardList = {...state.cardList,...action.payload}
        },
        removeCard:(state,action) =>{
        }
    }
})


export const {updateCard,removeCard} = memoryGameSlice.actions;
export const cards = (state:RootState) => state.memoryGame.cards;
export default memoryGameSlice.reducer;