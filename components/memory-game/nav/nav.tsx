import Link from "next/link";
import { useRouter } from "next/router";
// types
import type { FC } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";
// styled components
import {
  StyledNav,
  StyledIconButton,
} from "@/styles/components/memory-game/nav/nav.style";

// styled theme
import { useTheme } from "styled-components";

// icons
import ChatIcon from "@/components/memory-game/nav/icons/chat";
import HomeIcon from "@/components/memory-game/nav/icons/home";
import MoonIcon from "@/components/memory-game/nav/icons/moon";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import {
  updateGamingUser,
  udpateIsProposalSender,
  updateRoomId,
} from "@/store/slice/game.slice";
import { mode, updateMode } from "@/store/slice/common.slice";

import {
  updatePlayerTurnId,
  updateShowHelpTooltip,
  updateLastFlippedCard,
} from "@/store/slice/memory-game.slice";

const Nav: FC = () => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const router = useRouter();
  return (
    <StyledNav>
      <StyledIconButton
        onClick={() => {
          dispatch(updateGamingUser(null));
          dispatch(udpateIsProposalSender(false));
          dispatch(updateRoomId(null));
          dispatch(updateShowHelpTooltip(false));
          dispatch(updatePlayerTurnId(null));
          dispatch(updateLastFlippedCard(null));
          router.push("/chat");
        }}
      >
        <ChatIcon color={theme.palette.nav.color} width={40} height={30} />
      </StyledIconButton>
      <Link href="/">
        <HomeIcon color={theme.palette.nav.color} width={40} height={30} />
      </Link>
      <StyledIconButton
        onClick={() => {
          if (_mode == "dark") {
            dispatch(updateMode("light"));
          } else {
            dispatch(updateMode("dark"));
          }
        }}
      >
        <MoonIcon color={theme.palette.nav.color} width={35} height={40} />
      </StyledIconButton>
    </StyledNav>
  );
};

export default Nav;
