import type { IUsersWithConversation } from "@/types/store/slice/chat";
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
};
export { IActiveGamingUser };
export default IPokerInitialState;
