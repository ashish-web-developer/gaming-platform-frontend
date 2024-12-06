import { useRef, useState } from "react";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/login.theme";
import type { IFileState } from "@/components/common/user-profile/upload-profile-modal";
import type { IFieldType } from "@/types/store/slice/login";

// styled components
import {
  StyledPage,
  StyledImageContainer,
  StyledImage,
  StyledContentContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledUploadModalWrapper,
} from "@/styles/components/login/login-container/login-container.style";

// theme
import { useTheme } from "styled-components";

// hoc
import withLoginFunctionality from "@/hoc/login/with-login-functionality";

// local components
import LoginForm from "@/components/login/login-form";
import UploadProfileModal from "@/components/common/user-profile/upload-profile-modal";
import IntroductionTooltip from "@/components/login/introduction-tooltip";
import ValidationTooltip from "@/components/login/validation-tooltip";
import OnboardBanner from "@/components/login/onboard-banner";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type IProps = {
  show_profile_upload_modal: boolean;
  file_state: IFileState;
  tab_index: 0 | 1;
  updateTabIndex: (index: 0 | 1) => void;
  error: string;
  updateProfile: () => void;
  updateActiveField: (type: IFieldType) => void;
  profileOnClickHandler: (file_state: IFileState, file: File) => void;
};

const LoginContainer: FC<IProps> = ({
  show_profile_upload_modal,
  file_state,
  tab_index,
  updateTabIndex,
  error,
  updateProfile,
  updateActiveField,
  profileOnClickHandler,
}) => {
  const theme = useTheme() as ITheme;
  const camera_cta_ref = useRef<HTMLButtonElement>(null);
  const [show_onboard, setShowOnboard] = useState<boolean>(false);

  const { contextSafe } = useGSAP(() => {});

  const logoAnimationHandler = contextSafe((event_type: "enter" | "leave") => {
    gsap.to(".logo-container", {
      scale: event_type == "enter" ? 1.2 : 1,
      duration: 0.5,
      ease: "back.in",
    });
  });

  return (
    <StyledPage>
      <StyledImageContainer
        $width="311px"
        $height="308px"
        $right="0px"
        $top="0px"
      >
        <StyledImage
          src="/login/welcome-login-screen/spider-with-web.png"
          fill={true}
          alt="spider-web"
          sizes="(max-width: 1400px) 15vw"
        />
      </StyledImageContainer>
      <>
        <StyledLogoContainer className="logo-container">
          <StyledLogo
            onMouseEnter={() => logoAnimationHandler("enter")}
            onMouseLeave={() => logoAnimationHandler("leave")}
          >
            Fortune Realm
          </StyledLogo>
        </StyledLogoContainer>
        <IntroductionTooltip />
        <ValidationTooltip error={error} />
      </>
      <StyledContentContainer>
        <StyledImageContainer
          $width="533px"
          $height="534px"
          $top="50%"
          $left="50%"
          $translateX="-50%"
          $translateY="-50%"
        >
          <StyledImage
            src="/login/web-vector.png"
            fill={true}
            alt="spider-web"
            sizes="(max-width: 1400px) 30vw"
          />
        </StyledImageContainer>
        {show_onboard ? (
          <OnboardBanner />
        ) : (
          <LoginForm
            tab_index={tab_index}
            updateTabIndex={(index) => updateTabIndex(index)}
            updateProfile={updateProfile}
            updateActiveField={(field) => updateActiveField(field)}
            file_state={file_state}
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
      </StyledContentContainer>
    </StyledPage>
  );
};
export default withLoginFunctionality(LoginContainer);
