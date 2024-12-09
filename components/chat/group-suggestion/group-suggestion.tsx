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
  recommendedGroups,
  showGroupSearch,
  isFetchGroupRequestPending,
  fetchedGroupResults,
  // action
  updateShowGroupSearch,
  updatePage,
  updateFetchedGroupResult,
  // api
  fetchGroupApi,
} from "@/store/slice/group.slice";

// helpers
import { fetchOnScroll } from "@/helpers/chat.helper";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const GroupSuggestion: FC = () => {
  const dispatch = useAppDispatch();
  const suggestion_wrapper = useRef<HTMLDivElement>(null);
  const _mode = useAppSelector(mode);
  const input_ref = useRef<HTMLInputElement>(null);
  const recommended_groups = useAppSelector(recommendedGroups);
  const show_group_search = useAppSelector(showGroupSearch);
  const fetched_group_result = useAppSelector(fetchedGroupResults);
  const is_fetch_group_request_pending = useAppSelector(
    isFetchGroupRequestPending
  );
  const result_container_ref = useRef<HTMLDivElement>(null);
  const timeout_ref = useRef<NodeJS.Timeout | null>(null);


  useGSAP(
    () => {
      if (
        show_group_search ||
        fetched_group_result.length ||
        recommended_groups.length
      ) {
        gsap.timeline().fromTo(
          "#chat-group-wrapper",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            stagger: 0.08,
            duration: 1,
            ease: "expo",
          }
        );
      }
    },
    {
      scope: suggestion_wrapper,
      dependencies: [
        show_group_search,
        fetched_group_result.length,
        recommended_groups.length,
      ],
      revertOnUpdate: true,
    }
  );

  useEffect(() => {
    const outsideClickHandler = (event: Event) => {
      if (
        !input_ref.current?.contains(event.target as Node) &&
        !result_container_ref.current?.contains(event.target as Node)
      ) {
        dispatch(updateShowGroupSearch(false));
        dispatch(updateFetchedGroupResult([]));
      }
    };
    if (show_group_search) {
      input_ref.current?.focus();
      document.addEventListener("click", outsideClickHandler);
    }
    return () => {
      if (show_group_search) {
        document.removeEventListener("click", outsideClickHandler);
      }
    };
  }, [show_group_search]);

  return (
    <StyledGroupSuggestionWrapper ref={suggestion_wrapper} >
      <StyledDetailsWrapper $add_padding={!show_group_search}>
        {show_group_search ? (
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
          if (show_group_search) {
            fetchOnScroll({
              timeout_ref: timeout_ref,
              container_ref: result_container_ref,
              is_request_pending: is_fetch_group_request_pending,
              handler: () => {
                timeout_ref.current = setTimeout(() => {
                  if (input_ref.current) {
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
        {show_group_search || Boolean(fetched_group_result.length)
          ? fetched_group_result.map((group, index) => {
              return (
                <ChatGroup
                  show_follow_cta={true}
                  key={`chat-group-${index}`}
                  {...group}
                />
              );
            })
          : recommended_groups.map((group, index) => {
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
