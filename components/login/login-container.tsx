import { useRef, useEffect, useState, useContext } from "react";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/login.theme";
import type { IFileState } from "@/components/common/user-profile/upload-profile-modal";

// styled components
import {
  StyledPage,
  StyledStripeVectorWrapper,
  StyledStripeText,
  StyledContentContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledLogoSpan,
  StyledSubTitle,
  StyledGamesBannerContainer,
  StyledGamesVectorWrapper,
  StyledGamesBannerContent,
  StyledPokerCardWrapper,
  StyledBannerGameLogo,
  StyledCta,
  StyledCtaTextWrapper,
  StyledGirlImageWrapper,
  StyledGirlImage,
  StyledBannerGirlImageWrapper,
  StyledBannerGirlImage,
  StyledInfoTooltip,
  StyledInfoTooltipText,
  StyledSpan,
  StyledUploadModalWrapper,
} from "@/styles/components/login/login-container.style";

// theme
import { ThemeProvider } from "styled-components";
import { Theme } from "@/theme/poker.theme";
import { useTheme } from "styled-components";

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";
import LoginForm from "@/components/login/login-form";
import UploadProfileModal from "@/components/common/user-profile/upload-profile-modal";

// vector
import PokerVector from "@/components/login/vector/poker-vector";
import CognimatchVector from "@/components/login/vector/cognimatch-vector";
import CtaVector from "@/components/login/vector/cta-vector";
import StripeVector from "@/components/login/vector/stripe-vector";
import InfoTooltipVector from "@/components/login/vector/info-tooltip-vector";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { show_profile_upload_modal } from "@/store/slice/common.slice";

// gsap
import gsap from "gsap";

// context
import { UttranceContext } from "context";

// helpers
import MutableSpeechUtterance from "@/helpers/mutable-speech-uttrance";

const tooltip_text_list = [
  "Hey there! Welcome to Fortune Realm!",
  "Step into the ultimate casino gaming experience where excitement knows no bounds.",
  "Your journey to fortune and fun starts right here, right now!",
];

const LoginContainer: FC = () => {
  const theme = useTheme() as ITheme;
  const uttrace_context = useContext(UttranceContext);
  const _show_profile_upload_modal = useAppSelector(show_profile_upload_modal);
  const camera_cta_ref = useRef<HTMLButtonElement>(null);
  const gsap_context_ref = useRef<gsap.Context>();
  const page_container_ref = useRef<HTMLDivElement>(null);
  const [show_login, set_show_login] = useState(false);
  const [file_state, set_file_state] = useState<IFileState>({
    state: 0, // 0 => empty; 1 => loading; 2 => done;
    file: "",
  });
  const synth_ref = useRef<SpeechSynthesis>();
  const [tooltip_text_index, set_tooltip_text_index] = useState<number>(0);

  /**
   * Handling animation here
   */
  useEffect(() => {
    gsap_context_ref.current = gsap.context((self) => {
      gsap.to(".logo-container", {
        rotate: -5,
        duration: 0.6,
        delay: show_login ? 1 : 1.5,
        ease: "bounce",
      });
      gsap.from(".logo-span", {
        scale: 1.3,
        duration: 1,
        opacity: 0,
        ease: "power2.inOut",
        stagger: 0,
      });
      gsap.to("button", {
        rotate: 0,
        duration: 1,
        ease: "bounce",
        delay: 1,
      });
      show_login &&
        gsap
          .timeline({
            onComplete: () => {
              if (uttrace_context.current) {
                uttrace_context.current.text =
                  tooltip_text_list[tooltip_text_index];
                synth_ref.current?.speak(uttrace_context.current?.uttrance);
              }
            },
          })
          .from(".wrapper", {
            scale: 1.2,
            opacity: 0,
            duration: 1,
            ease: "bounce",
            stagger: 0.1,
          })
          .from("#girl-image-wrapper", {
            display: "none",
            translateX: -250,
            duration: 1,
            ease: "expo",
          })
          .from("#info-tooltip", {
            display: "none",
            scale: 1.5,
            duration: 1,
            ease: "elastic.inOut",
          });
      self.add("tooltipAnimation", (index: number) => {
        gsap.from("#info-tooltip", {
          opacity: 0,
          duration: 0.6,
          ease: "power1.inOut",
          onComplete: () => {
            if (uttrace_context.current) {
              uttrace_context.current.text = tooltip_text_list[index];
              synth_ref.current?.speak(uttrace_context.current?.uttrance);
            }
          },
        });
      });
      self.add("closeTooltipAnimation", () => {
        gsap
          .timeline()
          .to("#info-tooltip", {
            display: "none",
            scale: 0,
            duration: 1,
            ease: "elastic.inOut",
          })
          .to("#girl-image-wrapper", {
            display: "none",
            translateX: -300,
            duration: 1,
            ease: "back",
          });
      });
    }, page_container_ref);
    return () => {
      gsap_context_ref.current?.revert();
      synth_ref.current?.cancel();
    };
  }, [show_login]);

  /**
   * Setting female voice of the uttrance object
   */
  useEffect(() => {
    uttrace_context.current = new MutableSpeechUtterance();
    synth_ref.current = window.speechSynthesis;
    const updateVoices = () => {
      if (uttrace_context.current) {
        uttrace_context.current.voice = window.speechSynthesis
          .getVoices()
          .filter((voice) => voice.voiceURI.includes("Female"))[0];
      }
    };
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
    };
  }, []);

  /**
   * Updating tooltip index on the end of the voice text
   */
  useEffect(() => {
    if (tooltip_text_index !== 0) {
      gsap_context_ref.current?.tooltipAnimation(tooltip_text_index);
    }
    const handleEnd = () => {
      if (tooltip_text_index < tooltip_text_list.length - 1) {
        set_tooltip_text_index((prev) => prev + 1);
        return;
      }
      gsap_context_ref.current?.closeTooltipAnimation();
    };
    uttrace_context.current?.uttrance.addEventListener("end", handleEnd);
    return () => {
      uttrace_context.current?.uttrance.removeEventListener("end", handleEnd);
    };
  }, [tooltip_text_index]);
  return (
    <StyledPage ref={page_container_ref}>
      {show_login ? (
        <>
          <StyledLogoContainer
            className="logo-container"
            $show_login={show_login}
          >
            <StyledLogo $fontSize="2rem">Fortune Realm</StyledLogo>
          </StyledLogoContainer>
          <StyledGirlImageWrapper
            id="girl-image-wrapper"
            $width="450px"
            $height="465px"
          >
            <StyledGirlImage
              fill={true}
              alt="girl-image"
              src="/login/login-girl.png"
              sizes="(max-width: 1400px) 25vw"
            />
          </StyledGirlImageWrapper>
          <StyledInfoTooltip id="info-tooltip">
            <InfoTooltipVector />
            <StyledInfoTooltipText
              $font_size={tooltip_text_index == 0 ? "1.2rem" : "1rem"}
            >
              {/* <StyledSpan $color={theme.palette.secondary.main}>
                Hey there!
              </StyledSpan>{" "}
              Welcome to Fortune Realm! */}
              {tooltip_text_list[tooltip_text_index]}
            </StyledInfoTooltipText>
          </StyledInfoTooltip>
        </>
      ) : (
        <>
          <StyledStripeVectorWrapper>
            <StripeVector />
            <StyledStripeText>Win big Prizes!</StyledStripeText>
          </StyledStripeVectorWrapper>
        </>
      )}
      <StyledContentContainer>
        {show_login ? (
          <>
            <LoginForm file_state={file_state} ref={camera_cta_ref} />
            <StyledUploadModalWrapper
              $is_modal_open={_show_profile_upload_modal}
            >
              <UploadProfileModal
                onClickHandler={(file_state) => {
                  set_file_state(file_state);
                }}
                ref={camera_cta_ref}
                secondary_color={theme.palette.info.main}
                font_family={theme.fontFamily.bangers}
                show_girl_image={true}
              />
            </StyledUploadModalWrapper>
          </>
        ) : (
          <>
            <StyledLogoContainer
              className="logo-container"
              $show_login={show_login}
            >
              <StyledLogo $fontSize="5rem">
                {"Fortune Realm".split("").map((val, index) => {
                  return (
                    <StyledLogoSpan
                      key={`logo-span-${index}`}
                      className="logo-span"
                    >
                      {val === " " ? "\u00A0" : val}
                    </StyledLogoSpan>
                  );
                })}
              </StyledLogo>
              <StyledSubTitle>
                Your Ultimate Destination for Thrilling Casino Games
              </StyledSubTitle>
            </StyledLogoContainer>
            <StyledGamesBannerContainer>
              <StyledGamesVectorWrapper $height="309px">
                <PokerVector />
                <StyledGamesBannerContent>
                  <ThemeProvider theme={Theme}>
                    <StyledPokerCardWrapper
                      $bottom="32px"
                      $left="100px"
                      $rotate="-10deg"
                    >
                      <PokerCard rank="K" suit="club" />
                    </StyledPokerCardWrapper>
                    <StyledPokerCardWrapper
                      $top="32px"
                      $right="50px"
                      $rotate="15deg"
                    >
                      <PokerCard rank="Q" suit="diamond" />
                    </StyledPokerCardWrapper>
                  </ThemeProvider>
                  <StyledBannerGirlImageWrapper>
                    <StyledBannerGirlImage
                      src="/chat/invite-dialog/poker-background.png"
                      fill={true}
                      alt="banner-image"
                      sizes="(max-width: 1400px) 20vw"
                    />
                  </StyledBannerGirlImageWrapper>
                  <StyledBannerGameLogo>
                    Texas Hold’em <br />
                    showdown
                  </StyledBannerGameLogo>
                </StyledGamesBannerContent>
              </StyledGamesVectorWrapper>
              <StyledGamesVectorWrapper
                $height="309px"
                $margin="60px 0px 0px -70px"
              >
                <CognimatchVector />
                <StyledGamesBannerContent></StyledGamesBannerContent>
              </StyledGamesVectorWrapper>
            </StyledGamesBannerContainer>
            <StyledCta
              onClick={() => {
                set_show_login(true);
              }}
            >
              <CtaVector />
              <StyledCtaTextWrapper>Unlock Fun</StyledCtaTextWrapper>
            </StyledCta>
          </>
        )}
      </StyledContentContainer>
    </StyledPage>
  );
};
export default LoginContainer;
