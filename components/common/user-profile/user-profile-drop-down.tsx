import { useRef, forwardRef } from "react";
import { useRouter } from "next/router";
// types
import { FC, ForwardRefRenderFunction, RefObject } from "react";
import { IUsersWithConversation } from "@/types/store/slice/chat";
import { Theme } from "@/theme/chat.theme";

// styled components
import {
  StyledUserProfileDropDownWrapper,
  StyledUserImageWrapper,
  StyledUserImage,
  StyledName,
  StyledUserName,
  StyledCtaWrapper,
  StyledIconCta,
} from "@/styles/components/common/user-profile/user-profile-drop-down.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { user, logoutUserApi, resetUser } from "@/store/slice/user.slice";
import { resetChat } from "@/store/slice/chat.slice";
import {
  mode,
  updateShowProfileUploadModal,
  updateShowProfileDropDown,
} from "@/store/slice/common.slice";

// styled theme
import { useTheme } from "styled-components";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";
import { useOutsideClickHandler } from "@/hooks/common.hook";

const CameraIcon: FC<{
  size: number;
  stroke: string;
}> = ({ size, stroke }) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        stroke={stroke}
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 18V8c0-.6.4-1 1-1h1.5l1.7-1.7c.2-.2.4-.3.7-.3h6.2c.3 0 .5.1.7.3L17.5 7H19c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1Z"
      />
      <path
        stroke={stroke}
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
};

const GroupIcon: FC<{
  size: number;
  stroke: string;
}> = ({ size, stroke }) => {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeWidth="2"
        d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3a2.5 2.5 0 1 1 2-4.5M19.5 17h.5c.6 0 1-.4 1-1a3 3 0 0 0-3-3h-1m0-3a2.5 2.5 0 1 0-2-4.5m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3c0 .6-.4 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
      />
    </svg>
  );
};

const LogOutIcon: FC<{
  size: number;
  color: string;
  stroke: string;
}> = ({ size, color, stroke }) => {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill={stroke}
        d="M377.9 105.9l122.8 122.8c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9-18.7 0-33.9-15.2-33.9-33.9V320H192c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32h128v-62.1c0-18.7 15.2-33.9 33.9-33.9 9 0 17.6 3.6 24 9.9zM160 96H96c-17.7 0-32 14.3-32 32v256c0 17.7 14.3 32 32 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-53 0-96-43-96-96V128c0-53 43-96 96-96h64c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
      ></path>
    </svg>
  );
};

interface IProps {
  chevron_cta_ref: RefObject<HTMLButtonElement>;
}

const UserProfileDropDown: ForwardRefRenderFunction<
  HTMLButtonElement,
  IProps
> = ({ chevron_cta_ref }, camera_cta_ref) => {
  const theme = useTheme() as Theme;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const _mode = useAppSelector(mode);
  const _user = useAppSelector(user);
  const user_avatar_url = useAvatarUrl(_user as IUsersWithConversation);
  const container_ref = useRef<HTMLDivElement>(null);
  useOutsideClickHandler({
    modal_ref: container_ref,
    cta_ref: chevron_cta_ref,
    handler: () => {
      dispatch(updateShowProfileDropDown(false));
    },
  });

  return (
    <>
      <StyledUserProfileDropDownWrapper ref={container_ref}>
        <StyledUserImageWrapper $mode={_mode}>
          <StyledUserImage
            src={user_avatar_url}
            alt="user-profile"
            fill={true}
            sizes="(max-width: 1400px) 10vw"
          />
        </StyledUserImageWrapper>
        <StyledName>{_user.name}</StyledName>
        <StyledUserName>@{_user.username}</StyledUserName>
        <StyledCtaWrapper>
          <StyledIconCta
            onClick={() => {
              dispatch(updateShowProfileUploadModal(true));
              // dispatch(updateShowProfileDropDown(false));
            }}
            $mode={_mode}
            ref={camera_cta_ref}
          >
            <CameraIcon
              size={20}
              stroke={
                _mode == "light"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light
              }
            />
          </StyledIconCta>

          <StyledIconCta $mode={_mode}>
            <GroupIcon
              size={20}
              stroke={
                _mode == "light"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light
              }
            />
          </StyledIconCta>

          <StyledIconCta
            onClick={() => {
              dispatch(logoutUserApi());
              router.push("/login");
              dispatch(resetUser());
              dispatch(resetChat());
              dispatch(updateShowProfileDropDown(false));
            }}
            $mode={_mode}
          >
            <LogOutIcon
              size={16}
              color={"rgba(255,255,255,0)"}
              stroke={
                _mode == "light"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light
              }
            />
          </StyledIconCta>
        </StyledCtaWrapper>
      </StyledUserProfileDropDownWrapper>
    </>
  );
};

export default forwardRef(UserProfileDropDown);
