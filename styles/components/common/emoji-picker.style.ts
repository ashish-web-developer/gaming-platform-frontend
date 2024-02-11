import styled from "styled-components";

const StyledEmojiContainer = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 80px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 10px;
`;

export { StyledEmojiContainer };
