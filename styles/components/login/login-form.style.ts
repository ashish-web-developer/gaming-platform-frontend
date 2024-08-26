import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.125rem;
`;

const StyledWrapper = styled.div`
  background: rgb(214, 255, 183, 0.7);
  width: 300px;
  border-radius: 8px;
  padding: 8px;
`;

const StyledTabWrapper = styled.div`
  background: rgb(214, 255, 183, 0.4);
  width: 300px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 8px;
`;

const StyledTab = styled.button`
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.primary.main};
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.info.main};
  border: 2px solid ${({ theme }) => theme.palette.info.main};
  font-size: 1rem;
  line-height: 2.75;
  width: 100%;
  &:disabled {
    border: 2px solid rgb(214, 255, 183, 0.7);
    color: rgb(214, 255, 183, 0.7);
  }
`;

const StyledInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 44px 1fr 48px;
  border: 2px solid ${({ theme }) => theme.palette.info.main};
  border-radius: 8px;
  overflow: hidden;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.info.main};
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 0px 16px;
  border: none;
  line-height: 2.75;
`;

const StyledSvgVectorWrapper = styled.span<{
  $width: string;
  $height: string;
  $show_border: boolean;
}>`
  display: inline-flex;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.primary.main};
  ${(props) =>
    props.$show_border &&
    `
      border-right:2px solid ${props.theme.palette.info.main};
    `}
`;

const StyledSubmitCta = styled.button`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1rem;
  line-height: 2.75;
  color: ${({ theme }) => theme.palette.info.main};
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.palette.info.main};
  background: ${({ theme }) => theme.palette.primary.main};
  width: 100%;
`;

const StyledPara = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1rem;
  color: #fff;
  width:300px;
  line-height:1;
`;
const StyledCta = styled.span<{
  $color:string;
}>`
  color:${(props)=>props.$color};
  cursor:pointer;
`;
export {
  StyledForm,
  StyledWrapper,
  StyledTabWrapper,
  StyledTab,
  StyledInputWrapper,
  StyledInput,
  StyledSvgVectorWrapper,
  StyledSubmitCta,
  StyledPara,
  StyledCta
};
