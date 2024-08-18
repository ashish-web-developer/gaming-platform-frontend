// types
import type { IUsersWithConversation } from "./chat";
import type { IBaseResponse } from "@/types/store/slice/common";

type ICard = {
  id: string;
  suit: "♠" | "♣" | "♦" | "♥";
  card: "♚" | "♛" | "♞" | "A" | number;
  cardColor: "red" | "black";
  flipped: boolean;
  card_image: string;
};
type IScore = {
  [key: number]: number;
};
type ILiveStreamChat = {
  id: string;
  message: string;
  viewed: boolean;
  user: IUsersWithConversation;
};
type ICogniMatchInitialState = {
  cognimatch_room_id: string | null;
  active_cognimatch_players: IUsersWithConversation[];
  deck: ICard[];
  player_turn_id: number | null;
  score: IScore;
  timer_start_count: number;
  show_cognimatch_board: boolean;
  live_stream_chat: {
    show_chats: boolean;
    chat_list: ILiveStreamChat[];
    mobile: {
      show_chat_modal: boolean;
    };
  };
  info_snackbar: {
    show_info_snackbar: boolean;
    message: string;
    name: string;
  };
  help_tooltip: {
    game_rules_list: [string, string][];
    tooltip_text: [string, string] | null;
    show_tooltip: boolean;
    current_rule_index: number;
    play_audio: boolean;
  };
};

type ICognimatchRoom = {
  room_id: string;
  deck: ICard[];
  player_turn_id: number;
  score: IScore;
  timer_start_time: null | string;
  last_flipped_card: ICard | null;
};
/**
 * ==== COGNIMATCH ROOM CREATION API =====
 */
type ICreateCognimatchRoomApiRequest = {
  room_id: string;
  players_id: Array<number>;
};
type ICreateCognimatchRoomApiResponse = IBaseResponse & {
  cognimatch_room: ICognimatchRoom;
};

/**
 * ==== COGNIMATCH ROOM INFO API =====
 */
type IGetCognimatchRoomInfoApiResponse = ICreateCognimatchRoomApiResponse;

/**
 * ==== UPDATE PLAYERS COUNT API ====
 */
type IUpdatePlayersCountApiRequest = {
  type: "add" | "remove";
};
/**
 * ==== FLIP CARD API ====
 */
type IFlipCardApiRequest = {
  card_id: string;
};
type IFlipCardApiResponse = IBaseResponse & {
  card_matched: boolean;
  last_flipped_card: ICard | null;
};

type IUpdateTimerStartTimeApiRequest = {
  next_player_turn_id: number;
};

/**
 * ==== LIVE STREAM CHAT API ====
 */
type ILiveStreamChatApiRequest = {
  message: string;
};
type ILiveStreamChatApiResponse = IBaseResponse & ILiveStreamChatApiRequest;
export {
  ICogniMatchInitialState,
  ICognimatchRoom,
  ICreateCognimatchRoomApiRequest,
  ICreateCognimatchRoomApiResponse,
  IGetCognimatchRoomInfoApiResponse,
  IUpdateTimerStartTimeApiRequest,
  IUpdatePlayersCountApiRequest,
  IFlipCardApiRequest,
  IFlipCardApiResponse,
  ILiveStreamChat,
  ILiveStreamChatApiRequest,
  ILiveStreamChatApiResponse,
};
