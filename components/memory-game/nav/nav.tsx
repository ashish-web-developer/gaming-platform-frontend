import { useRouter } from "next/router";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/memory-game.theme";
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
import { mode, updateMode } from "@/store/slice/common.slice";
import { resetCognimatch } from "@/store/slice/cognimatch.slice";

const Nav: FC = () => {
  const theme = useTheme() as ITheme;
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const router = useRouter();
  return (
    <StyledNav>
      <StyledIconButton
        onClick={() => {
          dispatch(resetCognimatch());
          router.push("/chat");
        }}
      >
        <ChatIcon color={theme.palette.primary.light} width={40} height={30} />
      </StyledIconButton>
      <StyledIconButton
        onClick={() => {
          dispatch(resetCognimatch());
          router.push("/");
        }}
      >
        <HomeIcon color={theme.palette.primary.light} width={40} height={30} />
      </StyledIconButton>
      <StyledIconButton
        onClick={() => {
          if (_mode == "dark") {
            dispatch(updateMode("light"));
          } else {
            dispatch(updateMode("dark"));
          }
        }}
      >
        <MoonIcon color={theme.palette.primary.light} width={35} height={40} />
      </StyledIconButton>
    </StyledNav>
  );
};

export default Nav;
