import Image from "next/image";
// styled
import { styled } from "styled-components";

const StyledMemoryGameContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  width: 100%;
  height: 100vh;
  max-height: 900px;
  min-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPlayerNameContainer = styled.div`
  width: 90%;
  height: 30px;
  border-radius: 8px;
  background: rgba(217, 217, 217, 0.64);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.palette.fontFamily.blackOpsOne};
  font-sie: 12px;
  position: absolute;
  bottom: 10px;
`;

const StyledWelcomeText = styled.div`
  color: #000;
  font-family: Black Ops One;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position:absolute;
  top:70px;
  left:100px;
`;

export { StyledMemoryGameContainer, StyledPlayerNameContainer ,StyledWelcomeText};
