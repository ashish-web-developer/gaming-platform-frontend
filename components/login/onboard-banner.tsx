import { useState } from "react";
// types
import type { FC, ChangeEvent } from "react";

// styled components
import {
  StyledContainer,
  StyledMainImageContainer,
  StyledImage,
  StyledMainText,
  StyledNameForm,
  StyledNameInput,
  StyledSubmitCta,
} from "@/styles/components/login/onboard-banner.style";

// redux
import { useAppDispatch } from "@/hooks/redux.hook";
import { updateNameApi } from "@/store/slice/login.slice";

const OnboardBanner: FC = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string | null>(null);
  return (
    <StyledContainer>
      <StyledMainImageContainer>
        <StyledImage src="/login/onboard-girl.png" fill={true} alt="witch" />
      </StyledMainImageContainer>
      <StyledMainText>
        Your Adventure to
        <br /> Fortune Realm
        <br /> Begins Now
      </StyledMainText>
      <StyledNameForm
        onSubmit={() => {
          dispatch(updateNameApi({ name: name as string }));
        }}
      >
        <StyledNameInput
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value || null);
          }}
          type="text"
          name="name"
          placeholder="Name"
        />
        <StyledSubmitCta
          $disabled_color="rgb(214, 255, 183, 0.6)"
          disabled={!name}
          type="submit"
        >
          Start Your Journey
        </StyledSubmitCta>
      </StyledNameForm>
    </StyledContainer>
  );
};

export default OnboardBanner;
