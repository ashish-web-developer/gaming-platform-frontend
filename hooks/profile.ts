import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";

const useAvatar = (username: string) => {
  const avatar = createAvatar(adventurer, {
    seed: username,
  });
  return avatar.toString();
};

export default useAvatar;
