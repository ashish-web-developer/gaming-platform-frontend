import { useRef, forwardRef, useEffect } from "react";
// types
import type { FC, ForwardRefRenderFunction } from "react";

// styled components

import {
  StyledSearchDialog,
  StyledSearchInputWrapper,
  StyledSearchInput,
  StyledSearchIcon,
  StyledImage,
} from "@/styles/components/chat/mobile-search-dialog.style";

// local components
import ChatSearchResult from "@/components/chat/chat-sidebar/chat-search-result";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { mode } from "@/store/slice/common.slice";
import {
  show_search_dialog,
  fetched_user_result,
  updatePage as updateUserSearchApiPage,
  updateFetchUserResult,
  updateShowSearch,
  fetchUserApi,
} from "@/store/slice/chat.slice";
import {
  fetched_group_results,
  // action
  updatePage as updateGroupSearchApiPage,
  updateFetchedGroupResult,
  // api
  fetchGroupApi,
} from "@/store/slice/group.slice";

// hooks
import { useIsMounted, useOutsideClickHandler } from "@/hooks/common.hook";

const MobileSearchDialog: ForwardRefRenderFunction<
  HTMLButtonElement,
  {
    active_tab: 1 | 2;
  }
> = ({ active_tab }, cta_ref) => {
  const dispatch = useAppDispatch();
  const is_mounted = useIsMounted();
  const _mode = useAppSelector(mode);
  const search_dialog_ref = useRef<HTMLDialogElement>(null);
  const search_container_ref = useRef<HTMLDivElement>(null);
  const search_input_ref = useRef<HTMLInputElement>(null);
  const _show_search_dialog = useAppSelector(show_search_dialog);
  const timeout_ref = useRef<NodeJS.Timeout | null>(null);
  const _fetched_user_result = useAppSelector(fetched_user_result);
  const _fetched_group_results = useAppSelector(fetched_group_results);

  useOutsideClickHandler({
    modal_ref: search_dialog_ref,
    cta_ref: typeof cta_ref !== "function" ? cta_ref : null,
    handler: () => {
      dispatch(updateShowSearch(false));
      dispatch(updateFetchUserResult([]));
    },
  });

  useEffect(() => {
    if (is_mounted) {
      search_input_ref.current?.focus();
    }
  }, [is_mounted]);

  return (
    <StyledSearchDialog ref={search_dialog_ref} open={_show_search_dialog}>
      <StyledSearchInputWrapper ref={search_container_ref}>
        <StyledSearchInput
          onChange={(event) => {
            if (active_tab == 1) {
              dispatch(updateUserSearchApiPage(1));
              dispatch(updateFetchUserResult([]));
              timeout_ref.current && clearInterval(timeout_ref.current);
              if (event.target.value) {
                timeout_ref.current = setTimeout(() => {
                  dispatch(
                    fetchUserApi({
                      fetch_type: "chat",
                      query: event.target.value,
                    })
                  );
                }, 800);
              }
            } else if (active_tab == 2) {
              dispatch(updateGroupSearchApiPage(1));
              dispatch(updateFetchedGroupResult([]));
              timeout_ref.current && clearInterval(timeout_ref.current);
              if (event.target.value) {
                timeout_ref.current = setTimeout(() => {
                  dispatch(
                    fetchGroupApi({
                      query: event.target.value,
                    })
                  );
                }, 800);
              }
            }
          }}
          $mode={_mode}
          placeholder="Search Player"
          ref={search_input_ref}
        />
        <StyledSearchIcon>
          <StyledImage
            src={"/chat/mobile-action-nav/search.png"}
            fill={true}
            alt="icons"
          />
        </StyledSearchIcon>
      </StyledSearchInputWrapper>
      {(_fetched_user_result.length || _fetched_group_results.length) && (
        <ChatSearchResult
          type={active_tab == 1 ? "user_search" : "group_search"}
          search_container_ref={search_container_ref}
          ref={search_input_ref}
          handleModalClose={() => {
            if (search_dialog_ref.current) {
              search_dialog_ref.current.close();
            }
          }}
        />
      )}
    </StyledSearchDialog>
  );
};

export default forwardRef(MobileSearchDialog);
