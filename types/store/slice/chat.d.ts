// types
import type { User } from "@/types/user";

type IConversation = {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  viewed: boolean;
  created_at: string;
  updated_at: string;
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
  latest_conversation?: IConversation;
  not_viewed: number;
};

type IChatInitialState = {
  search_input_value: string;
  is_typing: boolean;
  fetch_user: {
    is_request_pending: boolean;
    fetched_user_result: IUsersWithConversation[];
    page: number;
  };
  default_users: IUsersWithConversation[];
  active_user: IUsersWithConversation | null;
  active_user_conversation: IConversation[];
  show_user_profile: boolean;
  show_profile_upload_modal: boolean;
  send_message: {
    is_request_pending: boolean;
  };
  game_snackbar: {
    show_memory_game_snackbar: boolean;
  };
  mobile: {
    show_chat: boolean;
  };
  show_emoji: boolean;
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

type IFetchMessagesResponse = {
  success: boolean;
  conversation: IConversation[];
};

type ISendMessageRequest = {
  message: string;
};
type ISendMessageResponse = {
  success: boolean;
  conversation: IConversation;
};

type IUpdateViewRequest = {
  conversation_id: number;
};
type IUpdateViewResponse = {
  success: boolean;
  conversation: IConversation;
};

type ISendInvitationApiRequest = {
  game: string;
};

type ISendInvitationApiResponse = {
  success: boolean;
  message: string;
};
type IAcceptInvitationApiRequest = {
  is_accepted: boolean;
};
type IAcceptInvitationApiResponse = {
  success: boolean;
  message: string;
};

export default IChatInitialState;
export {
  IFetchUserResponse,
  IFetchDefaultUserResponse,
  IConversation,
  IUsersWithConversation,
  IFetchMessagesResponse,
  ISendMessageRequest,
  ISendMessageResponse,
  IUpdateViewRequest,
  IUpdateViewResponse,
  ISendInvitationApiRequest,
  ISendInvitationApiResponse,
  IAcceptInvitationApiRequest,
  IAcceptInvitationApiResponse,
};
