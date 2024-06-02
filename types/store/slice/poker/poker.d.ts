import type { IUsersWithConversation } from "@/types/store/slice/chat";
type IPokerInitialState = {
  show_poker_slider: boolean;
  poker_chips: number; // It will be stored in k
  slider_val: number;
  active_gaming_user: IUsersWithConversation[];
  show_buy_in_modal: boolean;
  poker_buy_in_amount: number; // It will be stored in k
};
export default IPokerInitialState;
