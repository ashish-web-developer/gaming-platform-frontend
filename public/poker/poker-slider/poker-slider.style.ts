import styled from "styled-components";

const StyledPokerSliderWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  height: 650px;
  width: 120px;
  background: ${({ theme }) => theme.palette.primary.main};
  border: 1rem solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 12px;
  padding: 40px 0px;
`;
const StyledPokerSlider = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;
`;

const StyledSliderTrack = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 0px;
  background: ${({ theme }) => theme.palette.primary.main};
  border-top: 1rem solid ${({ theme }) => theme.palette.secondary.main};
  background: transparent;
`;
const StyledSliderThumb = styled.div<{
  $content: string;
}>`
  left: -110px;
  bottom: -12px;
  cursor: pointer;
  position: absolute;
`;
const StyledSliderThumbContent = styled.span`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 1.125rem;
  color: ${({ theme }) => theme.palette.secondary.main};
  display: flex;
  justify-content: flex-start;
  padding-left: 16px;
  align-items: center;
`;

const StyledSliderTick = styled.span`
  display: inline-block;
  width: 24px;
  border: 2px solid #fff;
`;
const StyledSliderTickWithValue = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export {
  StyledPokerSliderWrapper,
  StyledSliderTrack,
  StyledSliderThumb,
  StyledSliderThumbContent,
  StyledSliderTick,
  StyledSliderTickWithValue,
  StyledPokerSlider,
};
