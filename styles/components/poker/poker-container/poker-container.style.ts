import styled from "styled-components";

const StyledPage = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("/poker/background.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
`;
const StyledContainer = styled.div`
  width: 75rem;
  height: 100%;
  padding: 40px 0px;
`;

export { StyledPage, StyledContainer };
