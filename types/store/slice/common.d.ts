import { RootState } from "@/store/rootReducer";
type InitialState = {
  show_emoji: boolean;
  mode: "dark" | "light";
  show_user_profile: boolean;
  show_profile_upload_modal: boolean;
  show_profile_drop_down: boolean;
  show_create_group_drop_down: boolean;
  show_notification_modal: boolean;
};

type IBaseResponse = {
  success: boolean;
  error?: any;
};

type IThunkApiConfig = {
  state: RootState;
};
export { InitialState, IBaseResponse, IThunkApiConfig };
