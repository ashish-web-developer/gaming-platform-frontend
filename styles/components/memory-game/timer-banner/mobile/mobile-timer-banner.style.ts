import styled from "styled-components";

type IStyledTextSpan = {
  $color: string;
};

const StyledTimerBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 100px;
`;

const StyledTimerBanner = styled.div`
  width: 98%;
  height: 351px;
  border-radius: 25px;
  margin-top: 40px;
  border: 2px dashed #fff;
  background: #080f0f;
  position: relative;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    background: url("/memory-game/timer-banner/mobile/background.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.3;
  }
`;

const StyledTimerBannerContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1.5rem;
`;

const StyledMainText = styled.h2`
  color: #fff;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 28px;
  font-weight: 800;
  text-transform: capitalize;
  text-align: right;
`;

const StyledTextSpan = styled.span<IStyledTextSpan>`
  color: ${(props) => props.$color};
`;

const StyledVsContainer = styled.span`
  position: absolute;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 1rem;
  font-weight: 600;
  text-transform: capitalize;
  color: #fff;
  bottom: 15px;
  left: 1.5rem;
`;

const StyledTimerButton = styled.span`
  position: absolute;
  width: 50px;
  height: 50px;
  background: #fff;
  background: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  StyledTimerBannerContainer,
  StyledTimerBanner,
  StyledTimerBannerContent,
  StyledMainText,
  StyledTextSpan,
  StyledVsContainer,
  StyledTimerButton,
};
