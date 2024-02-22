import { RootState } from "@/store/rootReducer";
type InitialState = {
  showEmoji: boolean;
  mode: "dark" | "light";
  show_user_profile: boolean;
  show_profile_upload_modal: boolean;
  show_profile_drop_down: boolean;
  show_create_group_drop_down: boolean;
};

type IBaseResponse = {
  success: boolean;
  error?: any;
};

type ThunkApiConfig = {
  state: RootState;
};
export { InitialState, IBaseResponse, ThunkApiConfig };
