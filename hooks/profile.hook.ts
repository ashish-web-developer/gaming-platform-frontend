import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
// types
import { IUsersWithConversation } from "@/types/store/slice/chat";

const useAvatarUrl = (user: IUsersWithConversation | null) => {
  if (user?.avatar_url) {
    return `${process.env.NEXT_PUBLIC_API_END_POINT}${
      user.avatar_url
    }?timestamp=${new Date().getTime()}`;
  }
  const avatar = createAvatar(adventurer, {
    seed: user?.username ?? "",
  });
  const data_url = `data:image/svg+xml;base64,${btoa(avatar.toString())}`;
  return data_url;
};

export { useAvatarUrl };
