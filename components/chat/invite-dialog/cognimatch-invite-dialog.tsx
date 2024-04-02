import { useRouter } from "next/router";
import { useRef } from "react";
// types
import type { FC } from "react";
import type { Theme } from "@/theme/chat.theme";

// styled components
import {
  StyledCogniMatchInviteDialog,
  StyledMainContent,
  StyledMainText,
  StyledTextSpan,
  StyledSubtitle,
  StyledVsText,
  StyledPlayButton,
  StyledCloseCta,
} from "@/styles/components/chat/invite-dialog/cognimatch-invite-dialog.style";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  show_cognimatch_invite_dialog,
  updateInviteDialog,
  acceptInvitationApi,
} from "@/store/slice/chat.slice";
import { updateRoomId, updateGamingUser } from "@/store/slice/game.slice";
import { mode } from "@/store/slice/common.slice";

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

const PlayButtonVector: FC = () => {
  const _mode = useAppSelector(mode);
  const theme = useTheme() as Theme;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="43"
      fill="none"
      viewBox="0 0 48 43"
    >
      <g filter="url(#filter0_d_1141_5735)">
        <path
          fill="#000"
          d="M11.257 1.4L4 7.7v25.9h21.046l1.451 1.4h5.806l1.451-1.4h7.258l2.902-2.8V1.4h-3.628L38.834 0h-6.531l-1.451 1.4H11.257z"
        ></path>
        <path
          fill="#000"
          stroke={
            _mode == "dark"
              ? theme.palette.primary.dark
              : theme.palette.primary.light
          }
          d="M12.777 2.66L6.18 8.33v23.31h19.132l1.32 1.26h5.278l1.32-1.26h6.597l2.639-2.52V2.66h-3.3L37.848 1.4H31.91l-1.32 1.26H12.777z"
        ></path>
        <path
          fill="#fff"
          d="M33.554 15.737L21.081 8.624c-1.013-.577-2.565-.017-2.565 1.412v14.222c0 1.282 1.442 2.055 2.565 1.412l12.473-7.11a1.61 1.61 0 000-2.823z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_1141_5735"
          width="47.914"
          height="43"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1141_5735"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1141_5735"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
};

const CogniMatchInviteDialog: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const theme = useTheme() as Theme;
  const _show_cognimatch_invite_dialog = useAppSelector(
    show_cognimatch_invite_dialog
  );
  const dialog_ref = useRef<HTMLDialogElement>(null);

  return (
    <StyledCogniMatchInviteDialog
      $mode={_mode}
      open={_show_cognimatch_invite_dialog}
      ref={dialog_ref}
    >
      <StyledPlayButton
        onClick={() => {
          dispatch(
            acceptInvitationApi({
              is_accepted: true,
            })
          );
          dispatch(
            updateInviteDialog({
              modal_type: "cognimatch",
              is_open: false,
            })
          );
          router.push("/memory-game");
        }}
      >
        <PlayButtonVector />
      </StyledPlayButton>
      <StyledCloseCta
        onClick={() => {
          dispatch(
            updateInviteDialog({
              modal_type: "cognimatch",
              is_open: false,
            })
          );
          dispatch(updateRoomId(null));
          dispatch(updateGamingUser(null));
        }}
      >
        <CloseIcon size={16} color={"#000"} />
      </StyledCloseCta>
      <StyledMainContent>
        <StyledMainText>
          Cogni
          <StyledTextSpan
            $color={
              _mode == "dark"
                ? theme.palette.primary.dark
                : theme.palette.primary.light
            }
          >
            Match
          </StyledTextSpan>
        </StyledMainText>
        <StyledSubtitle $mode={_mode}>
          Card chaos or memory magic? <br />
          Time to find out!
        </StyledSubtitle>
      </StyledMainContent>
      <StyledVsText $mode={_mode}>
        Ashish <StyledTextSpan $color="#F42C04">v\s</StyledTextSpan> Angelina
      </StyledVsText>
    </StyledCogniMatchInviteDialog>
  );
};

export default CogniMatchInviteDialog;
