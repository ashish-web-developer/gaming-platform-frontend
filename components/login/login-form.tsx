import { useState } from "react";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/login.theme";

// styled components
import {
  StyledForm,
  StyledWrapper,
  StyledTabWrapper,
  StyledTab,
  StyledInputWrapper,
  StyledInput,
  StyledSvgVectorWrapper,
  StyledSubmitCta,
} from "@/styles/components/login/login-form.style";

// theme
import { useTheme } from "styled-components";

// icons
import UserProfileIcon from "@/components/login/icons/user-profile-icon";
import LockIcon from "@/components/login/icons/lock-icon";
import CameraIcon from "@/components/login/icons/camera-icon";
import EyeIcon from "@/components/login/icons/eye-icon";

const LoginForm: FC = () => {
  const theme = useTheme() as ITheme;
  const [tab_index, set_tab_index] = useState<0 | 1>(0);
  return (
    <StyledForm>
      <StyledTabWrapper>
        <StyledTab disabled={tab_index == 0} onClick={() => {}}>
          Sign In
        </StyledTab>
        <StyledTab disabled={tab_index == 1} onClick={() => {}}>
          Sign Up
        </StyledTab>
      </StyledTabWrapper>
      <StyledWrapper>
        <StyledInputWrapper>
          <StyledSvgVectorWrapper
            $width="44px"
            $height="44px"
            $show_border={true}
          >
            <UserProfileIcon />
          </StyledSvgVectorWrapper>
          <StyledInput type="text" placeholder="Username" />
          <StyledSvgVectorWrapper
            $width="48px"
            $height="44px"
            $show_border={false}
          >
            <CameraIcon color={theme.palette.info.main} size={24} />
          </StyledSvgVectorWrapper>
        </StyledInputWrapper>
      </StyledWrapper>
      <StyledWrapper>
        <StyledInputWrapper>
          <StyledSvgVectorWrapper
            $width="44px"
            $height="44px"
            $show_border={true}
          >
            <LockIcon />
          </StyledSvgVectorWrapper>
          <StyledInput type="password" placeholder="Password" />
          <StyledSvgVectorWrapper
            $width="48px"
            $height="44px"
            $show_border={false}
          >
            <EyeIcon color={theme.palette.info.main} size={24} />
          </StyledSvgVectorWrapper>
        </StyledInputWrapper>
      </StyledWrapper>
      <StyledSubmitCta>Continue</StyledSubmitCta>
    </StyledForm>
  );
};
export default LoginForm;
