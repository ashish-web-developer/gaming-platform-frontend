// types
import type { User } from "@/types/user";

type IChatInitialState = {
  search_input_value: string;
  page: number;
  fetched_user_result: User[];
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
