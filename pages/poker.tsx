import type { NextPage } from "next";

// local components
import PokerContainer from "@/components/poker/poker-container/poker-container";

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import { Theme } from "@/theme/poker.theme";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { room_id } from "@/store/slice/game.slice";
import { updateActiveGamingUser } from "@/store/slice/poker/poker.slice";

// hooks
import { usePresenceChannel } from "@/hooks/pusher.hook";
import { IUsersWithConversation } from "@/types/store/slice/chat";

const PokerPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const _room_id = useAppSelector(room_id);
  usePresenceChannel<
    undefined,
    { user: IUsersWithConversation }[] | { user: IUsersWithConversation }
  >({
    channel: `poker.${_room_id}`,
    events: [],
    handler: (users, type) => {
      if (Array.isArray(users)) {
        const _users = users.map(({ user }) => user);
        dispatch(updateActiveGamingUser({ users: _users, type }));
      } else {
        const _user = users.user;
        dispatch(updateActiveGamingUser({ users: _user, type }));
      }
    },
  });
  return (
    <ThemeProvider theme={Theme}>
      <PokerContainer />
    </ThemeProvider>
  );
};
export default PokerPage;
