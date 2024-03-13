import { useRef, useEffect } from "react";
// type
import type { FC } from "react";

// styled components
import {
  StyledGroupSuggestionWrapper,
  StyledDetailsWrapper,
  StyledGroupSearchCta,
  StyledSearchIcon,
  StyledGroupList,
  StyledGroupSearchInput,
} from "@/styles/components/chat/group-suggestion/group-suggestion.style";

// local components
import ChatGroup from "@/components/chat/chat-sidebar/chat-group-list/chat-group";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { mode } from "@/store/slice/common.slice";
import {
  // state
  recommended_groups,
  show_group_search,
  is_fetch_group_request_pending,
  fetched_group_results,
  // action
  updateShowGroupSearch,
  updatePage,
  updateFetchedGroupResult,
  // api
  fetchGroupApi,
} from "@/store/slice/group.slice";

// helpers
import { fetchOnScroll } from "@/helpers/chat.helper";
import { useOutsideClickHandler } from "@/hooks/common.hook";

const GroupSuggestion: FC = () => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const input_ref = useRef<HTMLInputElement>(null);
  const _recommended_groups = useAppSelector(recommended_groups);
  const _show_group_search = useAppSelector(show_group_search);
  const _fetched_user_result = useAppSelector(fetched_group_results);
  const _is_fetch_group_request_pending = useAppSelector(
    is_fetch_group_request_pending
  );
  const result_container_ref = useRef<HTMLDivElement>(null);
  const timeout_ref = useRef<NodeJS.Timeout | null>(null);
  useOutsideClickHandler({
    modal_ref:result_container_ref,
    cta_ref:input_ref,
    handler:()=>{
      dispatch(updateShowGroupSearch(false));
      dispatch(updateFetchedGroupResult([]));
    }
  })

  useEffect(()=>{
    if(_show_group_search){
      input_ref.current?.focus();
    }
  },[_show_group_search])
  return (
    <StyledGroupSuggestionWrapper>
      <StyledDetailsWrapper $add_padding={!_show_group_search}>
        {_show_group_search ? (
          <StyledGroupSearchInput
            ref={input_ref}
            type="text"
            placeholder="Search..."
            onChange={(event) => {
              dispatch(updatePage(1));
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
            }}
          />
        ) : (
          <>
            Groups Suggestions
            <StyledGroupSearchCta
              onClick={(event) => {
                event.stopPropagation();
                dispatch(updateShowGroupSearch(true));
              }}
            >
              <StyledSearchIcon
                alt="search icon"
                width={35}
                height={35}
                src={`/chat/chat-sidebar/chat-search-input/${_mode}-search.png`}
              />
            </StyledGroupSearchCta>
          </>
        )}
      </StyledDetailsWrapper>
      <StyledGroupList
        ref={result_container_ref}
        onScroll={() => {
          if (_show_group_search) {
            console.log("inside function");
            fetchOnScroll({
              timeout_ref: timeout_ref,
              container_ref: result_container_ref,
              is_request_pending: _is_fetch_group_request_pending,
              handler: () => {
                timeout_ref.current = setTimeout(() => {
                  if (input_ref.current) {
                    console.log("inside handler");
                    dispatch(
                      fetchGroupApi({
                        query: input_ref.current.value,
                      })
                    );
                  }
                }, 300);
              },
            });
          }
        }}
      >
        {_show_group_search || Boolean(_fetched_user_result.length)
          ? _fetched_user_result.map((group, index) => {
              return (
                <ChatGroup
                  show_follow_cta={true}
                  key={`chat-group-${index}`}
                  {...group}
                />
              );
            })
          : _recommended_groups.map((group, index) => {
              return (
                <ChatGroup
                  show_follow_cta={true}
                  key={`chat-group-${index}`}
                  {...group}
                />
              );
            })}
      </StyledGroupList>
    </StyledGroupSuggestionWrapper>
  );
};
export default GroupSuggestion;
