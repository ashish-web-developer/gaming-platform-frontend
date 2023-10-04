import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
// types
import { type FC } from "react";
// mui
import { Drawer } from "@mui/material";

// styled components
import {
  StyledTooltipContainer,
  StyledTopBackground,
  StyledVolumeCta,
  StyledContent,
  StyledHeader,
  StyledPara,
  StyledTrofyImage,
  StyledBottomCta,
  StyledNavIconContainer,
  StyledBackButton,
  StyledNavCta,
  StyledBackIconContainer,
} from "@/styles/components/memory-game/help-tooltip/mobile/mobile-help-tooltip.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  show_help_drawer,
  updateShowHelpDrawer,
} from "@/store/slice/memory-game.slice";

// icons
import VolumeOffIcon from "../icons/volume-off";
import VolumeOnIcon from "../icons/volume-on";
import PrevIcon from "../icons/prev";
import NextIcon from "../icons/next";
import BackIcon from "../icons/back";

const MobileHelpTooltip: FC = () => {
  const dispatch = useAppDispatch();
  const _show_help_drawer = useAppSelector(show_help_drawer);

  return (
    <Drawer
      anchor="right"
      open={_show_help_drawer}
      onClose={() => {
        dispatch(updateShowHelpDrawer(false));
      }}
    >
      <StyledTooltipContainer>
        <StyledTopBackground>
          <Image
            layout="responsive"
            alt="girl"
            src="/memory-game/help-tooltip/mobile/top-background.svg"
            width={390}
            height={350}
          />
        </StyledTopBackground>
        <StyledVolumeCta>
          <VolumeOffIcon size={30} color="#fff" />
        </StyledVolumeCta>
        <StyledContent>
          <StyledHeader>Cognimatch: Rules and How to Play</StyledHeader>
          <StyledPara>
            Memory, also known as Concentration, is a classic card-matching game
            that tests your memory skills and attention to detail. Here's how to
            play this engaging game:
          </StyledPara>
          <StyledTrofyImage>
            <Image
              alt="banner"
              layout="responsive"
              width={200}
              height={283}
              src="/memory-game/help-tooltip/mobile/banner-image.png"
            />
          </StyledTrofyImage>
        </StyledContent>
        <StyledBottomCta>
          <StyledBackButton
            startIcon={
              <StyledBackIconContainer>
                <BackIcon width={12} height={22} color={"#000"} />
              </StyledBackIconContainer>
            }
            variant="contained"
          >
            Go Back
          </StyledBackButton>
          <StyledNavIconContainer>
            <StyledNavCta>
              <PrevIcon size={50} color={"#000"} />
            </StyledNavCta>
            <StyledNavCta>
              <NextIcon size={50} color={"#000"} />
            </StyledNavCta>
          </StyledNavIconContainer>
        </StyledBottomCta>
      </StyledTooltipContainer>
    </Drawer>
  );
};
export default MobileHelpTooltip;
