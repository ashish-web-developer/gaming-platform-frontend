import type { IUsersWithConversation } from "@/types/store/slice/chat";
import type { IBaseResponse } from "@/types/store/slice/common";
import type { IDeckType } from "@/types/store/slice/poker";

type IActiveGamingUser = IUsersWithConversation & {
  buy_in_amount?: number;
};
type ISeatType = 1 | 2 | 3;

type IPokerPlayer = {
  id: number;
  player_id: number;
  room_id: string;
  action_type: "check" | "call" | "raise" | "fold" | null;
  is_active: boolean;
  seat_number: ISeatType;
  hole_cards: IDeckType | null;
  current_betted_amount: number | null;
  total_chips_left: number;
  user: IUsersWithConversation;
  created_at: string;
  updated_at: string;
};
type IPokerInitialState = {
  show_poker_slider: boolean;
  dealer_id: number | null;
  poker_chips: number; // It will be stored in k
  active_poker_players: IPokerPlayer[];
  community_cards: IDeckType | null;
  show_buy_in_modal: boolean;
  small_blind: number; // It will be stored in k
  min_amount_to_be_betted: number | null; // It will stored in k
  chips_in_pot: number; // It will bee stored in k
  bettor_id: number | null;
};

type IPokerRoom = {
  room_id: string;
  small_blind: number;
  chips_in_pot: number;
  seat_available: 0 | 1 | 2 | 3;
  no_of_players_betted: number;
  min_amount_to_be_betted: number;
  community_cards: IDeckType;
  dealer_id: number;
  bettor_id: number | null;
  poker_player: IPokerPlayer[];
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
  seat_number: 1 | 2 | 3;
  total_chips_left: number;
};

type IJoinPokerRoomApiResponse = IBaseResponse & {
  room_id: string;
  player_id: number;
  is_active: boolean;
  active_type: "check" | "call" | "raise" | "fold" | null;
  seat_number: 1 | 2 | 3;
  total_chips_left: number;
};

/**
 * ==== UPDATE SEAT AVAILABLE API =====
 */
type IUpdateSeatAvailableRequest = {
  seat_available: 0 | 1 | 2 | 3;
};
type IUpdateSeatAvailableResponse = IBaseResponse & {
  poker_room: IPokerRoom;
};

/**
 * ==== UPDATE DEALER API =====
 */
type IUpdateDealerApiResponse = IBaseResponse & {
  message?: string;
};

/**
 * ==== TRIGGER ACTION API =====
 */
type ITriggerActionApiRequest = {
  action_type: "fold" | "check" | "raise";
  current_betted_amount: number | null;
};

export {
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
  IUpdateDealerApiResponse,
  ITriggerActionApiRequest,
};
export default IPokerInitialState;
