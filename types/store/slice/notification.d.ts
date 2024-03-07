// types
import { IGroup } from "@/types/store/slice/chat";

interface INotificationDataType {
  group?: IGroup;
  message: string;
}

type INotification = {
  id: string;
  type: "info" | "group-invite" | "group-join-request";
  notifiable_type: string;
  notifiable_id: number;
  data: INotificationDataType;
  read_at: string;
  created_at: string;
  updated_at: string;
};

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

export default INotificationInitialState;

export {
  INotification,
  INotificationResponse,
  IRemoveNotificationPayload,
  IRemoveNotificationResponse,
};
