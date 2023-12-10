import styled from "styled-components";

type IStyledMessageContainer = {
  $justifyContent: "flex-end" | "flex-start";
};

type IStyledProfile = {
  $order: number;
};
type IStyledMessage = {
  $background: string;
  $order: number;
  $border: string;
};

const StyledChatContentContainer = styled.div`
  flex: 1;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  &::-webkit-scrollbar {
    width: 8px; /* Adjust the width of the scrollbar as needed */
  }
  &::-webkit-scrollbar:horizontal {
    height: 0px; /* Adjust this value to change the horizontal scrollbar width */
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) =>
      theme.palette.chat
        .main}; /* Change this to the desired background color */
  }
  /* Change the color of the scrollbar thumb (draggable part) */
  &::-webkit-scrollbar-thumb:vertical {
    background-color: ${({ theme }) =>
      theme.palette.chat
        .scrollbar_color}; /* Change this to the desired thumb color */
    border-radius: 6px; /* Round the corners of the thumb */
  }
  padding-top: 100px;
`;

const StyledMessageContainer = styled.div<IStyledMessageContainer>`
  display: flex;
  justify-content: ${(props) => props.$justifyContent};
  gap: 12px;
  width: 100%;
`;

const StyledProfile = styled.span<IStyledProfile>`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #fff;
  order: ${(props) => props.$order};
`;

const StyledMessage = styled.div<IStyledMessage>`
  width: 145px;
  height: auto;
  padding: 12px;
  background: ${(props) => props.$background};
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  border-radius: ${(props) => props.$border};
  order: ${(props) => props.$order};
`;

export {
  StyledChatContentContainer,
  StyledMessageContainer,
  StyledProfile,
  StyledMessage,
};
