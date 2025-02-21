// types
import type { FC } from "react";

// styled components
import {
  StyledActionCtaWrapper,
  StyledActionCta,
  StyledActionCtaIcons,
} from "@/styles/components/poker/poker-table/poker-action-cta.style";

// redux
import { useAppDispatch } from "@/hooks/redux.hook";
import { triggerActionApi } from "@/store/slice/poker/poker.slice";

const PokerActionCta: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <StyledActionCtaWrapper>
      <StyledActionCta
        onClick={() => {
          dispatch(
            triggerActionApi({
              action_type: "fold",
              current_betted_amount: null,
            })
          );
        }}
      >
        <StyledActionCtaIcons
          src="/poker/poker-table/action-cta-icons/fold.png"
          alt="fold-icon"
          width={20}
          height={20}
        />
        Fold
      </StyledActionCta>
      <StyledActionCta
        onClick={() => {
          dispatch(
            triggerActionApi({
              action_type: "check",
              current_betted_amount: null,
            })
          );
        }}
      >
        <StyledActionCtaIcons
          src="/poker/poker-table/action-cta-icons/check.png"
          alt="check-icon"
          width={20}
          height={20}
        />
        Check
      </StyledActionCta>
      <StyledActionCta>
        <StyledActionCtaIcons
          src="/poker/poker-table/action-cta-icons/raise.png"
          alt="raise-icon"
          width={20}
          height={20}
        />
        Raise
      </StyledActionCta>
    </StyledActionCtaWrapper>
  );
};

export default PokerActionCta;
