import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// types
import type { RootState } from "@/store/rootReducer";
import type { PayloadAction } from "@reduxjs/toolkit";
import type INotificationInitialState from "@/types/store/slice/notification";
import type {
  INotification,
  INotificationResponse,
  IRemoveNotificationPayload,
  IRemoveNotificationResponse,
  IMarkNotificationAsReadApiPayload,
  IMarkNotificationAsReadApiResponse,
} from "@/types/store/slice/notification";
import type { IThunkApiConfig } from "@/types/store/slice/common";
import type { AxiosResponse } from "axios";

// api
import { joinGroupApi, giveGroupAccess } from "@/store/slice/group.slice";

// helpers
import { Axios } from "@/helpers/axios";

export const getNotificationApi = createAsyncThunk<
  INotificationResponse,
  undefined,
  IThunkApiConfig
>("api/notification/get-notification", async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<INotificationResponse> = await Axios.get(
      "/notification/get-notification"
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});

export const removeNotificationApi = createAsyncThunk<
  IRemoveNotificationResponse & {
    notification_id: string;
  },
  IRemoveNotificationPayload,
  IThunkApiConfig
>(
  "api/notification/remove-notification",
  async ({ notification_id }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IRemoveNotificationResponse> =
        await Axios.post("/notification/remove-notification", {
          notification_id,
        });
      return {
        ...response.data,
        notification_id,
      };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const markNotificationAsReadApi = createAsyncThunk<
  IMarkNotificationAsReadApiResponse,
  IMarkNotificationAsReadApiPayload,
  IThunkApiConfig
>(
  "api/notification/mark-as-read",
  async ({ notification_id }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IMarkNotificationAsReadApiResponse> =
        await Axios.post("/notification/mark-as-read", {
          notification_id,
        });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState: INotificationInitialState = {
  notifications: [],
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotification: (state, action: PayloadAction<INotification>) => {
      let is_notification_exist = state.notifications.find(
        (element) => element.id == action.payload.id
      );
      if (!is_notification_exist) {
        state.notifications.unshift(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotificationApi.fulfilled, (state, action) => {
      state.notifications = action.payload.notifications;
    });
    builder.addCase(removeNotificationApi.fulfilled, (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload.notification_id
      );
    });
    builder.addCase(joinGroupApi.fulfilled, (state, action) => {
      if (action.payload.notification_id) {
        state.notifications = state.notifications.filter(
          (notification) => notification.id !== action.payload.notification_id
        );
      }
    });
    builder.addCase(giveGroupAccess.fulfilled, (state, action) => {
      state.notifications = state.notifications.filter((notification) => {
        return notification.id !== action.payload.notification_id;
      });
    });
    builder.addCase(markNotificationAsReadApi.fulfilled, (state, action) => {
      state.notifications = state.notifications.map((notification) => {
        if (notification.id == action.payload.notification.id) {
          return action.payload.notification;
        }
        return notification;
      });
    });
  },
});

export default notificationSlice.reducer;

export const notifications = (state: RootState) =>
  state.notification.notifications;

export const { updateNotification } = notificationSlice.actions;
