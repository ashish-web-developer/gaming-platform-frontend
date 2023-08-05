import type { User } from "@/types/user";

type InitialState = {
  users: User[];
  mobile_navigation: number;
  active_user: User | null;
  active_user_conversation: Array;
};

export { InitialState };
