import type { RootState } from "@/store/rootReducer";
import type { IDeckType } from "@/types/store/slice/poker";

type InitialState = {
  show_emoji: boolean;
  mode: "dark" | "light";
  show_profile_upload_modal: boolean;
  show_profile_drop_down: boolean;
  show_create_group_drop_down: boolean;
  show_notification_modal: boolean;
  mobile: {
    show_profile: boolean;
  };
};

type IBaseResponse = {
  success: boolean;
  whole_deck: IDeckType;
  error?: any;
};

interface IThunkApiConfig<ErrorType = any> {
  state: RootState;
  rejectValue: ErrorType;
}
export { InitialState, IBaseResponse, IThunkApiConfig };
