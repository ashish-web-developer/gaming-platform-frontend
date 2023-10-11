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

type ICard = {
  suit: string;
  card: string;
  cardColor: string;
};

type InitialState = {
  card_list: ICard[];
  lastFlippedCard:
    | (GetRandomCard & {
        id: string;
      })
    | null;
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
  mobile: {
    show_help_drawer: boolean;
  };
};

export {
  InitialState,
  MemoryGameCardEventArgs,
  MemoryGameCardEventRespose,
  IGetCardRequest,
  IGetCardsResponse,
  ICard,
};
