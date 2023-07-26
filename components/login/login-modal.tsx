import type { FC } from "react";
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
} from "@/styles/components/login/login-modal.style";

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
          validate={(values) => {
            const errors: Errors = {
              name: null,
              username: null,
              email: null,
              password: null,
            };
            if (_showLogin) {
              if (!values.username) {
                errors.username = "Please enter Username or Email";
              }
              if (!values.password) {
                errors.password = "Please enter your Password";
              }
            } else {
              if (!values.name) {
                errors.name = "Please enter your Name";
              }
              if (!values.username) {
                errors.username = "Please enter your Username";
              }
              if (!values.email) {
                errors.email = "Please enter your Email";
              }
              if (!values.password) {
                errors.password = "Please enter your Password";
              }
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
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
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
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
