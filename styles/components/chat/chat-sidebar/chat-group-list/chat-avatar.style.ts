import styled from "styled-components";
import Image from "next/image";

const StyledAvatarWrapper = styled.span<{
  $show_left_count: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  border: 2px solid #000;
  overflow: hidden;
  background: #fff;
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
`;

const StyledLeftCount = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.75rem;
  color: #000;
  display: none;
`;

export { StyledAvatarWrapper, StyledAvatarImage, StyledLeftCount };
