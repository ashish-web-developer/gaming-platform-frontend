import styled from "styled-components";

const StyledEmojiContainer = styled.div`
  position: absolute;
  bottom: 150px;
  right: 0px;
  z-index: 4;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    right: 50%;
    transform: translateX(50%);
    bottom: 160px;
  }
`;

const StyledEmojiWrapper = styled.div`
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 10px;
`;

export { StyledEmojiContainer, StyledEmojiWrapper };
