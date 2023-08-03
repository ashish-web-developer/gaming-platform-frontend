// types
import type { InitialState } from "@/types/store/slice/chat";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";
import type { RootState } from "@/store/rootReducer";

// Redux
import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialState = {
  users: [],
  mobile_navigation: 0,
  active_user: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateUsersList: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateMobileNavigation: (state, action: PayloadAction<number>) => {
      state.mobile_navigation = action.payload;
    },
    updateActiveUser: (state, action: PayloadAction<User>) => {
      state.active_user = action.payload;
    },
  },
});

export default chatSlice.reducer;
export const users = (state: RootState) => state.chat.users;
export const mobile_navigation = (state: RootState) =>
  state.chat.mobile_navigation;
export const active_user = (state: RootState) => state.chat.active_user;
export const { updateUsersList, updateMobileNavigation, updateActiveUser } =
  chatSlice.actions;
