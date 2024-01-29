import styled from "styled-components";

const StyledScoreBoardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledScoreBoardContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 1.5rem 0px 1.5rem;
`;

const StyledScoreContainer = styled.div<{
  $alignItems: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.$alignItems};
  gap: 12px;
`;

const StyledUserName = styled.span`
  color: ${({ theme }) => theme.palette.primary.light};
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-decoration-line: underline;
  text-transform: uppercase;
`;
const StyledScore = styled.span`
  color: #fff;
  text-align: center;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: black;
`;

export {
  StyledScoreBoardContainer,
  StyledScoreBoardContent,
  StyledScoreContainer,
  StyledUserName,
  StyledScore,
};
