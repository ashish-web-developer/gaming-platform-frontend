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

// mui
import { IconButton } from "@mui/material";

// icons
import HomeIcon from "@/components/memory-game/nav/icons/home";
import ChatIcon from "@/components/memory-game/nav/icons/chat";
import HelpIcon from "@/components/memory-game/nav/icons/help";
import MoonIcon from "@/components/memory-game/nav/icons/moon";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import {
  // state
  live_stream_chat_list,
  // actions
  updateShowHelpDrawer,
  updateShowChatStreamingModal,
} from "@/store/slice/memory-game.slice";
import { mode, updateMode } from "@/store/slice/common.slice";

const MobileNav: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const _live_stream_chat_list = useAppSelector(live_stream_chat_list);
  return (
    <StyledNavContainer>
      <StyledNav>
        <StyledIconButton onClick={() => router.push("/")}>
          <HomeIcon width={30} height={24} color="#FFF" />
        </StyledIconButton>
        <StyledChatButton
          $content={`${
            _live_stream_chat_list.length
              ? String(_live_stream_chat_list.length).padStart(2, "0")
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
      <StyledHelpCta>
        <IconButton onClick={() => dispatch(updateShowHelpDrawer(true))}>
          <HelpIcon size={35} color="#fff" />
        </IconButton>
      </StyledHelpCta>
    </StyledNavContainer>
  );
};

export default MobileNav;
