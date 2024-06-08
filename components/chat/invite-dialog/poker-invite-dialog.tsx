import { useRef } from "react";
import { useRouter } from "next/router";

// type
import type { FC } from "react";
import type { ITheme } from "@/theme/poker.theme";

// theme
import { useTheme } from "styled-components";

// styled components
import {
  StyledPokerInviteDialog,
  StyledPokerInviteDialogContent,
  StyledPlayButton,
  StyledCloseCta,
  StyledPokerCardWrapper,
  StyledMainContent,
  StyledMainText,
  StyledSubtitle,
  StyledProposalSenderName,
} from "@/styles/components/chat/invite-dialog/poker-invite-dialog.style";

// components
import PokerCard from "@/components/poker/poker-card/poker-card";

// icons
import PlayButtonVector from "@/components/chat/invite-dialog/icons/play-button-vector";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  show_poker_invite_dialog,
  updateInviteDialog,
} from "@/store/slice/chat.slice";
import { updateRoomId } from "@/store/slice/game.slice";

// hooks
import { useIsMobile } from "@/hooks/common.hook";

const CloseIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        d="M1.624 0L0 1.624 8.376 10 0 18.376 1.624 20 10 11.624 18.376 20 20 18.376 11.624 10 20 1.624 18.376 0 10 8.376 1.624 0z"
      ></path>
    </svg>
  );
};

const PokerInviteDialog: FC = () => {
  const router = useRouter();
  const theme = useTheme() as ITheme;
  const dispatch = useAppDispatch();
  const _show_poker_invite_dialog = useAppSelector(show_poker_invite_dialog);
  const dialog_ref = useRef<HTMLDialogElement>(null);
  const is_mobile = useIsMobile();
  return (
    <StyledPokerInviteDialog
      open={_show_poker_invite_dialog}
      $mode="light"
      ref={dialog_ref}
    >
      <StyledPokerInviteDialogContent>
        <StyledProposalSenderName>by @ashish_classic</StyledProposalSenderName>
        <StyledPokerCardWrapper $left="18px" $bottom="68px" $rotate="-5deg">
          <PokerCard suit="club" rank="K" />
        </StyledPokerCardWrapper>
        <StyledPokerCardWrapper $right="14px" $bottom="15px" $rotate="5deg">
          <PokerCard suit="spade" rank="Q" />
        </StyledPokerCardWrapper>
        <StyledPlayButton
          onClick={() => {
            router.push("/poker");
          }}
        >
          <PlayButtonVector stroke_color={theme.palette.secondary.main} />
        </StyledPlayButton>
        <StyledCloseCta
          onClick={() => {
            dispatch(
              updateInviteDialog({
                modal_type: "poker",
                is_open: false,
              })
            );
            dispatch(updateRoomId(null));
          }}
        >
          <CloseIcon size={is_mobile ? 20 : 16} color={"#fff"} />
        </StyledCloseCta>
        <StyledMainContent>
          <StyledMainText>
            Texas Hold’em <br />
            ShowDown
          </StyledMainText>
          <StyledSubtitle>
            Fold 'em or Hold 'em? It's <br />
            Showdown Time!
          </StyledSubtitle>
        </StyledMainContent>
      </StyledPokerInviteDialogContent>
    </StyledPokerInviteDialog>
  );
};
export default PokerInviteDialog;
