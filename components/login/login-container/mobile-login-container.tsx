import { useState, useRef } from "react";
// types
import type { FC } from "react";
import type { IFileState } from "@/components/common/user-profile/upload-profile-modal";

// theme
import { useTheme } from "styled-components";

// local components
import LoginForm from "@/components/login/login-form";
import UploadProfileModal from "@/components/common/user-profile/upload-profile-modal";

// styled components
import {
  StyledPage,
  StyledUploadModalWrapper,
  StyledLogo,
} from "@/styles/components/login/login-container/mobile-login-container.style";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { updateProfileApi } from "@/store/slice/login.slice";
import { showProfileUploadModal } from "@/store/slice/common.slice";

const MobileLoginContainer: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const show_profile_upload_modal = useAppSelector(showProfileUploadModal);
  const file_ref = useRef<File>();
  const camera_cta_ref = useRef<HTMLButtonElement>(null);
  const [tab_index, setTabIndex] = useState<0 | 1>(0); // 0 => Signup, 1 => SignIn
  const [active_field, setActiveField] = useState<
    "username" | "password" | "confirm_password" | null
  >(null);
  const [file_state, set_file_state] = useState<IFileState>({
    state: 0, // 0 => empty; 1 => loading; 2 => done;
    file: "",
  });
  const updateProfile = () => {
    if (file_ref.current) {
      const form_data = new FormData();
      form_data.append("avatar", file_ref.current);
      dispatch(updateProfileApi({ form_data: form_data }));
    }
  };
  return (
    <StyledPage>
      <StyledLogo>Fortune Realm</StyledLogo>
      <LoginForm
        tab_index={tab_index}
        updateTabIndex={(index) => setTabIndex(index)}
        updateProfile={updateProfile}
        updateActiveField={(field) => setActiveField(field)}
        file_state={file_state}
        ref={camera_cta_ref}
      />
      <StyledUploadModalWrapper $is_modal_open={show_profile_upload_modal}>
        {show_profile_upload_modal && (
          <UploadProfileModal
            onClickHandler={(file_state, file) => {
              set_file_state(file_state);
              file_ref.current = file;
            }}
            ref={camera_cta_ref}
            secondary_color={theme.palette.info.main}
            font_family={theme.fontFamily.bangers}
            show_girl_image={true}
          />
        )}
      </StyledUploadModalWrapper>
    </StyledPage>
  );
};
export default MobileLoginContainer;
