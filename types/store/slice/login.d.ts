import type { IBaseResponse } from "./common";

type IUser = {
  id: number;
  name?: string;
  username: string;
  email?: string;
  admin: boolean;
  email_verified_at: string;
  earned_points: number;
  avatar_url: string | null;
  last_seen: string | null;
};
type IValidationErrorType =
  | "username"
  | "email"
  | "password"
  | "confirm_password"
  | "auth_failed";

type IFieldType = "username" | "password" | "confirm_password" | null;
type ILoginInitialState = {
  user: IUser | null;
  validation_error_list: Array<{
    error: string;
    type: IValidationErrorType;
  }>;
  is_typing: boolean;
};
/**
 * ===== VERIFY USERNAME API =======
 */

type IVerifyUserNameApiRequest = {
  username: string;
};

type IVerifyUserNameApiResponse = IBaseResponse & {
  message?: {
    username: string[];
  };
};

/**
 * ===== REGISTER USER API =======
 */

type IRegisterUserApiRequest = {
  username: string;
  password: string;
};
type IRegisterUserApiResponse = IBaseResponse & {
  user: IUser;
  token: string;
  message:
    | {
        [key in "username" | "password"]: string[];
      }
    | string;
};

type IRegisterUserApiRejectValue =
  | Array<{
      error: string;
      type: IValidationErrorType;
    }>
  | string;

/**
 * ===== UPDATE PROFILE API =======
 */
type IUpdateProfileApiRequest = {
  form_data: FormData;
};
type IUpdateProfileApiResponse = IBaseResponse & {
  message: string;
  user: IUser;
};

/**
 * ===== UPDATE PROFILE API =======
 */

type ILoginUserApiRequest = {
  email: string | null;
  username: string | null;
  password: string;
};

type ILoginUserApiResponse = IRegisterUserApiResponse;

type ILoginUserApiRejectValue = IRegisterUserApiRejectValue;

/**
 * ===== LOGOUT USER API =======
 */
type ILogoutUserApiResponse = IBaseResponse & {
  message: string;
};

export {
  IUser,
  IFieldType,
  IValidationErrorType,
  ILoginInitialState,
  IVerifyUserNameApiRequest,
  IVerifyUserNameApiResponse,
  IRegisterUserApiRequest,
  IRegisterUserApiResponse,
  IRegisterUserApiRejectValue,
  IUpdateProfileApiRequest,
  IUpdateProfileApiResponse,
  ILoginUserApiRequest,
  ILoginUserApiResponse,
  ILoginUserApiRejectValue,
  ILogoutUserApiResponse,
};
