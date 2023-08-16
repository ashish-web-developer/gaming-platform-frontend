// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";
import type { User } from "@/types/user";
// local components
import Profile from "@/components/chat/profile";

// styled components
import { StyledUsersContainer } from "@/styles/components/chat/mobile/mobile-users-container.style";
// styled
import { useTheme } from "styled-components";

// helpers package
import { v4 as uuidv4 } from "uuid";
// redux
import { useAppSelector } from "@/hooks/redux";
import { users as default_users } from "@/store/slice/chat.slice";

interface Props {
  colors: Colors;
  users: User[];
}

const MobileUsersContainer: FC<Props> = ({ colors, users }) => {
  const _default_users = useAppSelector(default_users);
  const theme = useTheme();
  return (
    <StyledUsersContainer>
      {(users.length < _default_users.length ? _default_users : users).map(
        (user) => {
          return (
            <Profile
              key={uuidv4()}
              user={user}
              width={60}
              height={60}
              colors={colors}
              backgroundColor={theme.palette.primary.main}
              disableElevation={true}
            />
          );
        }
      )}
    </StyledUsersContainer>
  );
};

export default MobileUsersContainer;
