// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// styled
import styled from "styled-components";

type IStyledItem = {
  $flexBasis?: string | number;
  $flexGrow?: number;
  $marginRight?: number | string;
};


type IStyledAvatarName = {
  $fontSize: string;
  $color:string;
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 14px 0px;
  align-items: center;
  height: 100px;
`;

const StyledItem = styled.div<IStyledItem>`
  flex-basis: ${(props) => props.$flexBasis ?? "auto"};
  flex-grow: ${(props) => props.$flexGrow ?? 0};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => props.$marginRight ?? 0};
`;

const StyledHeaderProfile = styled.div`
  width:100%;
  display:flex;
  gap:20px;
  align-items:center;
`

const StyledAvatarName = styled.h3<IStyledAvatarName>`
  color: ${(props) => props.$color};
  font-family: "Poppins", sans-serif;
  font-size: ${(props) => props.$fontSize};
  font-weight: 800;
`;


const StyledChevronLeftIcon = styled(ChevronLeftIcon)`
  color: ${({ theme }) => theme.palette.text.main};
`;
const StyledDivider = styled.hr`
  height: 1px;
  background: -webkit-gradient(
    linear,
    0 0,
    100% 0,
    from(rgba(0, 0, 0, 0)),
    color-stop(0.5, #aaaaaa),
    to(rgba(0, 0, 0, 0))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(0, 0, 0, 0),
    #aaaaaa,
    rgba(0, 0, 0, 0)
  );
  background: -moz-linear-gradient(
    left,
    rgba(0, 0, 0, 0),
    #aaaaaa,
    rgba(0, 0, 0, 0)
  );
  background: -o-linear-gradient(
    left,
    rgba(0, 0, 0, 0),
    #aaaaaa,
    rgba(0, 0, 0, 0)
  );
  background: linear-gradient(
    left,
    rgba(0, 0, 0, 0),
    #aaaaaa,
    rgba(0, 0, 0, 0)
  );
  border: 0;

  &:after {
    display: block;
    content: "";
    height: 30px;
    background-image: -webkit-gradient(
      radial,
      50% 0%,
      0,
      50% 0%,
      116,
      color-stop(0%, #f2f2f2),
      color-stop(100%, rgba(255, 255, 255, 0))
    );
    background-image: -webkit-radial-gradient(
      center top,
      farthest-side,
      #f2f2f2 0%,
      rgba(255, 255, 255, 0) 100%
    );
    background-image: -moz-radial-gradient(
      center top,
      farthest-side,
      #f2f2f2 0%,
      rgba(255, 255, 255, 0) 100%
    );
    background-image: -o-radial-gradient(
      center top,
      farthest-side,
      #f2f2f2 0%,
      rgba(255, 255, 255, 0) 100%
    );
    background-image: radial-gradient(
      farthest-side at center top,
      #f2f2f2 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

export { StyledContainer, StyledItem ,StyledAvatarName, StyledHeaderProfile, StyledChevronLeftIcon, StyledDivider };
