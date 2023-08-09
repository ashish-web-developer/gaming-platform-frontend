import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import type { User } from "@/types/user";
import { RootState } from "../rootReducer";
import { Axios } from "@/helpers/axios";

const initialState: { user: User } = {
  user: {
    id: null,
    name: null,
    username: null,
    email: null,
    admin: 0,
    email_verified_at: null,
    created_at: null,
    updated_at: null,
  },
};

export const getUser = createAsyncThunk<User, undefined>(
  "api/user",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await Axios.get("/user");
      dispatch(updateUser(res.data));
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;
export const user = (state: RootState) => state.user.user;
export default userSlice.reducer;
