import { useRef, useEffect, useState, useContext } from "react";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/login.theme";
import type { IFileState } from "@/components/common/user-profile/upload-profile-modal";

// styled components
import {
  StyledPage,
  StyledContentContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledUploadModalWrapper,
} from "@/styles/components/login/login-container.style";

// theme
import { useTheme } from "styled-components";

// local components
import LoginForm from "@/components/login/login-form";
import UploadProfileModal from "@/components/common/user-profile/upload-profile-modal";
import IntroductionTooltip from "@/components/login/introduction-tooltip";
import ValidationTooltip from "@/components/login/validation-tooltip";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { show_profile_upload_modal } from "@/store/slice/common.slice";
import {
  showValidationTooltip,
  showIntroductionTooltip,
} from "@/store/slice/login.slice";

const LoginContainer: FC = () => {
  const theme = useTheme() as ITheme;
  const page_container_ref = useRef(null);
  const show_introduction_tooltip = useAppSelector(showIntroductionTooltip);
  const show_validation_tooltip = useAppSelector(showValidationTooltip);
  const _show_profile_upload_modal = useAppSelector(show_profile_upload_modal);
  const camera_cta_ref = useRef<HTMLButtonElement>(null);
  const [file_state, set_file_state] = useState<IFileState>({
    state: 0, // 0 => empty; 1 => loading; 2 => done;
    file: "",
  });

  return (
    <StyledPage ref={page_container_ref}>
      <>
        <StyledLogoContainer className="logo-container">
          <StyledLogo>Fortune Realm</StyledLogo>
        </StyledLogoContainer>
        {show_introduction_tooltip && <IntroductionTooltip />}
        {show_validation_tooltip && <ValidationTooltip />}
      </>
      <StyledContentContainer>
        <>
          <LoginForm file_state={file_state} ref={camera_cta_ref} />
          <StyledUploadModalWrapper $is_modal_open={_show_profile_upload_modal}>
            <UploadProfileModal
              onClickHandler={(file_state) => {
                set_file_state(file_state);
              }}
              ref={camera_cta_ref}
              secondary_color={theme.palette.info.main}
              font_family={theme.fontFamily.bangers}
              show_girl_image={true}
            />
          </StyledUploadModalWrapper>
        </>
      </StyledContentContainer>
    </StyledPage>
  );
};
export default LoginContainer;
