import { useRouter } from "next/router";
// types
import type { FC } from "react";

// styled components
import {
  StyledNavContainer,
  StyledNav,
  StyledHelpCta,
  StyledIconButton,
  StyledChatButton,
} from "@/styles/components/memory-game/nav/mobile/mobile-nav.style";

// icons
import HomeIcon from "@/components/memory-game/nav/icons/home";
import ChatIcon from "@/components/memory-game/nav/icons/chat";
import HelpIcon from "@/components/memory-game/nav/icons/help";
import MoonIcon from "@/components/memory-game/nav/icons/moon";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { mode, updateMode } from "@/store/slice/common.slice";
import { user } from "@/store/slice/user.slice";
import {
  active_cognimatch_players,
  resetCognimatch,
  live_stream_chat_list,
  updateShowHelpTooltip,
  updateShowChatStreamingModal,
} from "@/store/slice/cognimatch.slice";
import { resetGame } from "@/store/slice/game.slice";

const MobileNav: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const { id: user_id } = useAppSelector(user);
  const opponent_player = useAppSelector(active_cognimatch_players).filter(
    (player) => player.id !== user_id
  )[0];
  const _live_stream_chat_list = useAppSelector(live_stream_chat_list);
  const live_stream_opponent_player_chat = _live_stream_chat_list.filter(
    (chat) => chat.user.id == opponent_player?.id && !chat.viewed
  );
  return (
    <StyledNavContainer>
      <StyledNav>
        <StyledIconButton
          onClick={() => {
            dispatch(resetGame());
            dispatch(resetCognimatch());
            router.push("/");
          }}
        >
          <HomeIcon width={30} height={24} color="#FFF" />
        </StyledIconButton>
        <StyledChatButton
          $content={`${
            live_stream_opponent_player_chat.length
              ? String(live_stream_opponent_player_chat.length).padStart(2, "0")
              : ""
          }`}
          onClick={() => dispatch(updateShowChatStreamingModal(true))}
        >
          <ChatIcon width={30} height={24} color="#FFF" />
        </StyledChatButton>
        <StyledIconButton
          onClick={() => {
            if (_mode == "dark") {
              dispatch(updateMode("light"));
            } else {
              dispatch(updateMode("dark"));
            }
          }}
        >
          <MoonIcon width={24} height={30} color="#FFF" />
        </StyledIconButton>
      </StyledNav>
      <StyledHelpCta
        onClick={() => {
          dispatch(updateShowHelpTooltip(true));
        }}
      >
        <HelpIcon size={35} color="#fff" />
      </StyledHelpCta>
    </StyledNavContainer>
  );
};

export default MobileNav;
