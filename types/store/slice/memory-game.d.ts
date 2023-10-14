import type { GetRandomCard } from "@/types/helpers/memory-game/game";

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

type IGetCardsResponse = {
  deck: GetRandomCard[];
};

type ICard = {
  id: string;
  suit: "♠" | "♣" | "♦" | "♥";
  card: "♚" | "♛" | "♞" | "A" | number;
  cardColor: "red" | "black";
  flipped: boolean;
};

type InitialState = {
  game_complexity: number;
  player_turn_id: number | null;
  card_list: ICard[];
  last_flipped_card_id: null | string;
  is_gaming_user_in: boolean;
  help_tooltip_text: [string, string] | null;
  current_rule_index: number;
  game_rules_list: [string, string][];
  show_audio_play_modal: boolean;
  show_info_snackbar: boolean;
  is_gaming_user_leaving: boolean;
  show_mobile_chat: boolean;
  show_help_tooltip: boolean;
  play_audio: boolean;
  show_game_board: boolean;
  card_turn_count: 0 | 1;
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
};
