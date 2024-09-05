import { useState, forwardRef, useRef, useEffect } from "react";
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
import EyeIcon, { CloseEyeIcon } from "@/components/login/icons/eye-icon";

// redux
import { useAppDispatch } from "@/hooks/redux.hook";
import { updateShowProfileUploadModal } from "@/store/slice/common.slice";
import { verifyUserNameApi, updateIsTyping } from "@/store/slice/login.slice";

// gsap
import gsap from "gsap";

const LoginForm: ForwardRefRenderFunction<
  HTMLButtonElement,
  {
    file_state: IFileState;
  }
> = ({ file_state }, ref) => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as ITheme;
  const [tab_index, set_tab_index] = useState<0 | 1>(0); // 0 => Signup, 1 => SignIn
  const [show_password, set_show_password] = useState<boolean>(false);
  const form_container_ref = useRef<HTMLFormElement>(null);
  const timeout_ref = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const gsap_context = gsap.context(() => {
      gsap.from(".field-wrapper", {
        scale: 1.2,
        opacity: 0,
        duration: 1,
        ease: "bounce",
        stagger: 0.1,
      });
    }, form_container_ref);
    return () => {
      gsap_context.revert();
    };
  }, []);
  return (
    <StyledForm
      onFocus={() => {
        dispatch(updateIsTyping(true));
      }}
      ref={form_container_ref}
    >
      <StyledTabWrapper className="field-wrapper">
        <StyledTab disabled={tab_index == 1}>Sign Up</StyledTab>
        <StyledTab disabled={tab_index == 0}>Sign In</StyledTab>
      </StyledTabWrapper>
      <StyledWrapper className="field-wrapper">
        <StyledInputWrapper $grid_template_colums="44px 1fr 48px">
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
          <StyledInput
            onChange={(event) => {
              timeout_ref.current && clearTimeout(timeout_ref.current);
              timeout_ref.current = setTimeout(async () => {
                // const result = await dispatch(
                //   verifyUserNameApi({ username: event.target.value })
                // );
                // const response = unwrapResult(result);
                // console.log("value of response",response.message.username[0]);
                dispatch(verifyUserNameApi({ username: event.target.value }));
              }, 1000);
            }}
            type="text"
            placeholder="Username"
          />
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
      <StyledWrapper className="field-wrapper">
        <StyledInputWrapper $grid_template_colums="44px 1fr 48px">
          <StyledSvgVectorWrapper
            $width="44px"
            $height="44px"
            $show_border={true}
          >
            <LockIcon />
          </StyledSvgVectorWrapper>
          <StyledInput
            type={show_password ? "text" : "password"}
            placeholder="Password"
          />
          <StyledCta $color="transparent">
            <StyledSvgVectorWrapper
              $width="48px"
              $height="44px"
              $show_border={false}
              onClick={(event) => {
                set_show_password((prev) => !prev);
              }}
            >
              {show_password ? (
                <CloseEyeIcon color={theme.palette.info.main} size={24} />
              ) : (
                <EyeIcon color={theme.palette.info.main} size={24} />
              )}
            </StyledSvgVectorWrapper>
          </StyledCta>
        </StyledInputWrapper>
      </StyledWrapper>
      {tab_index == 0 && (
        <StyledWrapper className="field-wrapper">
          <StyledInputWrapper $grid_template_colums="44px 1fr">
            <StyledSvgVectorWrapper
              $width="44px"
              $height="44px"
              $show_border={true}
            >
              <LockIcon />
            </StyledSvgVectorWrapper>
            <StyledInput type="password" placeholder="Confirm password" />
          </StyledInputWrapper>
        </StyledWrapper>
      )}

      <StyledSubmitCta className="field-wrapper" type="submit">
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
