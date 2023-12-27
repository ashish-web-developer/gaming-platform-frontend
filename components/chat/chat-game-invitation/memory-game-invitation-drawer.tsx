import { useEffect, useState } from "react";
// types
import type { FC } from "react";

// styled components
import {
  StyledBackground,
  StyledContainer,
  StyledHeaderContainer,
  StyledLogoContainer,
  StyledSpan,
  StyledCloseCta,
  StyledMessageContainer,
  StyledTopMessage,
  StyledBottomMessage,
  StyledUserName,
  StyledDrawerImageContainer,
  StyledDrawerMainImage,
  StyledPlayCta,
  StyledVsContainer,
  StyledUserAvatar,
} from "@/styles/components/chat/chat-game-invitation/memory-game-invitation-drawer.style";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import { gaming_user } from "@/store/slice/game.slice";
import { updateShowMemoryGameSnackbar } from "@/store/slice/chat.slice";

// hooks
import useAvatar from "@/hooks/profile";

const CloseIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        d="M1.624 0L0 1.624 8.376 10 0 18.376 1.624 20 10 11.624 18.376 20 20 18.376 11.624 10 20 1.624 18.376 0 10 8.376 1.624 0z"
      ></path>
    </svg>
  );
};

const MemoryGameInvitationDrawer: FC = () => {
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const _gaming_user = useAppSelector(gaming_user);
  const user_avatar = useAvatar(_user?.username ?? "");
  const gaming_user_avatar = useAvatar(_gaming_user?.username ?? "");
  const [close_icon_size, setCloseIconSize] = useState(20);
  const [avatar_styles, setAvatarStyles] = useState<{
    avatar_1: {
      $width: string;
      $height: string;
    };
    avatar_2: {
      $width: string;
      $height: string;
    };
  }>({
    avatar_1: {
      $width: "100px",
      $height: "100px",
    },
    avatar_2: {
      $width: "60px",
      $height: "60px",
    },
  });

  useEffect(() => {
    if (window.innerWidth <= 375) {
      setAvatarStyles({
        avatar_1: {
          $width: "80px",
          $height: "80px",
        },
        avatar_2: {
          $width: "60px",
          $height: "60px",
        },
      });
    }
    const resizeHandler = () => {
      if (window.innerWidth <= 375) {
        setCloseIconSize(16);
        setAvatarStyles({
          avatar_1: {
            $width: "80px",
            $height: "80px",
          },
          avatar_2: {
            $width: "60px",
            $height: "60px",
          },
        });
      } else {
        setAvatarStyles({
          avatar_1: {
            $width: "100px",
            $height: "100px",
          },
          avatar_2: {
            $width: "60px",
            $height: "60px",
          },
        });
        setCloseIconSize(20);
      }
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  return (
    <StyledBackground>
      <StyledContainer>
        <StyledUserAvatar
          {...avatar_styles.avatar_1}
          $left={"40px"}
          $top={"290px"}
          $border={"3px solid #F5E960"}
          dangerouslySetInnerHTML={{
            __html: user_avatar,
          }}
        ></StyledUserAvatar>
        <StyledUserAvatar
          {...avatar_styles.avatar_2}
          $right={"20px"}
          $top={"230px"}
          $border={"3px solid #F42C04"}
          dangerouslySetInnerHTML={{
            __html: gaming_user_avatar,
          }}
        ></StyledUserAvatar>
        <StyledPlayCta>Play Now</StyledPlayCta>
        <StyledDrawerImageContainer>
          <StyledDrawerMainImage
            alt="girl"
            fill={true}
            src="/chat/chat-game-invitation/girl-image.png"
          />
        </StyledDrawerImageContainer>
        <StyledHeaderContainer>
          <StyledLogoContainer>
            Cogni<StyledSpan $color="#F42C04">Match</StyledSpan>
          </StyledLogoContainer>
          <StyledCloseCta
            onClick={() => {
              dispatch(updateShowMemoryGameSnackbar(false));
            }}
          >
            <CloseIcon size={close_icon_size} color="#E7E08B" />
          </StyledCloseCta>
        </StyledHeaderContainer>
        <StyledMessageContainer>
          <StyledTopMessage>
            Hi there, <StyledUserName>Ashish</StyledUserName>
          </StyledTopMessage>
          <StyledBottomMessage>
            Ready For Memory <br />
            ShowDown?
          </StyledBottomMessage>
          <StyledVsContainer>
            Ashish <StyledSpan $color="#F42C04">V</StyledSpan>\
            <StyledSpan $color="#F42C04">S</StyledSpan> Angelina
          </StyledVsContainer>
        </StyledMessageContainer>
      </StyledContainer>
    </StyledBackground>
  );
};

export default MemoryGameInvitationDrawer;
