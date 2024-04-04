// types
import { FC } from "react";

// styled components
import {
  StyledUserPointWrapper,
  StyledDollarIcon,
  StyledSpan,
  StyledDepositCta,
  StyledAddIcon,
} from "@/styles/components/chat/chat-header/chat-user-point.style";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import { mode } from "@/store/slice/common.slice";

const ChatUserPoint: FC = () => {
  const _user = useAppSelector(user);
  const _mode = useAppSelector(mode);
  return (
    <StyledUserPointWrapper>
      <StyledDollarIcon
        src={"/chat/chat-header/chat-user-point/dollar.png"}
        alt="dollar-icon"
        width={20}
        height={20}
      />
      <StyledSpan $mode={_mode}>{_user.earned_points?.toFixed(2)}</StyledSpan>
      <StyledDepositCta>
        <StyledAddIcon
          src="/chat/chat-header/chat-user-point/add.png"
          width={20}
          height={20}
          alt="plus-icon"
        />
        Deposit
      </StyledDepositCta>
    </StyledUserPointWrapper>
  );
};
export default ChatUserPoint;