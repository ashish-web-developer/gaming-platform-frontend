import styled from "styled-components";

const StyledPage = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("/poker/background.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  user-select: none;
`;
const StyledContainer = styled.div`
  width: 75rem;
  height: 100%;
  padding: 40px 0px;
  display: flex;
  flex-direction: column;
`;

export { StyledPage, StyledContainer };
