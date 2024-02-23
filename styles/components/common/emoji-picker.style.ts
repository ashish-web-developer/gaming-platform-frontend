import styled from "styled-components";

const StyledEmojiContainer = styled.div`
  position: absolute;
  bottom: 150px;
  right: 0px;
  z-index: 2;
`;

const StyledEmojiWrapper = styled.div`
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 10px;
`;

export { StyledEmojiContainer, StyledEmojiWrapper };
