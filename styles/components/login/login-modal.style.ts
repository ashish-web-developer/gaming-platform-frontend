import styled from "styled-components";
// Mui
import { Box, Button, Input, IconButton } from "@mui/material";

const color = {
  primary: "rgb(3 13 9)",
  secondary: "rgb(16 9 22)",
  text: "#fffdff",
  button: "#8102f7",
  errors: "#d11534",
};

const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: ${color.secondary};
  border: 3px solid rgb(31 26 37);
  padding: 20px 0px 30px 0px;
  &:focus-visible {
    outline: none;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`;

const ModalTitle = styled.h1`
  color: ${color.text};
  font-family: "Poppins", sans-serif;
  text-align: center;
`;

const LoginInputContainer = styled.div`
  width: 90%;
  margin-top: 16px;
`;

const LoginInputField = styled(Input)`
  background-color: ${color.primary};
  color: ${color.text} !important;
  padding: 8px 16px;
  border: 2px solid rgb(31 26 37);
  border-radius: 10px;
`;

const LoginCta = styled(Button)`
  margin-top: 20px;
  &.MuiButton-root {
    background-color: ${color.button};
    color: ${color.text};
    padding: 12px 16px;
    font-family: "Poppins", sans-serif;
    margin-top: 20px;
    &:hover {
      background-color: ${color.button};
    }
  }
`;

const SwitchModal = styled.p`
  color: ${color.text};
  font-family: "Poppins", sans-serif;
  margin-top: 10px;
  font-size: 14px;
`;

const SwitchModalSpan = styled(Button)`
  &.MuiButton-root {
    color: ${color.button};
    text-transform: capitalize;
    text-decoration: underline;
  }
`;

const PasswordEndAdorment = styled(IconButton)`
  &.MuiIconButton-root {
    color: #fff !important;
  }
`;

const Validation = styled.p`
  color: ${color.errors};
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  margin: 8px 8px 0px 0px;
`;

export {
  ModalContainer,
  ModalTitle,
  LoginInputContainer,
  LoginInputField,
  LoginCta,
  SwitchModal,
  SwitchModalSpan,
  PasswordEndAdorment,
  Validation,
};
