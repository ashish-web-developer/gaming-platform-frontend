// types
import type { InitialState } from "@/types/store/slice/common";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/rootReducer";
import type { User } from "@/types/user";
import type { AxiosResponse } from "axios";
// redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUser } from "@/store/slice/user.slice";

// helpers
import { Axios } from "@/helpers/axios";
export const updateProfileApi = createAsyncThunk<
  {
    success: boolean;
    message: string;
    user: User;
    error?: any;
  },
  {
    form_data: FormData;
  }
>(
  "api/user/update-profile",
  async ({ form_data }, { rejectWithValue, dispatch }) => {
    try {
      const response: AxiosResponse<{
        success: boolean;
        message: string;
        user: User;
        error?: any;
      }> = await Axios.post("/user/update-profile", form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(updateUser(response.data.user));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState: InitialState = {
  show_emoji: false,
  mode: "dark",
  show_profile_upload_modal: false,
  show_profile_drop_down: false,
  show_create_group_drop_down: false,
  show_notification_modal: false,
  mobile: {
    show_profile: false,
  },
};
export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateShowEmoji: (state, action: PayloadAction<boolean>) => {
      state.show_emoji = action.payload;
    },
    updateMode: (state, action: PayloadAction<"dark" | "light">) => {
      state.mode = action.payload;
    },
    updateShowProfileUploadModal: (state, action: PayloadAction<boolean>) => {
      state.show_profile_upload_modal = action.payload;
    },
    updateShowProfileDropDown: (state, action: PayloadAction<boolean>) => {
      state.show_profile_drop_down = action.payload;
    },
    updateShowCreateGroupDrownDown: (state, action: PayloadAction<boolean>) => {
      state.show_create_group_drop_down = action.payload;
    },
    updateShowNotification: (state, action: PayloadAction<boolean>) => {
      state.show_notification_modal = action.payload;
    },
    updateShowMobileProfile: (state, action: PayloadAction<boolean>) => {
      state.mobile.show_profile = action.payload;
    },
  },
});

// reducer
export default commonSlice.reducer;

// selector
export const show_emoji = (state: RootState) => state.common.show_emoji;
export const mode = (state: RootState) => state.common.mode;
export const show_profile_upload_modal = (state: RootState) =>
  state.common.show_profile_upload_modal;
export const show_profile_drop_down = (state: RootState) =>
  state.common.show_profile_drop_down;
export const show_create_group_drop_down = (state: RootState) =>
  state.common.show_create_group_drop_down;
export const show_notification_modal = (state: RootState) =>
  state.common.show_notification_modal;
export const show_mobile_profile = (state: RootState) =>
  state.common.mobile.show_profile;

// action creator
export const {
  updateShowEmoji,
  updateMode,
  updateShowProfileUploadModal,
  updateShowProfileDropDown,
  updateShowCreateGroupDrownDown,
  updateShowNotification,
  updateShowMobileProfile,
} = commonSlice.actions;
