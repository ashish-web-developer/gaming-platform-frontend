import styled from "styled-components";
import Image from "next/image";

const StyledChatSearchResult = styled.div`
  width: 100%;
  height: auto;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: scroll;
  max-height: 277px;
  position: absolute;
  margin-top: 14px;
  z-index: 2;
  background: ${({ theme }) => theme.palette.primary.main};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-height: 400px;
  }
`;

export { StyledChatSearchResult };
