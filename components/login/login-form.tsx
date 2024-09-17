import { useState, forwardRef, useRef, useEffect } from "react";
// types
import type { ForwardRefRenderFunction, ChangeEvent } from "react";
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

const LoginForm: ForwardRefRenderFunction<
  HTMLButtonElement,
  {
    file_state: IFileState;
    updateActiveField: (
      field: "username" | "password" | "confirm_password" | null
    ) => void;
    updateProfile: () => void;
  }
> = ({ file_state, updateActiveField, updateProfile }, ref) => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as ITheme;
  const gsap_context_ref = useRef<gsap.Context>();
  const validation_error_list = useAppSelector(validationErrorList);
  const [tab_index, set_tab_index] = useState<0 | 1>(0); // 0 => Signup, 1 => SignIn
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
  useEffect(() => {
    gsap_context_ref.current = gsap.context((self) => {
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
    }, form_container_ref);
    return () => {
      gsap_context_ref.current?.revert();
    };
  }, []);
  return (
    <StyledForm
      onFocus={(event) => {
        dispatch(updateIsTyping(true));
        updateActiveField(
          event.target.name as "username" | "password" | "confirm_password"
        );
      }}
      onBlur={() => {
        updateActiveField(null);
      }}
      ref={form_container_ref}
      onSubmit={async (event) => {
        event.preventDefault();
        if (tab_index == 0) {
          await dispatch(
            registerUserApi({
              username: form_data.username,
              password: form_data.password,
            })
          );
          updateProfile();
        } else {
          dispatch(
            loginUserApi({
              email: null,
              username: form_data.username,
              password: form_data.password,
            })
          );
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
        disabled={
          tab_index == 0
            ? !Object.values(form_data).every((val) => !!val) ||
              !!validation_error_list.length
            : !(form_data.username && form_data.password) ||
              !!validation_error_list.filter(
                (error) => error.type !== "confirm_password"
              ).length
        }
        className="field-wrapper"
        type="submit"
      >
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
