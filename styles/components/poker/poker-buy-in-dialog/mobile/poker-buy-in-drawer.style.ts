import styled from "styled-components";
import Image from "next/image";

const StyledPokerDrawerWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0px;
  z-index: 4;
  background: ${({ theme }) => theme.palette.primary.main};
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 16px 16px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
`;

const StyledLogoText = styled.h3`
  font-size: 1.6rem;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.secondary.main};
  text-align: center;
  line-height: 1.2;
`;

const StyledBuyInAmount = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: #fff;
  font-size: 1rem;
  padding: 10px 20px;
  background: ${({ theme }) => theme.palette.primary.light};
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  margin-top: 1.25rem;
`;

const StyledBuyInSlider = styled.input.attrs({
  type: "range",
})`
  --track-height: 16px;
  --thumb-size: 20px;
  position: relative;
  z-index: 3;
  margin-top: 1.5rem;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 250px;
  &::-webkit-slider-runnable-track {
    background: ${({ theme }) => theme.palette.primary.light};
    border: 2px solid ${({ theme }) => theme.palette.secondary.main};
    border-radius: 10px;
    height: var(--track-height);
  }
  &::-moz-range-track {
    background: ${({ theme }) => theme.palette.primary.light};
    border: 2px solid ${({ theme }) => theme.palette.secondary.main};
    border-radius: 10px;
    height: var(--track-height);
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background: ${({ theme }) => theme.palette.secondary.main};
    border-radius: 50%;
    margin-top: -3px;
  }
  &::-moz-range-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background: ${({ theme }) => theme.palette.secondary.main};
    border-radius: 50%;
    margin-top: -3px;
  }
`;

const StyledBlindsContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledBlindsHeader = styled.span`
  font-size: 1.25rem;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const StyledBlindsAmountWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
`;
const StyledChipsImage = styled(Image)``;
const StyledBlindsAmount = styled.span`
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: #fff;
`;

const StyledBuyInCta = styled.button`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 1rem;
  color: #fff;
  padding: 8px 28px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.primary.main};
  cursor: pointer;
  margin-top: 1.5rem;
`;

export {
  StyledPokerDrawerWrapper,
  StyledLogoText,
  StyledBuyInAmount,
  StyledBuyInSlider,
  StyledBlindsContainer,
  StyledBlindsHeader,
  StyledBlindsAmountWrapper,
  StyledChipsImage,
  StyledBlindsAmount,
  StyledBuyInCta,
};
