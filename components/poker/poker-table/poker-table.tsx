// types
import { type FC } from "react";
// styled components
import {
  StyledPokerTableWrapper,
  StyledPokerVectorWrapper,
  StyledTableDealerProfile,
  StyledTableDealerProfileImage,
  StyledTableCardWrapper,
} from "@/styles/components/poker/poker-table/poker-table.style";

// local components
import PokerTableVector from "@/components/poker/poker-table/poker-table-vector";
import PokerPlayer from "@/components/poker/poker-player/poker-player";
import PokerCard from "@/components/poker/poker-card/poker-card";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import {
  active_gaming_user,
  poker_buy_in_amount,
} from "@/store/slice/poker/poker.slice";
import { user } from "@/store/slice/user.slice";
// hooks
import { usePokerTableHeight } from "@/hooks/poker/poker.hook";

const PokerTable: FC = () => {
  const _poker_buy_in_amount = useAppSelector(poker_buy_in_amount);
  const { id: _user_id } = useAppSelector(user);
  const [_active_user_1, _active_user_2] = useAppSelector(
    active_gaming_user
  ).filter((user) => {
    return user.id !== _user_id;
  });
  const [_user] = useAppSelector(active_gaming_user).filter((user) => {
    return user.id == _user_id;
  });
  const height = usePokerTableHeight();

  return (
    <StyledPokerTableWrapper>
      <StyledTableDealerProfile>
        <StyledTableDealerProfileImage
          alt="dealer"
          src={"/poker/poker-table/dealer.png"}
          fill={true}
        />
      </StyledTableDealerProfile>
      <StyledPokerVectorWrapper>
        <PokerPlayer
          buy_in_amount={_active_user_2?.buy_in_amount ?? 0}
          user={_active_user_2}
          align="left"
          is_dealer={true}
        />
        <PokerPlayer
          buy_in_amount={_active_user_1?.buy_in_amount ?? 0}
          user={_active_user_1}
          align="right"
        />
        <PokerPlayer
          buy_in_amount={_user?.buy_in_amount ?? 0}
          user={_user}
          align="down"
          show_action_cta={true}
        />
        <PokerTableVector width={900} height={height} />
      </StyledPokerVectorWrapper>
      <StyledTableCardWrapper>
        {new Array(5).fill(0).map((el, index) => {
          return (
            <PokerCard key={`card-${index}`} suit={"diamond"} rank={"J"} />
          );
        })}
      </StyledTableCardWrapper>
    </StyledPokerTableWrapper>
  );
};

export default PokerTable;
