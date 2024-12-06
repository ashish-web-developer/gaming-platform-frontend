import { useRef, useState } from "react";
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
import OnboardBanner from "@/components/login/onboard-banner";

// styled components
import {
  StyledPage,
  StyledImageContainer,
  StyledImage,
  StyledUploadModalWrapper,
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
  const [show_onboard, setShowOnboard] = useState(false);
  const camera_cta_ref = useRef<HTMLButtonElement>(null);
  return (
    <StyledPage>
      <StyledImageContainer
        $width="207px"
        $height="182px"
        $left="-14px"
        $top="0px"
      >
        <StyledImage
          src="/login/welcome-login-screen/spider-with-web.png"
          fill={true}
          alt="spider-web"
          sizes="(max-width:600px) 30vw"
        />
      </StyledImageContainer>
      <StyledImageContainer
        $width="157px"
        $height="168px"
        $top="-60px"
        $right="-60px"
      >
        <StyledImage
          src="/login/welcome-login-screen/web-vector.png"
          fill={true}
          alt="spider-web"
          sizes="(max-width:600px) 30vw"
        />
      </StyledImageContainer>
      <StyledImageContainer
        $width="90px"
        $height="76px"
        $top="60px"
        $left="50%"
      >
        <StyledImage
          src="/login/welcome-login-screen/finger-prints-1.png"
          fill={true}
          alt="finger-prints-1"
          sizes="(max-width:600px) 20vw"
        />
      </StyledImageContainer>
      <StyledImageContainer
        $width="38px"
        $height="38px"
        $bottom="60px"
        $left="78px"
      >
        <StyledImage
          src="/login/welcome-login-screen/finger-prints-2.png"
          fill={true}
          alt="finger-prints-1"
          sizes="(max-width:600px) 20vw"
        />
      </StyledImageContainer>
      {show_onboard ? (
        <OnboardBanner />
      ) : (
        <LoginForm
          tab_index={tab_index}
          updateTabIndex={updateTabIndex}
          updateProfile={updateProfile}
          updateActiveField={updateActiveField}
          file_state={file_state}
          error={error}
          ref={camera_cta_ref}
          updateShowOnboard={(show_onboard) => setShowOnboard(show_onboard)}
        />
      )}
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
