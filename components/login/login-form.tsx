import { useState } from "react";
// types
import type { FC } from "react";

// styled components
import {
  StyledForm,
  StyledWrapper,
  StyledTabWrapper,
  StyledTab,
  StyledInput,
  StyledSubmitCta,
} from "@/styles/components/login/login-form.style";

const LoginForm: FC = () => {
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
        <StyledInput type="text" placeholder="Username" />
      </StyledWrapper>
      <StyledWrapper>
        <StyledInput type="password" placeholder="Password" />
      </StyledWrapper>
      <StyledSubmitCta>Continue</StyledSubmitCta>
    </StyledForm>
  );
};
export default LoginForm;
