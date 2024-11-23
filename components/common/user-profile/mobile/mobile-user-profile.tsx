import { useRouter } from "next/router";
import { useRef } from "react";
// types
import type { FC } from "react";
import type { IUser } from "@/types/store/slice/login";
import type { ITheme } from "@/theme/chat.theme";

// styled components
import {
  StyledWrapper,
  StyledModalWrapper,
  StyledBackdrop,
  StyledUserProfileContentWrapper,
  StyledHeader,
  StyledBackButton,
  StyledHeaderText,
  StyledChatProfileContent,
  StyledProfileWrappper,
  StyledUserProfile,
  StyledUploadButton,
  StyledPointsTag,
  StyledPointsImage,
  StyledPointsText,
  StyledUserDetailsWrapper,
  StyledName,
  StyledUserNameWrapper,
  StyledUserName,
  StyledCtaWrapper,
  StyledIconCta,
} from "@/styles/components/common/user-profile/mobile/mobile-user-profile.style";

// icons
import {
  GroupIcon,
  LogOutIcon,
} from "@/components/common/user-profile/user-profile-drop-down";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { resetChat } from "@/store/slice/chat.slice";
import {
  User,
  logoutUserApi,
  updateProfileApi,
} from "@/store/slice/login.slice";
import {
  mode,
  showCreateGroupDropdown,
  showProfileUploadModal,
  updateShowMobileProfile,
  updateShowProfileUploadModal,
  updateShowCreateGroupDrownDown,
} from "@/store/slice/common.slice";

// local components
import UploadProfileModal from "@/components/common/user-profile/upload-profile-modal";
import CreateGroupModal from "@/components/common/create-group/create-group-modal";
// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const BackIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        fill={color}
        d="M12.576 19.895l-1.084 1.084a1.167 1.167 0 01-1.656 0L.344 11.492a1.167 1.167 0 010-1.656L9.836.344a1.167 1.167 0 011.656 0l1.084 1.084c.463.464.454 1.22-.02 1.675L6.672 8.709h14.034c.649 0 1.171.522 1.171 1.171v1.563c0 .65-.522 1.172-1.171 1.172H6.672l5.884 5.605c.479.454.488 1.211.02 1.675z"
      ></path>
    </svg>
  );
};

const UploadIcon: FC<{
  width: number;
  height: number;
  color: string;
  stroke: string;
}> = ({ width, height, color, stroke }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 30 25"
    >
      <path
        fill={color}
        stroke={stroke}
        d="M7.969 4.071h.34l.125-.317.72-1.836C9.486 1.078 10.343.5 11.32.5h7.354c.978 0 1.835.577 2.165 1.418v.001l.727 1.836.125.316h5.497c1.3 0 2.312 1 2.312 2.179v16.071c0 1.18-1.013 2.179-2.313 2.179H2.813C1.512 24.5.5 23.501.5 22.321V6.25c0-1.18 1.013-2.179 2.313-2.179h5.156zM22.53 14.286c0-3.993-3.4-7.197-7.531-7.197-4.132 0-7.531 3.204-7.531 7.197s3.4 7.196 7.531 7.196c4.132 0 7.531-3.203 7.531-7.196zm-2.875 0c0 2.407-2.067 4.41-4.656 4.41-2.589 0-4.656-2.003-4.656-4.41 0-2.408 2.067-4.411 4.656-4.411 2.589 0 4.656 2.003 4.656 4.41z"
      ></path>
    </svg>
  );
};

const MobileUserProfile: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme() as ITheme;
  const _mode = useAppSelector(mode);
  const show_profile_upload_modal = useAppSelector(showProfileUploadModal);
  const user = useAppSelector(User) as IUser;
  const show_create_group_dropdown = useAppSelector(showCreateGroupDropdown);
  const user_avatar_url = useAvatarUrl(user);
  const upload_cta_ref = useRef<HTMLButtonElement>(null);
  const group_ref = useRef<HTMLButtonElement>(null);
  return (
    <StyledWrapper>
      {show_profile_upload_modal && (
        <>
          <StyledModalWrapper>
            <StyledBackdrop />
            <UploadProfileModal
              ref={upload_cta_ref}
              secondary_color={
                _mode == "dark"
                  ? theme.palette.info.main
                  : theme.palette.primary.dark
              }
              font_family={theme.fontFamily.lobster}
              onClickHandler={(file_state, file) => {
                const form_data = new FormData();
                form_data.append("avatar", file);
                dispatch(updateProfileApi({ form_data }));
              }}
            />
          </StyledModalWrapper>
        </>
      )}
      {show_create_group_dropdown && (
        <StyledModalWrapper>
          <StyledBackdrop />
          <CreateGroupModal ref={group_ref} />
        </StyledModalWrapper>
      )}
      <StyledUserProfileContentWrapper>
        <StyledHeader>
          <StyledBackButton
            onClick={() => {
              dispatch(updateShowMobileProfile(false));
            }}
          >
            <BackIcon size={22} color={theme.palette.primary.main} />
          </StyledBackButton>
          <StyledHeaderText>Gamer Profile</StyledHeaderText>
        </StyledHeader>
        <StyledChatProfileContent>
          <StyledProfileWrappper $mode={_mode}>
            <StyledUserProfile
              sizes="(max-width: 1400px) 40vw"
              src={user_avatar_url}
              fill={true}
              alt="profile"
            />
            <StyledUploadButton
              ref={upload_cta_ref}
              onClick={() => {
                dispatch(updateShowProfileUploadModal(true));
              }}
            >
              <UploadIcon
                width={30}
                height={25}
                color={theme.palette.primary.dark}
                stroke={
                  _mode == "dark"
                    ? theme.palette.primary.main
                    : theme.palette.primary.main
                }
              />
            </StyledUploadButton>
            <StyledPointsTag>
              <StyledPointsImage
                width={20}
                height={20}
                alt="points icon"
                src="/common/user-profile/dollar.png"
              />
              <StyledPointsText $mode={_mode}>
                {user.earned_points?.toFixed(2)}
              </StyledPointsText>
            </StyledPointsTag>
          </StyledProfileWrappper>
        </StyledChatProfileContent>
        <StyledUserDetailsWrapper>
          <StyledName>{user.name}</StyledName>
          <StyledUserNameWrapper $mode={_mode}>
            <StyledUserName>@{user.username}</StyledUserName>
          </StyledUserNameWrapper>
        </StyledUserDetailsWrapper>
        <StyledCtaWrapper>
          <StyledIconCta
            ref={group_ref}
            $mode={_mode}
            onClick={() => {
              dispatch(updateShowCreateGroupDrownDown(true));
            }}
          >
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
            $mode={_mode}
            onClick={() => {
              dispatch(logoutUserApi());
              router.push("/login");
              dispatch(resetChat());
              dispatch(updateShowMobileProfile(false));
            }}
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
      </StyledUserProfileContentWrapper>
    </StyledWrapper>
  );
};
export default MobileUserProfile;
