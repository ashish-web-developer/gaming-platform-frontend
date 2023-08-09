import styled from "styled-components";

const StyledChatWrapper = styled.div`
  padding: 30px;
  height: 90%;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

export { StyledChatWrapper };
