// types
import { IBaseResponse } from "@/types/store/slice/common";
import { IUsersWithConversation } from "@/types/store/slice/chat";

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

type IGroupInitialState = {
  default_groups: IGroup[];
  recommended_groups: IGroup[];
  active_group: IGroup | null;
  is_active_user_exist: boolean;
};

type IGroupCreationApiPayload = {
  user_ids: Array<number>;
  group_name: string;
};
type IGroupCreationApiResponse = IBaseResponse & {
  message: string;
  group: IGroup;
};

/**
 * ========================= API ===========================
 */

type IGetGroupsResponse = IBaseResponse & {
  groups: IGroup[];
};
type IGetGroupRecommendationResponse = IGetGroupResponse;

type IJoinGroupPayload = {
  notification_id?: string;
  group_id: number;
};
type IJoinGroupResponse = IBaseResponse & {
  message: string;
  group: IGroup;
};

type IJoinRequestPayload = {
  group_id: number;
};

type IJoinRequestResponse = IBaseResponse;

type IGroupAccessApiPayload = {
  user_id: number;
  group_id: number;
  notification_id?: string;
};
type IGroupAccessApiResponse = {
  success: boolean;
  message: string;
};
export default IGroupInitialState;
export {
  IUserGroup,
  IGroup,
  IGetGroupsResponse,
  IGetGroupRecommendationResponse,
  IJoinGroupPayload,
  IJoinGroupResponse,
  IJoinRequestPayload,
  IJoinRequestResponse,
  IGroupCreationApiPayload,
  IGroupCreationApiResponse,
  IGroupAccessApiPayload,
  IGroupAccessApiResponse,
};
