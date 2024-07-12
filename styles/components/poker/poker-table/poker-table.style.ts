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
const StyledLeftPlayerWrapper = styled.div`
  width: 200px;
  height: 100%;
  position: absolute;
  transform: translateX(-46%);
  display:flex;
  flex-direction:column;
  justify-content:space-evenly;
  align-items:center;
`;
const StyledRightPlayerWrapper = styled.div`
  width: 200px;
  height: 100%;
  position: absolute;
  right:0px;
  transform: translateX(46%);
  display:flex;
  flex-direction:column-reverse;
  justify-content:space-evenly;
  align-items:center;
`

const StyledBottomPlayerWrapper = styled.div`
  width:100%;
  height:200px;
  position:absolute;
  bottom:0px;
  transform:translateY(45%);
  display:flex;
  justify-content:space-evenly;
  align-items:center;
`

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
  top: 220px;
  display: flex;
  gap: 14px;
`;

const StyledBorderedCard = styled.div`
  width: 60px;
  height: 90px;
  border: 2px dashed ${({ theme }) => theme.palette.secondary.main};
  border-radius: 6px;
  background: transparent;
`;

const StyledChipsInPotWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 1.125rem;
  color: #fff;
  padding: 8px 20px;
  border-radius: 25px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  background: rgba(245, 213, 71, 0.2);
  top: 140px;
`;

const StyledPokerChipsImage = styled(Image)``;

export {
  StyledPokerTableWrapper,
  StyledPokerVectorWrapper,
  StyledLeftPlayerWrapper,
  StyledRightPlayerWrapper,
  StyledBottomPlayerWrapper,
  StyledTableDealerProfile,
  StyledTableDealerProfileImage,
  StyledTableCardWrapper,
  StyledBorderedCard,
  StyledChipsInPotWrapper,
  StyledPokerChipsImage,
};
