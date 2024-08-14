import type { GetRandomCard } from "@/types/helpers/memory-game/game";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

type MemoryGameCardEventArgs = {
  card_id: string;
  flipped: boolean;
};

type MemoryGameCardEventRespose = {
  success: boolean;
  message: string;
};

type IUpdateLastFlippedCardArgs = {
  card_id: string | null;
};

type IUpdateLastFlippedCardResponse = {
  success: boolean;
  message: string;
};

type Score = {
  [index: number]: number;
};

type IUpdateScoreArgs = {
  score: Score | null;
};

type IUpdateScoreResponse = {
  success: boolean;
  message: string;
};

type IGetCardsResponse = {
  deck: GetRandomCard[];
};

type ICard = {
  id: string;
  suit: "♠" | "♣" | "♦" | "♥";
  card: "♚" | "♛" | "♞" | "A" | number;
  cardColor: "red" | "black";
  flipped: boolean;
  card_image: string;
};

type InitialState = {
  active_cognimatch_players: IUsersWithConversation[];
  score: null | Score;
  game_complexity: number;
  player_turn_id: number | null;
  card_list: ICard[];
  last_flipped_card_id: null | string;
  is_gaming_user_in: boolean;
  help_tooltip_text: [string, string] | null;
  current_rule_index: number;
  game_rules_list: [string, string][];
  show_audio_play_modal: boolean;
  show_leaving_snackbar: boolean;
  is_gaming_user_leaving: boolean;
  show_help_tooltip: boolean;
  play_audio: boolean;
  show_game_board: boolean;
  show_chat_streaming_modal: boolean;
  info_snackbar: {
    show_info_snackbar: boolean;
    message: string;
    name: string;
  };
  live_stream_chat_list: Array<{
    id: string;
    message: string;
    viewed: boolean;
    user: IUsersWithConversation;
  }>;
  show_live_stream_chat: boolean;
  mobile: {
    show_help_drawer: boolean;
  };
};

export {
  InitialState,
  MemoryGameCardEventArgs,
  MemoryGameCardEventRespose,
  IGetCardsResponse,
  ICard,
  IUpdateLastFlippedCardArgs,
  IUpdateLastFlippedCardResponse,
  IUpdateScoreArgs,
  IUpdateScoreResponse,
  Score,
};
