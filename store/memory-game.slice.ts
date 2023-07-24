import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";


const initialState = {
    cards :[]
}
export const memoryGameSlice = createSlice({
    name:"memory-game-slice",
    initialState,
    reducers:{
        updateCard:(state,action)=>{
            state.cards.push(action.payload);
        },
        removeCard:(state,action) =>{
            state.cards.filter((element)=>{
                return element == action.payload;
            })
        }
    }
})


export const {updateCard,removeCard} = memoryGameSlice.actions;
export const cards = (state:RootState) => state.memoryGame.cards;
export default memoryGameSlice.reducer;