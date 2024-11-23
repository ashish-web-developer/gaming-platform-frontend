import styled from "styled-components";

const StyledGameBannerWrapper = styled.div<{
  $border_color: string;
  $background_image: string;
  $background_opacity: number;
}>`
  position: absolute;
  width: 300px;
  height: 180px;
  border: 2px solid ${(props) => props.$border_color};
  border-radius: 16px;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  background:black;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    background: red;
    position: absolute;
    top: 0px;
    left: 0px;
    background: ${(props) => props.$background_image};
    background-size: cover;
    background-repeat: no-repeat;
    opacity: ${(props) => props.$background_opacity};
  }
`;

export { StyledGameBannerWrapper };
