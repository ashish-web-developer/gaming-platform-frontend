import styled from "styled-components";

const StyledSliderWrapper = styled.div`
  position: absolute;
  top: -60px;
  width: 450px;
  height: 50px;
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  background: rgba(245, 213, 71, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSlider = styled.div`
  width: 400px;
  height: 12px;
  border: 2px solid #000;
  border-radius: 10px;
  background: #f5d547;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTick = styled.span<{
  $is_active: boolean;
}>`
  display: inline-block;
  width: ${(props) => (props.$is_active ? "25px" : "20px")};
  height: ${(props) => (props.$is_active ? "25px" : "20px")};
  border-radius: 50%;
  border: 2px solid #000;
  background: ${(props) =>
    props.$is_active ? "#fff" : props.theme.palette.success.main};
  position: relative;
  ${(props) => {
    return (
      props.$is_active &&
      `
      &::after{
        content:"$ 20k";
        position:absolute;
        display:inline-block;
        padding:6px 16px;
        border:2px solid ${props.theme.palette.secondary.main};
        border-radius:30px;
        background:rgba(245, 213, 71,0.2);
        top:-60px;
        font-family:${props.theme.fontFamily.lobster};
        font-size:1rem;
        color:#fff;
        left:50%;
        transform:translateX(-50%);
        white-space:nowrap;
      }
    `
    );
  }}
`;

export { StyledSliderWrapper, StyledSlider, StyledTick };
