import type { IUsersWithConversation } from "@/types/store/slice/chat";
import { IBaseResponse } from "@/types/store/slice/common";

type IActiveGamingUser = IUsersWithConversation & {
  buy_in_amount?: number;
};
type IPokerInitialState = {
  show_poker_slider: boolean;
  poker_chips: number; // It will be stored in k
  slider_val: number;
  active_gaming_user: IActiveGamingUser[];
  show_buy_in_modal: boolean;
  poker_buy_in_amount: number; // It will be stored in k
  small_blind: number; // It will be stored in k
};

type IPokerRoom = {
  room_id: string;
  small_blind: number;
};
/**
 * ==== POKER ROOM CREATION API =====
 */
type ICreatePokerRoomApiResponse = IBaseResponse & {
  poker_room: IPokerRoom;
};
type ICreatePokerRoomApiRequest = IPokerRoom;

/**
 * ==== GET POKER ROOM INFO API =====
 */
type IGetPokerRoomInfoResponse = ICreatePokerRoomApiResponse;
export {
  IActiveGamingUser,
  ICreatePokerRoomApiResponse,
  ICreatePokerRoomApiRequest,
  IGetPokerRoomInfoResponse,
};
export default IPokerInitialState;
