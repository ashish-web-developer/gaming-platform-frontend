import { useRouter } from "next/router";
import { useState, forwardRef, useRef } from "react";
// types
import type { ForwardRefRenderFunction, ChangeEvent, FocusEvent } from "react";
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
  StyledError,
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
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { updateShowProfileUploadModal } from "@/store/slice/common.slice";
import {
  validationErrorList,
  verifyUserNameApi,
  updateIsTyping,
  addValidationError,
  removeValidationError,
  registerUserApi,
  loginUserApi,
} from "@/store/slice/login.slice";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LoginForm: ForwardRefRenderFunction<
  HTMLButtonElement,
  {
    file_state: IFileState;
    tab_index: 0 | 1; // 0 => Signup, 1 => SignIn
    updateTabIndex: (index: 0 | 1) => void;
    updateActiveField: (
      field: "username" | "password" | "confirm_password" | null
    ) => void;
    updateProfile: () => void;
    error?: string;
    updateShowOnboard: (show_onboard: boolean) => void;
  }
> = (
  {
    file_state,
    tab_index,
    updateActiveField,
    updateProfile,
    updateTabIndex,
    error,
    updateShowOnboard,
  },
  ref
) => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as ITheme;
  const router = useRouter();
  const validation_error_list = useAppSelector(validationErrorList);
  const [show_password, set_show_password] = useState<boolean>(false);
  const form_container_ref = useRef<HTMLFormElement>(null);
  const [is_form_input_disabled, setIsFormInputDisabled] =
    useState<boolean>(true);
  const timeout_ref = useRef<{
    username: NodeJS.Timeout | null;
    password: NodeJS.Timeout | null;
    confirm_password: NodeJS.Timeout | null;
  }>({
    username: null,
    password: null,
    confirm_password: null,
  });
  const [form_data, setFormData] = useState<{
    username: string;
    password: string;
    confirm_password: string;
  }>({
    username: "",
    password: "",
    confirm_password: "",
  });
  const [stroke, setStroke] = useState<string>("rgba(214, 255, 183,0.6)");

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name as keyof typeof form_data]: event.target.value,
      };
    });
  };
  const confirmPasswordValidationHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (
      event.target.value &&
      form_data[
        event.target.name == "password" ? "confirm_password" : "password"
      ] &&
      event.target.value !==
        form_data[
          event.target.name == "password" ? "confirm_password" : "password"
        ]
    ) {
      dispatch(
        addValidationError({
          error: "password do not match",
          type: event.target.name as "confirm_password" | "password",
        })
      );
    } else {
      dispatch(
        removeValidationError({
          type: event.target.name as "confirm_password" | "password",
        })
      );
    }
  };

  const { contextSafe } = useGSAP(
    () => {
      gsap
        .timeline({
          onComplete: () => {
            setTimeout(() => {
              setStroke(theme.palette.info.main);
              setIsFormInputDisabled(false);
            }, 1000);
          },
        })
        .from(".field-wrapper", {
          scale: 1.2,
          opacity: 0,
          duration: 1,
          ease: "bounce",
          stagger: 0.1,
        });
    },
    {
      scope: form_container_ref,
      dependencies: [tab_index],
      revertOnUpdate: true,
    }
  );

  const fieldAnimationHandler = contextSafe(
    (
      event: FocusEvent<HTMLFormElement, Element>,
      event_type: "focus" | "blur"
    ) => {
      let target = event.target.parentElement?.parentElement;
      target &&
        gsap.to(target, {
          scale: event_type == "focus" ? 1.05 : 1,
          duration: 0.5,
          ease: "bounce",
        });
    }
  );

  return (
    <StyledForm
      onFocus={(event) => {
        fieldAnimationHandler(event, "focus");
        dispatch(updateIsTyping(true));
        updateActiveField(
          event.target.name as "username" | "password" | "confirm_password"
        );
      }}
      onBlur={(event) => {
        fieldAnimationHandler(event, "blur");
        updateActiveField(null);
      }}
      onChange={() => {
        dispatch(
          removeValidationError({
            type: "auth_failed",
          })
        );
      }}
      ref={form_container_ref}
      onSubmit={async (event) => {
        event.preventDefault();
        if (tab_index == 0) {
          const result = await dispatch(
            registerUserApi({
              username: form_data.username,
              password: form_data.password,
            })
          );
          const response = unwrapResult(result);
          updateProfile();
          if (response.success) {
            updateShowOnboard(true);
          }
        } else {
          const result = await dispatch(
            loginUserApi({
              email: null,
              username: form_data.username,
              password: form_data.password,
            })
          );
          const response = unwrapResult(result);
          if (response.success) {
            router.push("/chat");
          }
        }
      }}
    >
      <StyledTabWrapper className="field-wrapper">
        <StyledTab disabled={tab_index == 1}>Sign Up</StyledTab>
        <StyledTab disabled={tab_index == 0}>Sign In</StyledTab>
      </StyledTabWrapper>
      <StyledWrapper className="field-wrapper">
        <StyledInputWrapper
          $border_color={
            validation_error_list.some((error) => error.type == "username")
              ? theme.palette.error.main
              : stroke
          }
          $grid_template_colums={tab_index == 0 ? "44px 1fr 48px" : "44px 1fr"}
        >
          <StyledSvgVectorWrapper
            $width="44px"
            $height="44px"
            $show_border={true}
            $border_color={
              validation_error_list.some((error) => error.type == "username")
                ? theme.palette.error.main
                : stroke
            }
          >
            {file_state.state == 2 ? (
              <StyledImage
                src={file_state.file as string}
                fill={true}
                alt="file"
              />
            ) : (
              <UserProfileIcon stroke={stroke} />
            )}
          </StyledSvgVectorWrapper>
          <StyledInput
            disabled={is_form_input_disabled}
            onChange={(event) => {
              onChangeHandler(event);
              if (tab_index == 0) {
                timeout_ref.current.username &&
                  clearTimeout(timeout_ref.current.username);
                timeout_ref.current.username = setTimeout(async () => {
                  dispatch(verifyUserNameApi({ username: event.target.value }));
                }, 1000);
              }
            }}
            type="text"
            placeholder="Username"
            name="username"
            value={form_data.username}
            autoComplete="off"
          />
          {tab_index == 0 && (
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
                <CameraIcon color={stroke} size={24} />
              </StyledSvgVectorWrapper>
            </StyledCta>
          )}
        </StyledInputWrapper>
      </StyledWrapper>
      <StyledWrapper className="field-wrapper">
        <StyledInputWrapper
          $border_color={
            validation_error_list.some((error) => error.type == "password")
              ? theme.palette.error.main
              : stroke
          }
          $grid_template_colums="44px 1fr 48px"
        >
          <StyledSvgVectorWrapper
            $width="44px"
            $height="44px"
            $show_border={true}
            $border_color={
              validation_error_list.some((error) => error.type == "password")
                ? theme.palette.error.main
                : stroke
            }
          >
            <LockIcon stroke={stroke} />
          </StyledSvgVectorWrapper>
          <StyledInput
            disabled={is_form_input_disabled}
            type={show_password ? "text" : "password"}
            placeholder="Password"
            name="password"
            onChange={(event) => {
              onChangeHandler(event);
              timeout_ref.current.password &&
                clearTimeout(timeout_ref.current.password);
              timeout_ref.current.password = setTimeout(async () => {
                confirmPasswordValidationHandler(event);
              }, 1000);
            }}
            value={form_data.password}
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
                <CloseEyeIcon color={stroke} size={24} />
              ) : (
                <EyeIcon color={stroke} size={24} />
              )}
            </StyledSvgVectorWrapper>
          </StyledCta>
        </StyledInputWrapper>
      </StyledWrapper>
      {tab_index == 0 && (
        <StyledWrapper className="field-wrapper">
          <StyledInputWrapper
            $border_color={
              validation_error_list.some(
                (error) => error.type == "confirm_password"
              )
                ? theme.palette.error.main
                : stroke
            }
            $grid_template_colums="44px 1fr"
          >
            <StyledSvgVectorWrapper
              $width="44px"
              $height="44px"
              $show_border={true}
              $border_color={
                validation_error_list.some(
                  (error) => error.type == "confirm_password"
                )
                  ? theme.palette.error.main
                  : stroke
              }
              onChange={(event) => {}}
            >
              <LockIcon stroke={stroke} />
            </StyledSvgVectorWrapper>
            <StyledInput
              disabled={is_form_input_disabled}
              type="password"
              placeholder="Confirm password"
              name="confirm_password"
              onChange={(event) => {
                onChangeHandler(event);
                timeout_ref.current.confirm_password &&
                  clearTimeout(timeout_ref.current.confirm_password);
                timeout_ref.current.confirm_password = setTimeout(async () => {
                  confirmPasswordValidationHandler(event);
                }, 1000);
              }}
              value={form_data.confirm_password}
            />
          </StyledInputWrapper>
        </StyledWrapper>
      )}

      <StyledSubmitCta
        $disabled_color={
          validation_error_list.some((error) => error.type == "auth_failed")
            ? "rgba(244, 44, 4,1)"
            : "rgb(214, 255, 183, 0.6)"
        }
        disabled={
          tab_index == 0
            ? !Object.values(form_data).every((val) => !!val) ||
              !!validation_error_list.length
            : !(form_data.username && form_data.password) ||
              !!validation_error_list.filter(
                (error) =>
                  error.type !== "confirm_password" && error.type !== "username"
              ).length
        }
        className="field-wrapper"
        type="submit"
      >
        Continue
      </StyledSubmitCta>
      {error && <StyledError>{error}</StyledError>}
      <StyledPara>
        {tab_index == 0 ? (
          <>
            Already Have an Account?{" "}
            <StyledCta
              onClick={() => {
                updateTabIndex(1);
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
                updateTabIndex(0);
                setFormData({
                  username: "",
                  password: "",
                  confirm_password: "",
                });
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
