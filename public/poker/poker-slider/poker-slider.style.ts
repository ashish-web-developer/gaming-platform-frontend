import styled from "styled-components";

const StyledPokerSlider = styled.div`
  position: absolute;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  height: 650px;
  width: 120px;
  background: ${({ theme }) => theme.palette.primary.main};
  border: 1rem solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 12px;
`;

const StyledSliderTrack = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 0px;
  background: ${({ theme }) => theme.palette.primary.main};
  border-top: 1rem solid ${({ theme }) => theme.palette.secondary.main};
`;
const StyledSliderThumb = styled.div`
  bottom: 12px;
  left: -110px;
  cursor: pointer;
  position: absolute;
`;

export { StyledPokerSlider, StyledSliderTrack, StyledSliderThumb };
