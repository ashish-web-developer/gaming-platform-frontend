// types
import type { RefObject } from "react";

type IParams = {
  timeout_ref: RefObject<NodeJS.Timeout | null>;
  container_ref: RefObject<HTMLElement>;
  is_request_pending: boolean;
  handler: () => void;
};

const fetchOnScroll = ({
  timeout_ref,
  container_ref,
  is_request_pending,
  handler,
}: IParams) => {
  timeout_ref.current && clearTimeout(timeout_ref.current);
  // calling api when reached the end of container
  if (
    !is_request_pending &&
    container_ref.current &&
    container_ref.current.scrollHeight <=
      Math.ceil(
        container_ref.current.scrollTop + container_ref.current.clientHeight
      )
  ) {
    handler();
  }
};

export { fetchOnScroll };
