// types
import type { FC } from "react";
import type { ITheme } from "@/theme/poker.theme";
import type { IUser } from "@/types/store/slice/login";

// styled components
import {
  StyledUserPointWrapper,
  StyledDollarIcon,
  StyledSpan,
  StyledDepositCta,
  StyledAddIcon,
} from "@/styles/components/poker/poker-header/poker-user-point.style";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { User } from "@/store/slice/login.slice";
import { mode } from "@/store/slice/common.slice";

const AddSvgIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-102 -1484)">
          <g transform="translate(100 1428)">
            <g transform="translate(0 54)">
              <path d="M0 0L24 0 24 24 0 24z"></path>
              <path
                fill={color}
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
const PokerUserPoint: FC = () => {
  const theme = useTheme() as ITheme;
  const user = useAppSelector(User) as IUser;
  const _mode = useAppSelector(mode);
  return (
    <StyledUserPointWrapper>
      <StyledDollarIcon
        src={"/chat/chat-header/chat-user-point/dollar.png"}
        alt="dollar-icon"
        width={20}
        height={20}
      />
      <StyledSpan $mode={_mode}>{user.earned_points?.toFixed(2)}</StyledSpan>
      <StyledDepositCta>
        <AddSvgIcon size={20} color={theme.palette.secondary.main} />
        Deposit
      </StyledDepositCta>
    </StyledUserPointWrapper>
  );
};
export default PokerUserPoint;
