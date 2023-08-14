import type { User } from "@/types/user";



interface ChatUser extends User{
  received_messages?: Conversation[];
  sent_messages?: Conversation[];
}

type SendMessgeResponseType = {
  success: boolean;
  conversation: Conversation;
};

type Conversation = {
  id: number;
  message: string;
  receiver_id: number;
  sender_id: number;
  created_at: string;
  updated_at: string;
};

type InitialState = {
  users: ChatUser[];
  mobile_navigation: number;
  active_user: User | null;
  active_user_conversation: Conversation[];
  is_submitting: boolean;
  chat_input_value: string;
};

export { InitialState, Conversation, SendMessgeResponseType ,ChatUser};
