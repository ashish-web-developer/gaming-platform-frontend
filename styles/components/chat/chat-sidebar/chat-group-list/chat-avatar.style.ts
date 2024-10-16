import styled from "styled-components";
import Image from "next/image";

const StyledAvatarWrapper = styled.span<{
  $show_left_count: boolean;
  $status?: boolean;
  $border_color: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  position: relative;
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
    border-radius:50%;
    border:2px solid ${props.$border_color};
    & > img{
      display:none;
      & + span{
        display:inline;
      }
    }
  }
  `}
`;

const StyledAvatarImage = styled(Image)<{
  $border_color: string;
  $image_background_color: string;
}>`
  object-fit: cover;
  object-position: top;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid ${(props) => props.$border_color};
  background-color: ${(props) => props.$image_background_color};
`;

const StyledLeftCount = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.75rem;
  color: #000;
  display: none;
`;

export { StyledAvatarWrapper, StyledAvatarImage, StyledLeftCount };
