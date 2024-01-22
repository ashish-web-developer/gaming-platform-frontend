import styled from "styled-components";

const StyledUsersProfile = styled.div<{
  $border_color: string;
  $not_viewed: number;
  $time: string;
}>`
  width: 100%;
  min-height: 64px;
  border-radius: 16px;
  background: ${({ theme }) => theme.palette.secondary.main};
  display: flex;
  align-items: center;
  padding-left: 16px;
  gap: 15px;
  border: 2px solid ${(props) => props.$border_color};
  position: relative;
  &::after {
    content: "${(props) => props.$time}";
    position: absolute;
    right: 16px;
    top: 12px;
    font-family: lobster;
    font-size: 12px;
  }
  &::before {
    display: ${(props) => (props.$not_viewed ? "flex" : "none")};
    content: "${(props) => props.$not_viewed}";
    position: absolute;
    width: 16px;
    height: 16px;
    right: 10px;
    border-radius: 50%;
    background: #afa2ff;
    border: 1px solid #000;
    bottom: 12px;
    font-family: lobster;
    font-size: 12px;
    justify-content: center;
    align-items: center;
  }
`;

const StyledUserImage = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #000;
  border-radius: 8px;
`;

const StyledUserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledUserName = styled.span`
  color: #000;
  font-family: lobster;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledUserMessage = styled.span`
  color: #40434e;
  font-family: lobster;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px;
`;
export {
  StyledUsersProfile,
  StyledUserImage,
  StyledUserDetails,
  StyledUserName,
  StyledUserMessage,
};
