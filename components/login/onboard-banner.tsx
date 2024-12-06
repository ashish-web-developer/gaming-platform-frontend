import { useRouter } from "next/router";
import { useState, useRef } from "react";
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

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const OnboardBanner: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const wrapper_ref = useRef<HTMLDivElement>(null);
  const [name, setName] = useState<string | null>(null);
  useGSAP(
    () => {
      gsap
        .timeline()
        .fromTo(
          "#styled-container",
          {
            y: -400,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: "bounce.out",
          }
        )
        .fromTo(
          "#witch-image",
          {
            y: 200,
            opacity: 0,
          },
          {
            opacity: 1,
            y: 0,
          }
        )
        .fromTo(
          "#name-form",
          {
            opacity: 0,
            scale: 2,
          },
          {
            opacity: 1,
            duration: 1,
            scale: 1,
            ease: "expo",
          }
        );
    },
    { scope: wrapper_ref }
  );
  return (
    <div ref={wrapper_ref}>
      <StyledContainer id="styled-container">
        <StyledMainImageContainer id="witch-image">
          <StyledImage
            src="/login/onboard-girl.png"
            fill={true}
            alt="witch"
            sizes="(max-width: 1400px) 10vw"
          />
        </StyledMainImageContainer>
        <StyledMainText>
          Your Adventure to
          <br /> Fortune Realm
          <br /> Begins Now
        </StyledMainText>
        <StyledNameForm
          id="name-form"
          onSubmit={() => {
            dispatch(updateNameApi({ name: name as string }));
            router.push("/chat");
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
    </div>
  );
};

export default OnboardBanner;
