import { useEffect, type FC } from "react";
import Image from "next/image";

// Mui Components
import { Modal, Grid } from "@mui/material";

// Icons
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import {
  showModal,
  toggleModal,
  updateShowLogin,
  updateShowPassword,
  signUpHandler,
  loginHandler,
  showLogin,
  showPassword,
} from "@/store/slice/login.slice";

// Formik

import { Formik } from "formik";

// Styles
import {
  ModalContainer,
  ModalTitle,
  LoginInputContainer,
  LoginInputField,
  LoginCta,
  SwitchModal,
  SwitchModalSpan,
  PasswordEndAdorment,
  Validation,
} from "@/styles/components/login/login-modal.style";

// helpers
import { Axios } from "@/helpers/axios";

// Helpers Package
import * as Yup from "yup";

const UsernameValidator = async (username: string): Promise<boolean> => {
  try {
    const { data } = await Axios.post("/verify-username", {
      username,
    });
    if (data.success) {
      return true;
    } else {
      false;
    }
  } catch ($error) {
    return false;
  }
  return false;
};

// Schemas
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter the email!"),
  password: Yup.string()
    .required("Please enter the password!")
    .min(8, "Minimum 8 characters required!"),
  username: Yup.string()
    .required("Please enter the username")
    .min(3, "Minimum characters required!")
    .max(50, "Maximum 50 characters required!")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain alphanumeric characters along with underscores!"
    )
    .test(
      "username-verification",
      "Username already been taken",
      async function (value) {
        const isValid = await UsernameValidator(value);
        return isValid;
      }
    ),
});

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please Enter Username or Email")
    .matches(
      /^[a-zA-Z0-9_@.]+$/,
      "Username or Email can contain alphanumeric characters along with underscores,dot, @"
    ),
  password: Yup.string().min(8, "Minimum 8 characters required!"),
});

// types

type Errors = {
  name?: string | null;
  username: string | null;
  email?: string | null;
  password: string | null;
};

interface Props {
  keepShowingModal: boolean;
}
const LoginModal: FC<Props> = ({ keepShowingModal }) => {
  const dispatch = useAppDispatch();
  const _showModal = useAppSelector(showModal);
  const _showLogin = useAppSelector(showLogin);
  const _showPassword = useAppSelector(showPassword);

  return (
    <Modal
      open={_showModal}
      onClose={() => {
        if (keepShowingModal) return;
        dispatch(toggleModal(false));
      }}
    >
      <ModalContainer>
        <ModalTitle>Playground</ModalTitle>
        <Image alt="logo" width="200" height="200" src="/logo_1.png" />
        <Formik
          initialValues={{
            name: "",
            email: "",
            username: "",
            password: "",
          }}
          validationSchema={_showLogin ? LoginSchema : SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("inside handler");
            if (_showLogin) {
              const emailPattern =
                /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
              if (emailPattern.test(values.username)) {
                dispatch(
                  loginHandler({
                    email: values.username,
                    password: values.password,
                  })
                );
                return;
              }
              dispatch(
                loginHandler({
                  username: values.username,
                  password: values.password,
                })
              );
            } else {
              dispatch(signUpHandler(values));
            }
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
          }) => (
            <LoginInputContainer>
              <Grid direction="column" spacing={2} container>
                {!_showLogin && (
                  <Grid item>
                    <LoginInputField
                      value={values.name}
                      fullWidth
                      disableUnderline
                      name="name"
                      placeholder="Name"
                      type="text"
                      onChange={handleChange}
                    />
                    {touched.name && errors.name && (
                      <Validation>{errors.name}</Validation>
                    )}
                  </Grid>
                )}
                <Grid item>
                  <LoginInputField
                    value={values.username}
                    fullWidth
                    disableUnderline
                    name="username"
                    placeholder={
                      _showLogin
                        ? "Email Or Gamer Tag (Username)"
                        : "Gamer Tag (Username)"
                    }
                    type="text"
                    onChange={handleChange}
                  />
                  {touched.username && errors.username && (
                    <Validation>{errors.username}</Validation>
                  )}
                </Grid>
                {!_showLogin && (
                  <Grid item>
                    <LoginInputField
                      value={values.email}
                      fullWidth
                      disableUnderline
                      name="email"
                      placeholder="Email"
                      type="email"
                      onChange={handleChange}
                    />
                    {touched.email && errors.email && (
                      <Validation>{errors.email}</Validation>
                    )}
                  </Grid>
                )}
                <Grid item>
                  <LoginInputField
                    value={values.password}
                    fullWidth
                    disableUnderline
                    name="password"
                    placeholder="Password"
                    type={_showPassword ? "text" : "password"}
                    onChange={handleChange}
                    endAdornment={
                      <PasswordEndAdorment
                        onClick={() =>
                          dispatch(updateShowPassword(!_showPassword))
                        }
                      >
                        {_showPassword ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
                        )}
                      </PasswordEndAdorment>
                    }
                  />
                  {touched.password && errors.password && (
                    <Validation>{errors.password}</Validation>
                  )}
                </Grid>
              </Grid>
              <LoginCta
                onClick={() => handleSubmit()}
                variant="contained"
                fullWidth
              >
                Continue
              </LoginCta>
            </LoginInputContainer>
          )}
        </Formik>
        {!_showLogin && (
          <SwitchModal>
            Already a member?
            <SwitchModalSpan
              onClick={() => dispatch(updateShowLogin(true))}
              variant="text"
            >
              Login
            </SwitchModalSpan>
          </SwitchModal>
        )}
        {_showLogin && (
          <SwitchModal>
            Not a member?
            <SwitchModalSpan
              onClick={() => dispatch(updateShowLogin(false))}
              variant="text"
            >
              Sign Up
            </SwitchModalSpan>
          </SwitchModal>
        )}
      </ModalContainer>
    </Modal>
  );
};

export default LoginModal;
