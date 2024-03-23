import { createPortal } from "react-dom";
import { useRef } from "react";
// types
import type { FC } from "react";
import type { Theme } from "@/theme/chat.theme";

// styled theme
import { useTheme } from "styled-components";

// local components
import MobileSearchDialog from "@/components/chat/mobile-search-dialog";

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
import { show_search_dialog } from "@/store/slice/chat.slice";
import { updateShowSearch } from "@/store/slice/chat.slice";
// hooks
import { useIsMounted } from "@/hooks/common.hook";

const ContainerVector: FC = () => {
  const theme = useTheme() as Theme;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="206"
      fill="none"
      viewBox="0 0 50 206"
    >
      <path
        fill={theme.palette.primary.main}
        stroke={theme.palette.primary.dark}
        strokeWidth="2"
        d="M-1 3l50 41.652v116.696L-1 203V3z"
      ></path>
    </svg>
  );
};

type IProps = {
  active_tab: 1 | 2;
};

const MobileActionNav: FC<IProps> = ({ active_tab }) => {
  const dispatch = useAppDispatch();
  const search_cta_ref = useRef<HTMLButtonElement>(null);
  const _mode = useAppSelector(mode);
  const is_mounted = useIsMounted();
  const _show_search_dialog = useAppSelector(show_search_dialog);

  return (
    <StyledMobileActionNav>
      {is_mounted &&
        _show_search_dialog &&
        createPortal(
          <MobileSearchDialog active_tab={active_tab} />,
          document.getElementById("chat-search-container") as HTMLElement
        )}
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
            sizes="(max-width: 1400px) 5vw"
          />
        </StyledCta>
        <StyledCta
          onClick={(event) => {
            event.stopPropagation();
            dispatch(updateShowSearch(true));
          }}
          ref={search_cta_ref}
        >
          <StyledImage
            src={"/chat/mobile-action-nav/search.png"}
            fill={true}
            alt="icons"
            sizes="(max-width: 1400px) 5vw"
          />
        </StyledCta>
      </StyledContent>
    </StyledMobileActionNav>
  );
};
export default MobileActionNav;
