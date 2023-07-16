import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "@/store/login.slice";
import userReducer from "@/store/user.slice";


const store = configureStore({
    reducer:{
        login:loginReducer,
        user:userReducer
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
export default store;