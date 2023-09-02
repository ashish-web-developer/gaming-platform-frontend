import type { User } from "@/types/user";

type InitialState = {
  gaming_user: User | null;
  room_id: string | null;
  show_invitation_snackbar: boolean;
  show_denied_snackbar: boolean;
  sending_invitation: boolean;
  is_proposal_sender:boolean;
};

type ISendInvitationResponse = {
  success: boolean;
  message?: string;
  error?: any;
};

type IAcceptInvitationResponse = ISendInvitationResponse;

type IAcceptInvitationRequest = {
  is_accepted: boolean;
};

type ISendInvitationRequest = {
  game: string;
};

export {
  InitialState,
  ISendInvitationResponse,
  ISendInvitationRequest,
  IAcceptInvitationRequest,
  IAcceptInvitationResponse,
};
