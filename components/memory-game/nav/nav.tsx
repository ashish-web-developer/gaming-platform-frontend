import Link from "next/link";
// types
import type { FC } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";
// styled components
import { StyledNav } from "@/styles/components/memory-game/nav/nav.style";

// styled theme
import { useTheme } from "styled-components";

// icons
import ChatIcon from "@/components/memory-game/nav/icons/chat";
import HomeIcon from "@/components/memory-game/nav/icons/home";

const Nav: FC = () => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  return (
    <StyledNav>
      <Link href="/chat">
        <ChatIcon color={theme.palette.nav.color} width={40} height={30} />
      </Link>
      <Link href="/">
        <HomeIcon color={theme.palette.nav.color} width={40} height={30} />
      </Link>
    </StyledNav>
  );
};

export default Nav;
