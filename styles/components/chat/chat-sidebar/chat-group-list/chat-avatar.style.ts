import styled from "styled-components";
import Image from "next/image";

type IStyledAvatarWrapper = {
  $show_left_count: boolean;
  $status?: boolean;
};

const StyledAvatarWrapper = styled.span<IStyledAvatarWrapper>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  border: 2px solid #000;
  background: #fff;
  overflow: hidden;
  ${(props) =>
    props.$status !== undefined &&
    `
      &::after {
        content: "";
        width: 8px;
        height: 8px;
        top:-2px;
        right:-2px;
        border:2px solid #000;
        border-radius:50%;
        background: ${
          props.$status
            ? props.theme.palette.info.main
            : props.theme.palette.warning.main
        };
        position: absolute;
      }
  `}
  &:not(:first-of-type) {
    margin-left: -18px;
  }
  ${(props) =>
    props.$show_left_count &&
    `
  &:last-of-type{
    background:#fff;
    & > img{
      display:none;
      & + span{
        display:inline;
      }
    }
  }
  `}
`;

const StyledAvatarImage = styled(Image)`
  object-fit: cover;
  overflow: hidden;
`;

const StyledLeftCount = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.75rem;
  color: #000;
  display: none;
`;

export { StyledAvatarWrapper, StyledAvatarImage, StyledLeftCount };
