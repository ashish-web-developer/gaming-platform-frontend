import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "@/store/slice/login.slice";
import userReducer from "@/store/slice/user.slice";
import memoryGameReducer from "@/store/slice/memory-game.slice";
import chatReducer from "@/store/slice/chat.slice";
import commonReducer from "@/store/slice/common.slice";

const store = configureStore({
  reducer: {
    common: commonReducer,
    login: loginReducer,
    user: userReducer,
    memoryGame: memoryGameReducer,
    chat: chatReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
