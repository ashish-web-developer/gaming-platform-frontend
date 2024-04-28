import styled from "styled-components";
import Image from "next/image";

const StyledPokerTableWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
  position: relative;
`;
const StyledPokerVectorWrapper = styled.div`
  position: absolute;
  top: 0px;
`;

const StyledTableDealerProfile = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.palette.secondary.main};
  position: absolute;
  top: -80px;
  overflow: hidden;
`;
const StyledTableDealerProfileImage = styled(Image)`
  object-fit: contain;
`;

const StyledTableCardWrapper = styled.div`
  position: absolute;
  top: 150px;
  display: flex;
  gap: 14px;
`;


export {
  StyledPokerTableWrapper,
  StyledPokerVectorWrapper,
  StyledTableDealerProfile,
  StyledTableDealerProfileImage,
  StyledTableCardWrapper,
};
