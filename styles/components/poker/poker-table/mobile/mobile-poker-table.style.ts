import styled from "styled-components";
import Image from "next/image";

const StyledPokerMobileTableWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledPokerTableWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  @media (max-height: 850px) {
    transform: translate(-50%, -52%);
  }
  @media (max-height: 700px) {
    transform: translate(-50%, -50%);
  }
`;

const StyledTableDealerProfile = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.palette.secondary.main};
  position: absolute;
  overflow: hidden;
  left: 50%;
  transform: translate(-50%, -60%);
`;
const StyledTableDealerProfileImage = styled(Image)`
  object-fit: contain;
`;

const StyledChipsInPotWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.875rem;
  color: #fff;
  padding: 4px 12px;
  border-radius: 25px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  background: rgba(245, 213, 71, 0.2);
  left: 50%;
  top: 70px;
  transform: translate(-50%);
`;

const StyledPokerChipsImage = styled(Image)``;

const StyledLeftPlayerWrapper = styled.div`
  width: 100px;
  height: 100%;
  position: absolute;
  transform: translateX(-46%);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const StyledRightPlayerWrapper = styled.div`
  width: 100px;
  height: 100%;
  position: absolute;
  right: 0px;
  transform: translateX(46%);
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledBottomPlayerWrapper = styled.div`
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0px;
  transform: translateY(45%);
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  bottom: -17px;
`;

const StyledTableCardWrapper = styled.div`
  position: absolute;
  top: 190px;
  display: flex;
  gap: 6px;
  width: 100%;
  justify-content: center;
`;

const StyledBorderedCard = styled.div`
  width: 40px;
  height: 60px;
  border: 1.5px dashed ${({ theme }) => theme.palette.secondary.main};
  border-radius: 4px;
  background: transparent;
  @media (max-height: 850px) {
    width: 36px;
    height: 54px;
  }
`;
export {
  StyledPokerMobileTableWrapper,
  StyledPokerTableWrapper,
  StyledTableDealerProfile,
  StyledTableDealerProfileImage,
  StyledChipsInPotWrapper,
  StyledPokerChipsImage,
  StyledLeftPlayerWrapper,
  StyledRightPlayerWrapper,
  StyledBottomPlayerWrapper,
  StyledTableCardWrapper,
  StyledBorderedCard,
};
