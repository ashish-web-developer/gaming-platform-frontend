import styled from "styled-components";

const StyledPokerActionCtaWrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 20px;
  gap: 20px;
`;

const StyledActionCta = styled.button<{
  $color: string;
}>`
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 6px 20px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 1rem;
  color: ${(props) => props.$color};
`;

export default StyledActionCta;

export { StyledPokerActionCtaWrapper, StyledActionCta };
