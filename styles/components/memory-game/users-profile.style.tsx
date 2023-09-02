// types
import type Colors from "@/types/data/colors";
// styled
import styled from "styled-components";

type IStyledUsersProfileContainer = {
  $width: string;
  $height: string;
  $color: Colors[number];
};

type IStyledUser = {
  $width: string;
  $height: string;
};

const StyledUserProfileBorder = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding:5px;
  border-radius: 50%;
`;

const StyledUsersProfileContainer = styled.div<IStyledUsersProfileContainer>`
  background-color: ${(props) => props.$color["background-color"]};
  background-image: ${(props) => props.$color["background-image"]};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledUser = styled.div<IStyledUser>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
`;

export { StyledUserProfileBorder, StyledUsersProfileContainer, StyledUser };
