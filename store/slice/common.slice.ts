// types
import type { InitialState } from "@/types/store/slice/common";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/rootReducer";
// redux
import { createSlice } from "@reduxjs/toolkit";

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
export const showEmoji = (state: RootState) => state.common.show_emoji;
export const mode = (state: RootState) => state.common.mode;
export const showProfileUploadModal = (state: RootState) =>
  state.common.show_profile_upload_modal;
export const showProfileDropDown = (state: RootState) =>
  state.common.show_profile_drop_down;
export const showCreateGroupDropdown = (state: RootState) =>
  state.common.show_create_group_drop_down;
export const showNotificationModal = (state: RootState) =>
  state.common.show_notification_modal;
export const showMobileProfile = (state: RootState) =>
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
