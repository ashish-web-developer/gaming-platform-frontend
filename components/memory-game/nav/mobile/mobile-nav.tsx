import Link from "next/link";
import { useRouter } from "next/router";
// types
import type { FC } from "react";

// styled components
import {
  StyledNavContainer,
  StyledNav,
  StyledHelpCta,
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
  updateShowHelpDrawer,
  updateShowChatStreamingModal,
} from "@/store/slice/memory-game.slice";
import { mode, updateMode } from "@/store/slice/common.slice";

const MobileNav: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  return (
    <StyledNavContainer>
      <StyledNav>
        <IconButton onClick={() => router.push("/")}>
          <HomeIcon width={30} height={24} color="#FFF" />
        </IconButton>
        <IconButton
          onClick={() => dispatch(updateShowChatStreamingModal(true))}
        >
          <ChatIcon width={30} height={24} color="#FFF" />
        </IconButton>
        <IconButton
          onClick={() => {
            if (_mode == "dark") {
              dispatch(updateMode("light"));
            } else {
              dispatch(updateMode("dark"));
            }
          }}
        >
          <MoonIcon width={24} height={30} color="#FFF" />
        </IconButton>
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
