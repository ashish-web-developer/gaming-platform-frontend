import Link from "next/link";
import { useRouter } from "next/router";
// types
import type { FC } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";
// styled components
import {
  StyledNav,
  StyledChatCta,
} from "@/styles/components/memory-game/nav/nav.style";

// styled theme
import { useTheme } from "styled-components";

// icons
import ChatIcon from "@/components/memory-game/nav/icons/chat";
import HomeIcon from "@/components/memory-game/nav/icons/home";

// redux
import { useAppDispatch } from "@/hooks/redux";
import {
  updateGamingUser,
  udpateIsProposalSender,
  updateRoomId,
} from "@/store/slice/game.slice";

const Nav: FC = () => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <StyledNav>
      <StyledChatCta
        onClick={() => {
          router.push("/chat");
          dispatch(updateGamingUser(null));
          dispatch(udpateIsProposalSender(false));
          dispatch(updateRoomId(null));
        }}
      >
        <ChatIcon color={theme.palette.nav.color} width={40} height={30} />
      </StyledChatCta>
      <Link href="/">
        <HomeIcon color={theme.palette.nav.color} width={40} height={30} />
      </Link>
    </StyledNav>
  );
};

export default Nav;
