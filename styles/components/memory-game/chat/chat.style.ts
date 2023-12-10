import styled from "styled-components";
import Image from "next/image";

type IStyledChatAvatar = {
  $order?: 1 | 2;
};

type IStyledCenteredBackground = {
  $mode: "light" | "dark";
};

const StyledChatContainer = styled.div`
  position: relative;
  width: 412px;
  height: 100%;
  border-radius: 25px;
  background: ${({ theme }) => theme.palette.chat.main};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 3;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 90%;
    &::after {
      content: "";
      position: absolute;
      z-index: 7;
      bottom: -50px;
      right: 150px;
      border: 25px;
      border-style: solid;
      border-color: ${({ theme }) => theme.palette.chat.main} transparent
        transparent transparent;
    }
  }
`;

const StyledTopBackground = styled.div`
  width: 100%;
  height: 114px;
  position: absolute;
  top: 0px;
  z-index: 3;
  background: ${({ theme }) => theme.palette.chat.top_background};
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px;
`;

const StyledCenteredBackground = styled.div<IStyledCenteredBackground>`
  display: ${(props) => (props.$mode == "light" ? "none" : "block")};
  width: 112px;
  height: 112px;
  background: #f65be3;
  filter: blur(100px);
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledChatAvatar = styled.div<IStyledChatAvatar>`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 3px solid #000;
  order: ${(props) => props.$order ?? 0};
`;

const StyledVersusContainer = styled.div`
  height: 38px;
  background-color: ${({ theme }) => theme.palette.chat.vs_container.main};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    height: 23px;
  }
`;

const StyledVersusImage = styled(Image)`
  flex-shrink: 0;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 25px;
    height: 25px;
  }
`;

const StyledVersusText = styled.span`
  color: ${({ theme }) => theme.palette.chat.vs_container.text};
  text-align: center;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
  flex: 1;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    font-size: 10px;
  }
`;

const StyledChatContent = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 16px 24px;
`;

export {
  StyledChatContainer,
  StyledTopBackground,
  StyledCenteredBackground,
  StyledChatAvatar,
  StyledVersusContainer,
  StyledVersusImage,
  StyledVersusText,
  StyledChatContent,
};
