import type { User } from "@/types/user";

type Conversation = {
  id: number;
  message: string;
  receiver_id: number;
  sender_id: number;
  created_at: string;
  updated_at: string;
};

type InitialState = {
  users: User[];
  mobile_navigation: number;
  active_user: User | null;
  active_user_conversation: Conversation[];
  is_submitting: boolean;
  chat_input_value: string | null;
};

export { InitialState, Conversation };
