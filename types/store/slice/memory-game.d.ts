import type { GetRandomCard } from "@/types/helpers/memory-game/game";

type MemoryGameCardEventArgs = {
  card_id: string;
  player_id: number;
};

type MemoryGameCardEventRespose = {
  success: boolean;
  message: string;
};

type IGetCardsResponse = {
  deck: GetRandomCard[];
};

type IGetCardRequest = {
  game_complexity: number;
};

type InitialState = {
  cardList: {
    [key: string]: boolean;
  };
  lastFlippedCard:
    | (GetRandomCard & {
        id: string;
      })
    | null;
  is_gaming_user_in: boolean;
  rules_tooltip_text: [string, string] | null;
  current_rule_index: number;
  game_rules_list: [string, string][];
  show_audio_play_modal: boolean;
  show_info_snackbar: boolean;
  is_gaming_user_leaving: boolean;
  show_mobile_chat: boolean;
  show_help_tooltip: boolean;
};

export {
  InitialState,
  MemoryGameCardEventArgs,
  MemoryGameCardEventRespose,
  IGetCardRequest,
  IGetCardsResponse,
};
