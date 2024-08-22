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

// icons
import PlayButtonVector from "@/components/chat/invite-dialog/icons/play-button-vector";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  show_cognimatch_invite_dialog,
  updateInviteDialog,
} from "@/store/slice/chat.slice";
import {
  updateCognimatchRoomId,
  getCognimatchRoomInfoApi,
} from "@/store/slice/cognimatch.slice";
import { mode } from "@/store/slice/common.slice";
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

const CogniMatchInviteDialog: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const theme = useTheme() as Theme;
  const _show_cognimatch_invite_dialog = useAppSelector(
    show_cognimatch_invite_dialog
  );
  const _user = useAppSelector(user);
  const dialog_ref = useRef<HTMLDialogElement>(null);
  const is_mobile = useIsMobile();

  return (
    <StyledCogniMatchInviteDialog
      $mode={_mode}
      open={_show_cognimatch_invite_dialog}
      ref={dialog_ref}
    >
      <StyledPlayButton
        onClick={() => {
          dispatch(getCognimatchRoomInfoApi());
          router.push("/cognimatch");
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
          dispatch(updateCognimatchRoomId(null));
        }}
      >
        <CloseIcon size={is_mobile ? 20 : 16} color={"#000"} />
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
        {_user.name} <StyledTextSpan $color="#F42C04">v\s</StyledTextSpan>{" "}
      </StyledVsText>
    </StyledCogniMatchInviteDialog>
  );
};

export default CogniMatchInviteDialog;
