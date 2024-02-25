// types
import type { FC } from "react";
import { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import {
  StyledPlayerSearchWrapper,
  StyledHeader,
  StyledProfileListWrapper,
  StyledProfileWrapper,
  StyledProfileImageWrapper,
  StyledProfileImage,
  StyledProfileDetailsWrapper,
  StyledName,
  StyledUserName,
} from "@/styles/components/common/create-group/player-search.style";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import { fetched_user_result } from "@/store/slice/chat.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const UserProfile: FC<{ user: IUsersWithConversation }> = ({ user }) => {
  const avatar_url = useAvatarUrl(user);
  return (
    <StyledProfileWrapper>
      <StyledProfileImageWrapper>
        <StyledProfileImage
          sizes="(max-width: 1400px) 5vw"
          fill={true}
          alt="user-avatar"
          src={avatar_url}
        />
      </StyledProfileImageWrapper>
      <StyledProfileDetailsWrapper>
        <StyledName>{user.name}</StyledName>
        <StyledUserName>@{user.username}</StyledUserName>
      </StyledProfileDetailsWrapper>
    </StyledProfileWrapper>
  );
};

const PlayerSearch: FC = () => {
  const _fetched_user_result = useAppSelector(fetched_user_result);
  const _user = useAppSelector(user);
  return (
    <StyledPlayerSearchWrapper>
      <StyledHeader>Players</StyledHeader>
      <StyledProfileListWrapper>
        {_fetched_user_result.map((user) => {
          return <UserProfile user={user} />;
        })}
      </StyledProfileListWrapper>
    </StyledPlayerSearchWrapper>
  );
};

export default PlayerSearch;
