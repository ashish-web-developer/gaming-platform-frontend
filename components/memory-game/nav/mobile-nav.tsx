import Link from "next/link";
// types
import type { FC } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";

// styled components
import {
  StyledMobileNav,
  StyledPattern,
  StyledIconContainer,
  StyledNavCta,
  StyledHelpCta,
} from "@/styles/components/memory-game/nav/mobile-nav.style";

// mui
import { Tooltip } from "@mui/material";

// icons
import ChatIcon from "./icons/chat";
import HomeIcon from "./icons/home";
import HelpIcon from "./icons/help";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  show_mobile_chat,
  updateShowMobileChat,
  updateShowHelpDrawer,
} from "@/store/slice/memory-game.slice";

const MobileNav: FC = () => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const dispatch = useAppDispatch();
  const _show_mobile_chat = useAppSelector(show_mobile_chat);
  return (
    <StyledMobileNav>
      <StyledPattern>
        <Pattern color={theme.palette.nav.mobile.background} />
      </StyledPattern>
      <StyledIconContainer>
        <Link href="/">
          <HomeIcon
            width={40}
            height={30}
            color={theme.palette.nav.mobile.icons}
          />
        </Link>
        <StyledNavCta
          onClick={() => dispatch(updateShowMobileChat(!_show_mobile_chat))}
        >
          <ChatIcon
            width={40}
            height={30}
            color={theme.palette.nav.mobile.icons}
          />
        </StyledNavCta>
      </StyledIconContainer>
      <Tooltip title="Need Help?" placement="top">
        <StyledHelpCta
          onClick={() => {
            dispatch(updateShowHelpDrawer(true));
          }}
        >
          <HelpIcon size={68} color={theme.palette.nav.mobile.help_icon} />
        </StyledHelpCta>
      </Tooltip>
    </StyledMobileNav>
  );
};

const Pattern: FC<{ color: string }> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 336 111"
      preserveAspectRatio="xMidYMid meet"
    >
      <g filter="url(#filter0_d_364_21)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M238 40C221.431 40 208.565 24.8562 197.269 12.7353C189.966 4.8999 179.555 0 168 0C156.445 0 146.034 4.8999 138.731 12.7353C127.435 24.8562 114.569 40 98 40H34C17.4315 40 4 53.4315 4 70V73C4 89.5685 17.4314 103 34 103H302C318.569 103 332 89.5685 332 73V70C332 53.4315 318.569 40 302 40H238Z"
          fill={color}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_364_21"
          x="0"
          y="0"
          width="336"
          height="111"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_364_21"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_364_21"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default MobileNav;
