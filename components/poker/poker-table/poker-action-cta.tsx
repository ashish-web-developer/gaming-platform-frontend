import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { useContext, useState } from "react";
// types
import type { FC } from "react";
import type {
  IPokerPlayer,
  IActionType,
} from "@/types/store/slice/poker/poker";

// styled components
import {
  StyledActionCtaWrapper,
  StyledActionCta,
  StyledActionCtaIcons,
} from "@/styles/components/poker/poker-table/poker-action-cta.style";

// local components
const PokerSlider = dynamic(
  () => import("@/components/poker/poker-slider/poker-slider"),
  {
    ssr: false,
  }
);

const PokerTimer = dynamic(
  () => import("@/components/poker/poker-timer/poker-timer"),
  {
    ssr: false,
  }
);

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  minAmountToBeBetted,
  triggerActionApi,
} from "@/store/slice/poker/poker.slice";

// context
import { MediaContext } from "context";

const PokerActionCta: FC<{
  auth_player: IPokerPlayer;
}> = ({ auth_player }) => {
  const dispatch = useAppDispatch();
  const {
    current: { clock_ticking_sound },
  } = useContext(MediaContext);
  const min_amount_to_be_betted = useAppSelector(minAmountToBeBetted) as number;
  const { current_betted_amount = 0 } = auth_player;
  const [show_poker_slider, setShowPokerSlider] = useState(false);
  const [is_disabled, setIsDisabled] = useState(false);

  const action_type =
    (current_betted_amount as number) < min_amount_to_be_betted
      ? "call"
      : "check";

  function handleActionEvent({
    action_type,
    current_betted_amount,
  }: {
    action_type: IActionType;
    current_betted_amount: number | null;
  }) {
    setIsDisabled(true);
    dispatch(
      triggerActionApi({
        action_type,
        current_betted_amount,
      })
    );
    if (clock_ticking_sound) {
      clock_ticking_sound.pause();
      clock_ticking_sound.currentTime = 0;
    }
  }
  if (show_poker_slider) {
    return (
      <>
        {!is_disabled &&
          createPortal(
            <PokerTimer
              initial_count={30}
              add_ticker_animation={true}
              handleOnFinish={() => {
                handleActionEvent({
                  action_type: "fold",
                  current_betted_amount: null,
                });
              }}
            />,
            document.getElementById("poker-timer-container") as Element
          )}
        {createPortal(
          <PokerSlider
            auth_player={auth_player}
            updateDisabled={(val) => {
              setIsDisabled(val);
            }}
            updateShowPokerSlider={(val) => setShowPokerSlider(val)}
          />,
          document.getElementById("poker-slider-container") as Element
        )}
      </>
    );
  }

  return (
    <>
      {!is_disabled &&
        createPortal(
          <PokerTimer
            initial_count={30}
            add_ticker_animation={true}
            handleOnFinish={() => {
              handleActionEvent({
                action_type: "fold",
                current_betted_amount: null,
              });
            }}
          />,
          document.getElementById("poker-timer-container") as Element
        )}
      <StyledActionCtaWrapper>
        <StyledActionCta
          disabled={is_disabled}
          onClick={() => {
            handleActionEvent({
              action_type: "fold",
              current_betted_amount: null,
            });
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
          disabled={is_disabled}
          onClick={() => {
            handleActionEvent({
              action_type,
              current_betted_amount:
                action_type == "call" ? min_amount_to_be_betted : null,
            });
          }}
        >
          <StyledActionCtaIcons
            src="/poker/poker-table/action-cta-icons/check.png"
            alt="check-icon"
            width={20}
            height={20}
          />
          {action_type == "call"
            ? `Call ${
                min_amount_to_be_betted - (current_betted_amount as number)
              }K`
            : "Check"}
        </StyledActionCta>
        <StyledActionCta
          disabled={is_disabled}
          id="poker-raise-cta"
          onClick={() => {
            setShowPokerSlider(true);

            /**
             * because of poker slider transparency  player betted amount on the
             * left and right of bettor is visible and causing some style related
             * issue, therefore we are hiding and showing those amount
             */
            ["player-seat-3", "player-seat-4", "player-seat-5"].forEach(
              (element_id) => {
                let element = document.getElementById(element_id);
                if (element) {
                  element.style.visibility = "hidden";
                }
              }
            );
          }}
        >
          <StyledActionCtaIcons
            src="/poker/poker-table/action-cta-icons/raise.png"
            alt="raise-icon"
            width={20}
            height={20}
          />
          Raise
        </StyledActionCta>
      </StyledActionCtaWrapper>
    </>
  );
};

export default PokerActionCta;
