// types
import { IBaseResponse } from "@/types/store/slice/common";
import type { User } from "@/types/user";
import { IUser } from "@/types/store/slice/login";

type IUser_ids =
  | {
      id: number;
    }[]
  | {
      id: number;
    };
type IConversation = {
  id: number;
  sender_id: number;
  receiver_id: number;
  receiver?: IUsersWithConversation;
  sender?: IUsersWithConversation;
  group_id?: number;
  message: string | null;
  files: Array<string> | null;
  viewed: boolean;
  created_at: string;
  updated_at: string;
};
type IUsersWithConversation = IUser & {
  latest_conversation?: IConversation;
  not_viewed: number;
};

type IChatInitialState = {
  fetch_user: {
    is_request_pending: boolean;
    fetched_user_result: IUser[];
    fetch_type: "chat" | "group" | null;
    page: number;
  };
  default_users: IUsersWithConversation[];
  active_user: IUsersWithConversation | null;
  active_user_status: boolean;
  active_conversation: IConversation[];
  send_message: {
    is_request_pending: boolean;
  };
  mobile: {
    show_chat: boolean;
    show_search_dialog: boolean;
  };
  invites_dialog: {
    show_poker_invite_dialog: boolean;
  };
  typing_user: IUser | null;
};

type IFetchDefaultUserResponse = {
  success: boolean;
  users: IUsersWithConversation[];
};

type IFetchMessagesResponse = {
  success: boolean;
  conversation: IConversation[];
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
  room_id: string;
};

type ISendInvitationApiResponse = {
  success: boolean;
  room_created_at: string;
  message: string;
};

/**
 * ===== FETCH USER API =======
 */
type IFetchUserApiRequest = {
  query: string;
  fetch_type: "chat" | "group";
};
type IFetchUserApiResponse = IBaseResponse & {
  user_data: {
    data: IUser[];
  };
};

/**
 * ===== GROUP API =======
 */

/**
 * ==== SEND MESSAGE API =====
 */

type ISendMessagePayload = {
  form_data: FormData;
};

type ISendMessageResponse = IBaseResponse & {
  conversation: IConversation;
};

export default IChatInitialState;
export {
  IUser_ids,
  IConversation,
  IUsersWithConversation,
  IFetchDefaultUserResponse,
  IFetchUserApiRequest,
  IFetchUserApiResponse,
  IFetchMessagesResponse,
  IUpdateViewRequest,
  IUpdateViewResponse,
  ISendInvitationApiRequest,
  ISendInvitationApiResponse,
  ISendMessagePayload,
  ISendMessageResponse,
};
