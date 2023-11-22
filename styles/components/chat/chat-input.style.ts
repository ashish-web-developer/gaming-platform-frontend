import styled from "styled-components";

const StyledChatInput = styled.input`
  width: 400px;
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.main};
  border: 3px solid ${({ theme }) => theme.palette.primary.green};
  border-radius: 16px;
`;

export { StyledChatInput };
