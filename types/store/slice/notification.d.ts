// types
import type { IGroup } from "@/types/store/slice/group";
import type { IUsersWithConversation } from "@/types/store/slice/chat";
import { IBaseResponse } from "./common";

type INotificationInfoDataType = {
  message: string;
};

type INotificationGroupInviteDataType = {
  message: string;
  group: IGroup;
};

type INotificationGroupJoinRequestType = {
  user: IUsersWithConversation;
  group: IGroup;
  message: string;
};

type INotification = {
  id: string;
  notifiable_type: string;
  notifiable_id: number;
  read_at: string | null;
  created_at: string;
  updated_at: string;
} & (
  | {
      type: "info";
      data: INotificationInfoDataType;
    }
  | {
      type: "group-invite";
      data: INotificationGroupInviteDataType;
    }
  | {
      type: "group-join-request";
      data: INotificationGroupJoinRequestType;
    }
);

type INotificationInitialState = {
  notifications: INotification[];
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

type IMarkNotificationAsReadApiPayload = {
  notification_id: string;
};
type IMarkNotificationAsReadApiResponse = IBaseResponse & {
  notification: INotification;
};

export default INotificationInitialState;

export {
  INotification,
  INotificationResponse,
  IRemoveNotificationPayload,
  IRemoveNotificationResponse,
  IMarkNotificationAsReadApiPayload,
  IMarkNotificationAsReadApiResponse,
};
