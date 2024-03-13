import styled from "styled-components";
import Image from "next/image";

const StyledGroupSuggestionWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 25px;
`;

const StyledDetailsWrapper = styled.div<{
  $add_padding: boolean;
}>`
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.dark};
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => (props.$add_padding ? "1.25rem" : "0px")};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: ${({ theme }) => theme.palette.primary.dark};
  font-size: 1.25rem;
`;

const StyledGroupSearchCta = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
const StyledSearchIcon = styled(Image)``;

const StyledGroupSearchInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 25px 25px 0px 0px;
  background: none;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: ${({ theme }) => theme.palette.primary.dark};
  font-size: 1rem;
  padding: 1rem;
  &::placeholder {
    color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

const StyledGroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1rem;
  height: calc(100% - 60px);
  overflow: scroll;
`;

export {
  StyledGroupSuggestionWrapper,
  StyledDetailsWrapper,
  StyledGroupSearchCta,
  StyledSearchIcon,
  StyledGroupList,
  StyledGroupSearchInput,
};
