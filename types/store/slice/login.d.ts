import type { IBaseResponse } from "./common";

type ILoginInitialState = {
  show_validation_tooltip: boolean;
  show_introduction_tooltip: boolean;
  validator_error: string | null;
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

export {
  ILoginInitialState,
  IVerifyUserNameApiRequest,
  IVerifyUserNameApiResponse,
};
