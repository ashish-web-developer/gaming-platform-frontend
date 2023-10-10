import styled from "styled-components";

const StyledCard = styled.div`
  width: 80px;
  height: 120px;
  background: #fff;
  border-radius: 6px;
  border-radius: 6px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    border-radius: 6px;
    background: url("/memory-game/game-board/card/background-1.jpg"),
      url("/memory-game/game-board/card/background-2.jpg");
    background-size: cover;
    opacity: 0.2;
  }
`;

const StyledBorder = styled.div`
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  border: 2px solid #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0);
`;

const StyledText = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 10px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-decoration-line: underline;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-37deg);
`;

const StyledTextSpan = styled.span`
  color: #f42c04;
`;

export { StyledCard, StyledBorder, StyledText, StyledTextSpan };
