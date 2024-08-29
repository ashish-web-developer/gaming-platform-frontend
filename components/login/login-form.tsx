import { useState, forwardRef, useEffect, useRef } from "react";
// types
import type { ForwardRefRenderFunction } from "react";
import type { ITheme } from "@/theme/login.theme";
import type { IFileState } from "@/components/common/user-profile/upload-profile-modal";

// styled components
import {
  StyledForm,
  StyledWrapper,
  StyledTabWrapper,
  StyledTab,
  StyledInputWrapper,
  StyledInput,
  StyledSvgVectorWrapper,
  StyledImage,
  StyledSubmitCta,
  StyledPara,
  StyledCta,
} from "@/styles/components/login/login-form.style";

// theme
import { useTheme } from "styled-components";

// icons
import UserProfileIcon from "@/components/login/icons/user-profile-icon";
import LockIcon from "@/components/login/icons/lock-icon";
import CameraIcon from "@/components/login/icons/camera-icon";
import EyeIcon from "@/components/login/icons/eye-icon";

// redux
import { useAppDispatch } from "@/hooks/redux.hook";
import { updateShowProfileUploadModal } from "@/store/slice/common.slice";

const LoginForm: ForwardRefRenderFunction<
  HTMLButtonElement,
  {
    file_state: IFileState;
  }
> = ({ file_state }, ref) => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as ITheme;
  const [tab_index, set_tab_index] = useState<0 | 1>(1); // 0 => Signup, 1 => SignIn
  const form_container_ref = useRef<HTMLFormElement>(null);

  return (
    <StyledForm ref={form_container_ref}>
      <StyledTabWrapper className="wrapper">
        <StyledTab disabled={tab_index == 1}>Sign Up</StyledTab>
        <StyledTab disabled={tab_index == 0}>Sign In</StyledTab>
      </StyledTabWrapper>
      <StyledWrapper className="wrapper">
        <StyledInputWrapper>
          <StyledSvgVectorWrapper
            $width="44px"
            $height="44px"
            $show_border={true}
          >
            {file_state.state == 2 ? (
              <StyledImage
                src={file_state.file as string}
                fill={true}
                alt="file"
              />
            ) : (
              <UserProfileIcon />
            )}
          </StyledSvgVectorWrapper>
          <StyledInput type="text" placeholder="Username" />
          <StyledCta
            ref={ref}
            onClick={() => {
              dispatch(updateShowProfileUploadModal(true));
            }}
            $color="transparent"
          >
            <StyledSvgVectorWrapper
              $width="48px"
              $height="44px"
              $show_border={false}
            >
              <CameraIcon color={theme.palette.info.main} size={24} />
            </StyledSvgVectorWrapper>
          </StyledCta>
        </StyledInputWrapper>
      </StyledWrapper>
      <StyledWrapper className="wrapper">
        <StyledInputWrapper>
          <StyledSvgVectorWrapper
            $width="44px"
            $height="44px"
            $show_border={true}
          >
            <LockIcon />
          </StyledSvgVectorWrapper>
          <StyledInput type="password" placeholder="Password" />
          <StyledCta $color="transparent">
            <StyledSvgVectorWrapper
              $width="48px"
              $height="44px"
              $show_border={false}
            >
              <EyeIcon color={theme.palette.info.main} size={24} />
            </StyledSvgVectorWrapper>
          </StyledCta>
        </StyledInputWrapper>
      </StyledWrapper>
      <StyledSubmitCta className="wrapper" type="submit">
        Continue
      </StyledSubmitCta>
      <StyledPara>
        {tab_index == 0 ? (
          <>
            Already Have an Account?{" "}
            <StyledCta
              onClick={() => {
                set_tab_index(1);
              }}
              $color={theme.palette.info.main}
            >
              Sign In
            </StyledCta>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <StyledCta
              onClick={() => {
                set_tab_index(0);
              }}
              $color={theme.palette.info.main}
            >
              Sign Up
            </StyledCta>
          </>
        )}
      </StyledPara>
    </StyledForm>
  );
};
export default forwardRef(LoginForm);
