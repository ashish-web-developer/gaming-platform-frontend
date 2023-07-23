import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "@/store/login.slice";
import userReducer from "@/store/user.slice";
import memoryGameReducer from "@/store/memory-game.slice";


const store = configureStore({
    reducer:{
        login:loginReducer,
        user:userReducer,
        memoryGame:memoryGameReducer
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
export default store;