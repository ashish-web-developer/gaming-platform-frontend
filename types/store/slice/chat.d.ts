// types
import type { User } from "@/types/user";

type IConversation = {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
};
type IUsersWithConversation = {
  id: number;
  name: string;
  username: string;
  email: string;
  admin: 1 | 0;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  sent_messages?: IConversation[];
  received_messages?: IConversation[];
};

type IChatInitialState = {
  search_input_value: string;
  fetch_user: {
    is_request_pending: boolean;
    fetched_user_result: IUsersWithConversation[];
    page: number;
  };
  default_users: IUsersWithConversation[];
};

type IFetchUserResponse = {
  success: boolean;
  user_data: {
    current_page: number;
    data: Array<IUsersWithConversation>;
  };
};

type IFetchDefaultUserResponse = {
  success: boolean;
  users: IUsersWithConversation[];
};

export default IChatInitialState;
export {
  IFetchUserResponse,
  IFetchDefaultUserResponse,
  IConversation,
  IUsersWithConversation,
};
