import { IUsersWithConversation } from "./chat";

type InitialState = {
  gaming_user: IUsersWithConversation | null;
  room_id: string | null;
  show_invitation_snackbar: boolean;
  show_denied_snackbar: boolean;
  sending_invitation: boolean;
  is_proposal_sender: boolean;
  timer_start_count: null | number;
};

type IUpdatePlayerTurnResponse = {
  success: boolean;
  error?: any;
  message: string;
};

type IUpdateTimerStartCountEventRequest = {
  timer_count: number;
};
type IUpdateTimerStartCountEventResponse = IUpdatePlayerTurnResponse;

export {
  InitialState,
  IUpdatePlayerTurnResponse,
  IUpdateTimerStartCountEventRequest,
  IUpdateTimerStartCountEventResponse,
};
