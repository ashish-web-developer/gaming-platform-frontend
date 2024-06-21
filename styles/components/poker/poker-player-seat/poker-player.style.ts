import styled from "styled-components";
import Image from "next/image";

const StyledPokerPlayerWrapper = styled.div<{
  $is_bettor: boolean;
  $is_active: boolean;
}>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: ${(props) =>
    props.$is_bettor ? "linear-gradient(#FFED65 25%, #59FFA0 100%)" : "#fff"};
  &::after {
    content: "";
    position: absolute;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${(props) =>
      props.$is_active
        ? props.theme.palette.success.main
        : props.theme.palette.warning.main};
    border: 2px solid #000;
    right: 6px;
    top: 6px;
  }
`;
const StyledPokerPlayer = styled.div<{
  $is_bettor: boolean;
}>`
  position: relative;
  width: ${(props) => (props.$is_bettor ? "85px" : "90px")};
  height: ${(props) => (props.$is_bettor ? "85px" : "90px")};
  height: 90px;
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 50%;
`;

const StyledUserProfileImage = styled(Image)`
  object-fit: cover;
`;

export { StyledPokerPlayerWrapper, StyledPokerPlayer, StyledUserProfileImage };
