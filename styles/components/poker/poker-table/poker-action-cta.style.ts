import styled from "styled-components";
import Image from "next/image";

// local components
import PokerButton from "@/components/poker/poker-common/poker-button";

const StyledActionCtaWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  top: 375px;
  display: flex;
  gap: 12px;
`;

const StyledActionCta = styled(PokerButton)`
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  line-height: 1;
  color: ${({ theme }) => theme.palette.info.main};
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 10px 16px;
  border: 2px solid ${({ theme }) => theme.palette.success.main};
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

const StyledActionCtaIcons = styled(Image)`
  object-fit: cover;
`;

export { StyledActionCtaWrapper, StyledActionCta, StyledActionCtaIcons };
