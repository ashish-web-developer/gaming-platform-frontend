import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "@/store/login.slice";


const store = configureStore({
    reducer:{
        login:loginReducer
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
export default store;