import type { IUsersWithConversation } from "@/types/store/slice/chat";
import type { IBaseResponse } from "@/types/store/slice/common";
import type { IDeckType } from "@/types/store/slice/poker";

type IActiveGamingUser = IUsersWithConversation & {
  buy_in_amount?: number;
};
type ISeatType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type IActionType = "check" | "call" | "raise" | "fold" | null;

type IPokerPlayer = {
  id: number;
  player_id: number;
  room_id: string;
  action_type: IActionType;
  is_active: boolean;
  seat_number: ISeatType;
  hole_cards: IDeckType | null;
  current_betted_amount: number | null;
  total_chips_left: number;
  user: IUsersWithConversation;
  seat_index?: ISeatType;
  created_at: string;
  updated_at: string;
};
type IPokerInitialState = {
  poker_room_id: string | null;
  room_created_at: string | null;
  dealer_id: number | null;
  poker_chips: number; // It will be stored in k
  active_poker_players: IPokerPlayer[];
  community_cards: IDeckType | null;
  show_buy_in_modal: boolean;
  small_blind: number; // It will be stored in k
  min_amount_to_be_betted: number | null; // It will be stored in k
  min_amount_to_be_raised: number | null; // It will be stored in k
  chips_in_pot: number; // It will bee stored in k
  bettor_id: number | null;
  deck: IDeckType;
};

type IPokerRoom = {
  room_id: string;
  small_blind: number;
  chips_in_pot: number;
  seat_available: ISeatType | null;
  no_of_players_betted: number;
  min_amount_to_be_betted: number;
  min_amount_to_be_raised: number; // It will be stored in k
  community_cards: IDeckType;
  dealer_id: number;
  bettor_id: number | null;
  poker_player: IPokerPlayer[];
  deck: IDeckType;
  created_at: string;
  updated_at: string;
};
/**
 * ==== POKER ROOM CREATION API =====
 */
type ICreatePokerRoomApiResponse = IBaseResponse & {
  poker_room: IPokerRoom;
};
type ICreatePokerRoomApiRequest = {
  room_id: string;
  small_blind: number;
  chips_in_pot: number;
};

/**
 * ==== GET POKER ROOM INFO API =====
 */
type IGetPokerRoomInfoResponse = ICreatePokerRoomApiResponse;

type IGetPokerResponseInfoRequest = {
  poker_buy_in_amount: number;
};

/**
 * ==== JOIN POKER ROOM API =====
 */
type IJoinPokerRoomApiRequest = {
  seat_number: ISeatType;
  total_chips_left: number;
};

type IJoinPokerRoomApiResponse = IBaseResponse & {
  room_id: string;
  player_id: number;
  is_active: boolean;
  active_type: "check" | "call" | "raise" | "fold" | null;
  seat_number: ISeatType;
  total_chips_left: number;
};

/**
 * ==== UPDATE SEAT AVAILABLE API =====
 */
type IUpdateSeatAvailableRequest = {
  seat_available: ISeatType | null;
};
type IUpdateSeatAvailableResponse = IBaseResponse & {
  poker_room: IPokerRoom;
};

/**
 * ==== TRIGGER ACTION API =====
 */
type ITriggerActionApiRequest = {
  action_type: IActionType;
  current_betted_amount: number | null;
};

export {
  ISeatType,
  IActionType,
  IPokerPlayer,
  IPokerRoom,
  ICreatePokerRoomApiResponse,
  ICreatePokerRoomApiRequest,
  IGetPokerRoomInfoResponse,
  IGetPokerResponseInfoRequest,
  IJoinPokerRoomApiRequest,
  IJoinPokerRoomApiResponse,
  IUpdateSeatAvailableRequest,
  IUpdateSeatAvailableResponse,
  ITriggerActionApiRequest,
};
export default IPokerInitialState;
