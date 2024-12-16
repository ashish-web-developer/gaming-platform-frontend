import styled from "styled-components";
import Image from "next/image";

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.main};
  opacity: 0.8;
`;
const StyledDialogImageWrapper = styled.div`
  width: 285px;
  height: 285px;
  position: absolute;
  bottom: 0px;
  left: -40px;
`;

const StyledDialogImage = styled(Image)`
  object-fit: cover;
`;

const StyledPokerBuyInDialog = styled.dialog`
  width: 500px;
  background: ${({ theme }) => theme.palette.primary.main};
  background: url("/poker/poker-buy-in-dialog/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  border: 4px solid ${({ theme }) => theme.palette.info.main};
  border-radius: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px 30px 0px;
`;

const StyledLogo = styled.h4`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 1.25rem;
  text-align: center;
  line-height: 1;
  letter-spacing: 2px;
  text-shadow: 2px 0px 0px #fff, -2px 0px 0px #fff, 0px 2px 0px #fff,
    0px -2px 0px #fff;
`;

const StyledBuyInAmount = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: #fff;
  font-size: 1rem;
  padding: 8px 20px;
  background: ${({ theme }) => theme.palette.primary.light};
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.palette.info.main};
  margin-top: 1rem;
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
    border: 2px solid ${({ theme }) => theme.palette.info.main};
    border-radius: 10px;
    height: var(--track-height);
    background: #1e1e1e;
  }
  &::-moz-range-track {
    background: ${({ theme }) => theme.palette.primary.light};
    border: 2px solid ${({ theme }) => theme.palette.info.main};
    border-radius: 10px;
    height: var(--track-height);
    background: #1e1e1e;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background: ${({ theme }) => theme.palette.info.main};
    border-radius: 50%;
    margin-top: -3px;
  }
  &::-moz-range-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background: ${({ theme }) => theme.palette.info.main};
    border-radius: 50%;
    margin-top: -3px;
  }
`;

const StyledBlindsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledBlindsHeader = styled.span`
  font-size: 1.25rem;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.info.main};
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
  border: 2px solid ${({ theme }) => theme.palette.info.main};
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.primary.main};
  position: absolute;
  bottom: 0px;
  transform: translateY(50%);
  cursor: pointer;
`;

export {
  StyledBackdrop,
  StyledPokerBuyInDialog,
  StyledDialogImageWrapper,
  StyledDialogImage,
  StyledLogo,
  StyledBuyInAmount,
  StyledBuyInSlider,
  StyledBlindsContainer,
  StyledBlindsHeader,
  StyledBlindsAmountWrapper,
  StyledChipsImage,
  StyledBlindsAmount,
  StyledBuyInCta,
};
