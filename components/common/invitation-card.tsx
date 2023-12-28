import Image from "next/image";
import { useRouter } from "next/router";
// types
import type { FC } from "react";
// styled components
import {
  StyledInvitationCard,
  StyledCardContent,
  StyledGirlImageContainer,
  StyledLogo,
  StyledLogoSpan,
  StyledLeftContent,
  StyledUserName,
  StyledCardHeading,
  StyledPlayButton,
} from "@/styles/components/common/invitation-card.style";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { gaming_user } from "@/store/slice/game.slice";
import {
  updateShowMemoryGameSnackbar,
  acceptInvitationApi,
} from "@/store/slice/chat.slice";

const InvitationCard: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const _gaming_user = useAppSelector(gaming_user);
  return (
    <StyledInvitationCard>
      <StyledCardContent>
        <StyledLogo>
          Cogni<StyledLogoSpan color="#F42C04">Match</StyledLogoSpan>
        </StyledLogo>
        <StyledGirlImageContainer>
          <Image
            alt="girl"
            fill={true}
            src="/common/invitation-card/girl.png"
          />
        </StyledGirlImageContainer>
        <StyledLeftContent>
          <StyledUserName>@{_gaming_user?.username}</StyledUserName>
          <StyledCardHeading>Ready for a memory showdown?</StyledCardHeading>
          <StyledPlayButton
            onClick={() => {
              dispatch(acceptInvitationApi({ is_accepted: true }));
              dispatch(updateShowMemoryGameSnackbar(false));
              router.push("/memory-game");
            }}
          >
            Play Now
          </StyledPlayButton>
        </StyledLeftContent>
      </StyledCardContent>
    </StyledInvitationCard>
  );
};
export default InvitationCard;
