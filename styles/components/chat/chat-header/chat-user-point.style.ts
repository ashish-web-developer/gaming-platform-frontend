import styled from "styled-components";
import Image from "next/image";

const StyledUserPointWrapper = styled.div`
  width: auto;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 25px;
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 14px;
  padding-left: 10px;
  gap: 10px;
`;

const StyledDollarIcon = styled(Image)``;

const StyledSpan = styled.span<{
  $mode: "light" | "dark";
}>`
  color: ${(props) =>
    props.$mode == "dark"
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark};
`;

const StyledDepositCta = styled.button`
  background: ${({ theme }) => theme.palette.secondary.main};
  height: 40px;
  display: flex;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 25px;
  gap: 4px;
  padding: 0px 12px;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  margin-right: -2px;
  cursor: pointer;
`;

const StyledAddIcon = styled(Image)``;
export {
  StyledUserPointWrapper,
  StyledDollarIcon,
  StyledSpan,
  StyledDepositCta,
  StyledAddIcon,
};
