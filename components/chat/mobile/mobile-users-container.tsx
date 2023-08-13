// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";
// local components
import Profile from "@/components/chat/profile";

// styled components
import { StyledUsersContainer } from "@/styles/components/chat/mobile/mobile-users-container.style";

// redux
import { useAppSelector } from "@/hooks/redux";
import { users } from "@/store/slice/chat.slice";

// helpers package
import { v4 as uuidv4 } from "uuid";

interface Props {
  colors: Colors;
}

const MobileUsersContainer: FC<Props> = ({ colors }) => {
  const _users = useAppSelector(users);
  return (
    <StyledUsersContainer>
      {_users.map((user) => {
        return (
          <Profile
            key={uuidv4()}
            user={user}
            width={60}
            height={60}
            colors={colors}
            backgroundColor="#212328"
            disableElevation={true}
          />
        );
      })}
    </StyledUsersContainer>
  );
};

export default MobileUsersContainer;
