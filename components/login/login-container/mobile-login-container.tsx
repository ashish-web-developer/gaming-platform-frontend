import { useRef } from "react";
// types
import type { FC } from "react";
import type { IFileState } from "@/components/common/user-profile/upload-profile-modal";
import type { IFieldType } from "@/types/store/slice/login";

// theme
import { useTheme } from "styled-components";

// hoc
import withLoginFunctionality from "@/hoc/login/with-login-functionality";

// local components
import LoginForm from "@/components/login/login-form";
import UploadProfileModal from "@/components/common/user-profile/upload-profile-modal";

// styled components
import {
  StyledPage,
  StyledUploadModalWrapper,
  StyledLogo,
} from "@/styles/components/login/login-container/mobile-login-container.style";

type IBaseProps = {
  show_profile_upload_modal: boolean;
  file_state: IFileState;
  tab_index: 0 | 1;
  updateTabIndex: (index: 0 | 1) => void;
  error: string;
  updateProfile: () => void;
  updateActiveField: (type: IFieldType) => void;
  profileOnClickHandler: (file_state: IFileState, file: File) => void;
};

const MobileLoginContainer: FC<IBaseProps> = ({
  show_profile_upload_modal,
  file_state,
  tab_index,
  updateTabIndex,
  error,
  updateProfile,
  updateActiveField,
  profileOnClickHandler,
}) => {
  const theme = useTheme();
  const camera_cta_ref = useRef<HTMLButtonElement>(null);
  return (
    <StyledPage>
      <StyledLogo>Fortune Realm</StyledLogo>
      <LoginForm
        tab_index={tab_index}
        updateTabIndex={updateTabIndex}
        updateProfile={updateProfile}
        updateActiveField={updateActiveField}
        file_state={file_state}
        error={error}
        ref={camera_cta_ref}
      />
      <StyledUploadModalWrapper $is_modal_open={show_profile_upload_modal}>
        {show_profile_upload_modal && (
          <UploadProfileModal
            onClickHandler={profileOnClickHandler}
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
export default withLoginFunctionality(MobileLoginContainer);
