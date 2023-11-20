// types
import type { User } from "@/types/user";

type IChatInitialState = {
  search_input_value: string;
  fetch_user: {
    is_request_pending: boolean;
    fetched_user_result: User[];
    page: number;
  };
};

type IFetchUserResponse = {
  success: boolean;
  user_data: {
    current_page: number;
    data: Array<User>;
  };
};

export default IChatInitialState;
export { IFetchUserResponse };
