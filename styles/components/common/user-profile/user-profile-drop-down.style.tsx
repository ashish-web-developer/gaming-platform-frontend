import styled from "styled-components";
import Image from "next/image";

const StyledUserProfileDropDownWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: calc(100% + 1rem);
  color: #fff;
  width: 215px;
  height: auto;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const StyledUserImageWrapper = styled.div<{
  $mode: "light" | "dark";
}>`
  width: 80px;
  height: 80px;
  position: relative;
  border: 2px solid
    ${(props) =>
      props.$mode == "light"
        ? props.theme.palette.primary.dark
        : props.theme.palette.primary.light};
  border-radius: 50%;
  overflow: hidden;
`;
const StyledUserImage = styled(Image)`
  object-fit: cover;
`;

const StyledName = styled.h3`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  margin-top: 1rem;
  color: ${({ theme }) => theme.palette.primary.dark};
`;

const StyledUserName = styled.span`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: ${({ theme }) => theme.palette.primary.light};
`;

const StyledCtaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 0.75rem;
`;

const StyledIconCta = styled.button<{
  $mode: "light" | "dark";
}>`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 1.5px solid
    ${(props) =>
      props.$mode == "light"
        ? props.theme.palette.primary.dark
        : props.theme.palette.primary.light};
  background: ${(props) =>
    props.$mode == "light"
      ? "rgba(246, 174, 45,0.4)"
      : "rgba(162, 242, 99,0.4)"};
`;
export {
  StyledUserProfileDropDownWrapper,
  StyledUserImageWrapper,
  StyledUserImage,
  StyledName,
  StyledUserName,
  StyledCtaWrapper,
  StyledIconCta,
};
