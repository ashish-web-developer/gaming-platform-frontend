import type { IBaseResponse } from "./common";

type IUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  admin: boolean;
  email_verified_at: string;
  earned_points: number;
  avatar_url: string;
};
type IValidationErrorType =
  | "username"
  | "email"
  | "password"
  | "confirm_password";

type ILoginInitialState = {
  show_validation_tooltip: boolean;
  show_introduction_tooltip: boolean;
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

export {
  IValidationErrorType,
  ILoginInitialState,
  IVerifyUserNameApiRequest,
  IVerifyUserNameApiResponse,
  IRegisterUserApiRequest,
  IRegisterUserApiResponse,
  IRegisterUserApiRejectValue,
};
