import { useRef, useEffect } from "react";
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
  StyledSuitWrapper,
  StyledPlayButton,
  StyledCloseCta,
  StyledPokerCardWrapper,
  StyledMainText,
  StyledInvitorDetails,
  StyledCountDown,
} from "@/styles/components/chat/invite-dialog/poker-invite-dialog.style";

// components
import PokerCard from "@/components/poker/poker-card/poker-card";

// hoc
import withCountDownFunctionality from "@/hoc/common/with-count-down-functionality";

// icons
import PlayButtonVector from "@/components/chat/invite-dialog/icons/play-button-vector";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  showPokerInviteDialog,
  updateInviteDialog,
} from "@/store/slice/chat.slice";
import { mode as Mode } from "@/store/slice/common.slice";
import {
  roomCreatedAt,
  updatePokerRoomId,
  updateRoomCreatedAt,
} from "@/store/slice/poker/poker.slice";

// hooks
import { useIsMobile } from "@/hooks/common.hook";

// icons
import Suit from "@/components/poker/icons/suit";

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

// handling count down
const CountDown: FC<{
  count: number;
  is_finished: boolean;
}> = ({ count, is_finished }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (is_finished) {
      dispatch(
        updateInviteDialog({
          modal_type: "poker",
          is_open: false,
        })
      );

      dispatch(updatePokerRoomId(null));
      dispatch(updateRoomCreatedAt(null));
    }
  }, [is_finished]);
  return <StyledCountDown>{count}</StyledCountDown>;
};

const WithCountDown = withCountDownFunctionality<{
  initial_count: number;
}>(CountDown);

// invite dialog

const PokerInviteDialog: FC = () => {
  const router = useRouter();
  const mode = useAppSelector(Mode);
  const theme = useTheme() as ITheme;
  const dispatch = useAppDispatch();
  const show_poker_invite_dialog = useAppSelector(showPokerInviteDialog);
  const dialog_ref = useRef<HTMLDialogElement>(null);
  const room_created_at = useAppSelector(roomCreatedAt);
  const seconds = Math.floor(
    new Date(room_created_at as string).getTime() / 1000 +
      60 -
      new Date().getTime() / 1000
  );
  const is_mobile = useIsMobile();

  return (
    <StyledPokerInviteDialog
      open={show_poker_invite_dialog}
      $mode="light"
      ref={dialog_ref}
      $border_color={
        mode == "light"
          ? `4px dashed ${theme.palette.info.main}`
          : `4px solid ${theme.palette.info.main}`
      }
    >
      <StyledPokerInviteDialogContent>
        <StyledSuitWrapper $top="75px" $left="36px">
          <Suit
            size={20}
            stroke={theme.palette.secondary.main}
            stroke_width={1}
            suit_type="heart"
          />
        </StyledSuitWrapper>

        <StyledSuitWrapper $bottom="31px" $left="42px">
          <Suit
            size={20}
            stroke={theme.palette.secondary.main}
            stroke_width={1}
            suit_type="club"
          />
        </StyledSuitWrapper>
        <StyledSuitWrapper $top="27px" $right="68px">
          <Suit
            size={20}
            stroke={theme.palette.secondary.main}
            stroke_width={1}
            suit_type="spade"
          />
        </StyledSuitWrapper>
        <StyledSuitWrapper $bottom="67px" $right="72px">
          <Suit
            size={20}
            stroke={theme.palette.secondary.main}
            stroke_width={1}
            suit_type="diamond"
          />
        </StyledSuitWrapper>
        <StyledPokerCardWrapper $left="-px" $bottom="20px" $rotate="-13deg">
          <PokerCard card_id="1" suit="club" rank="K" scale={0.4} />
        </StyledPokerCardWrapper>
        <StyledPokerCardWrapper $right="-10px" $bottom="70px" $rotate="6deg">
          <PokerCard card_id="2" suit="spade" rank="Q" scale={0.4} />
        </StyledPokerCardWrapper>
        <StyledPlayButton
          onClick={() => {
            router.push("/poker");
          }}
        >
          <PlayButtonVector stroke_color={theme.palette.success.main} />
        </StyledPlayButton>
        <StyledCloseCta
          onClick={() => {
            dispatch(
              updateInviteDialog({
                modal_type: "poker",
                is_open: false,
              })
            );
            dispatch(updatePokerRoomId(null));
            dispatch(updateRoomCreatedAt(null));
          }}
        >
          <CloseIcon size={is_mobile ? 20 : 16} color={"#fff"} />
        </StyledCloseCta>
        <StyledMainText>
          Texas Hold’em <br />
          ShowDown
        </StyledMainText>
        <StyledInvitorDetails>Invitation by poker.champs</StyledInvitorDetails>
        <WithCountDown initial_count={seconds} />
      </StyledPokerInviteDialogContent>
    </StyledPokerInviteDialog>
  );
};
export default PokerInviteDialog;
