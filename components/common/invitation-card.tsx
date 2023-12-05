import Image from "next/image";
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
import { useAppDispatch } from "@/hooks/redux";
import { acceptInvitation } from "@/store/slice/game.slice";

const InvitationCard: FC = () => {
  const dispatch = useAppDispatch();
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
          <StyledUserName>@ashish_classic</StyledUserName>
          <StyledCardHeading>Ready for a memory showdown?</StyledCardHeading>
          <StyledPlayButton
            onClick={() => {
              dispatch(acceptInvitation({ is_accepted: true }));
              console.log("redirect");
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
