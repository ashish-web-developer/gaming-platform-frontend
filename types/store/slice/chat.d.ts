// types
import { IBaseResponse } from "@/types/store/slice/common";
import type { User } from "@/types/user";

type IConversation = {
  id: number;
  sender_id: number;
  receiver_id: number;
  receiver?: IUsersWithConversation;
  sender?: IUsersWithConversation;
  group_id?: number;
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
  avatar_url: string;
  earned_points: number;
};

type IUserGroup = {
  id: number;
  user_id: number;
  group_id: number;
  user?: IUsersWithConversation;
  created_at: string;
  updated_at: string;
};

type IGroup = {
  id: number;
  group_name: string;
  admin?: IUsersWithConversation;
  admin_id: number;
  user_group: IUserGroup[];
  latest_conversation: IConversation | null;
  group_color: string;
  created_at: string;
  updated_at: string;
};

interface INotificationDataType {
  group?: IGroup;
  message: string;
}

type INotification = {
  id: string;
  type: "info" | "group-invite";
  notifiable_type: string;
  notifiable_id: number;
  data: INotificationDataType;
  read_at: string;
  created_at: string;
  updated_at: string;
};

type IChatInitialState = {
  is_typing: boolean;
  fetch_user: {
    is_request_pending: boolean;
    fetched_user_result: IUsersWithConversation[];
    fetch_type: "chat" | "group" | null;
    page: number;
  };
  default_users: IUsersWithConversation[];
  default_groups: IGroup[];
  recommended_groups: IGroup[];
  active_user: IUsersWithConversation | null;
  active_group: IGroup | null;
  active_conversation: IConversation[];
  notifications: INotification[];
  send_message: {
    is_request_pending: boolean;
  };
  game_snackbar: {
    show_memory_game_snackbar: boolean;
  };
  mobile: {
    show_chat: boolean;
  };
};

type IFetchUserPayload = {
  fetch_type: "chat" | "group";
  query: string;
};

type IFetchUserResponse = IBaseResponse & {
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

/**
 * ===== GROUP API =======
 */
type IGetGroupResponse = IBaseResponse & {
  groups: IGroup[];
};

type IGetGroupRecommendationResponse = IGetGroupResponse;
type ICreateGroupPayload = {
  user_ids: Array<number>;
  group_name: string;
};
type ICreateGroupResponse = IBaseResponse & {
  message: string;
};

type IJoinGroupPayload = {
  notification_id?: string;
  group_id: number;
};

type IJoinGroupResponse = IBaseResponse & {
  message: string;
  group: IGroup;
};

/**
 * ====== NOTIFICATION API ======
 */

type INotificationResponse = IBaseResponse & {
  notifications: INotification[];
};

type IRemoveNotificationPayload = {
  notification_id: string;
};

type IRemoveNotificationResponse = IBaseResponse & {
  message?: string;
};

/**
 * ==== SEND MESSAGE API =====
 */

type ISendMessagePayload = {
  message: string;
};

type ISendMessageResponse = IBaseResponse & {
  conversation: IConversation;
};

export default IChatInitialState;
export {
  IConversation,
  IUsersWithConversation,
  IGroup,
  IUserGroup,
  IJoinGroupPayload,
  IJoinGroupResponse,
  INotification,
  IFetchUserPayload,
  IFetchUserResponse,
  IFetchDefaultUserResponse,
  IFetchMessagesResponse,
  IUpdateViewRequest,
  IUpdateViewResponse,
  ISendInvitationApiRequest,
  ISendInvitationApiResponse,
  IAcceptInvitationApiRequest,
  IAcceptInvitationApiResponse,
  IGetGroupResponse,
  IGetGroupRecommendationResponse,
  ICreateGroupPayload,
  ICreateGroupResponse,
  INotificationResponse,
  IRemoveNotificationPayload,
  IRemoveNotificationResponse,
  ISendMessagePayload,
  ISendMessageResponse,
};
