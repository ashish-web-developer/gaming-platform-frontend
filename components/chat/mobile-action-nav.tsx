// types
import type { FC } from "react";

// styled components
import {
  StyledMobileActionNav,
  StyledVectorContainer,
  StyledContent,
  StyledCta,
  StyledImage,
} from "@/styles/components/chat/mobile-action-nav.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { mode, updateMode } from "@/store/slice/common.slice";

const ContainerVector = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="206"
      fill="none"
      viewBox="0 0 50 206"
    >
      <path
        fill="#000"
        stroke="#A2F263"
        strokeWidth="2"
        d="M-1 3l50 41.652v116.696L-1 203V3z"
      ></path>
    </svg>
  );
};

const MobileActionNav: FC = () => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  return (
    <StyledMobileActionNav>
      <StyledVectorContainer>
        <ContainerVector />
      </StyledVectorContainer>
      <StyledContent>
        <StyledCta
          onClick={() => {
            dispatch(updateMode(_mode == "light" ? "dark" : "light"));
          }}
        >
          <StyledImage
            src={"/chat/mobile-action-nav/moon.png"}
            fill={true}
            alt="icons"
          />
        </StyledCta>
        <StyledCta>
          <StyledImage
            src={"/chat/mobile-action-nav/search.png"}
            fill={true}
            alt="icons"
          />
        </StyledCta>
      </StyledContent>
    </StyledMobileActionNav>
  );
};
export default MobileActionNav;
