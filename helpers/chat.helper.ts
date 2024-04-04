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
const getUserStatus = (last_seen: string | null) => {
  if (!last_seen) return false;
  const last_seen_date = new Date(last_seen);
  const current_date = new Date();
  const difference =
    (current_date.getTime() - last_seen_date.getTime()) / (1000 * 60);
  return difference < 1;
};

export { fetchOnScroll, getUserStatus };
