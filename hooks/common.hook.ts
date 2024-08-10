import { useState, useEffect } from "react";

// types
import { RefObject, ForwardedRef } from "react";

const useIsMobile = () => {
  const [is_mobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(document.documentElement.clientWidth <= 600);
    const handleReSize = () => {
      setIsMobile(document.documentElement.clientWidth <= 600);
    };
    window.addEventListener("resize", handleReSize);
    return () => {
      window.removeEventListener("resize", handleReSize);
    };
  }, []);
  return is_mobile;
};

const useIsMounted = () => {
  const [is_mounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  return is_mounted;
};

const useClientHeight = () => {
  const [client_height, set_client_height] = useState<number>(600);
  useEffect(() => {
    set_client_height(document.documentElement.clientHeight);
    const handleResize = () => {
      set_client_height(document.documentElement.clientHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return client_height;
};

/**
 * To handle handle outside click
 */
const useOutsideClickHandler = ({
  modal_ref,
  cta_ref,
  handler,
}: {
  modal_ref: RefObject<HTMLElement> | ForwardedRef<HTMLElement>;
  cta_ref: ForwardedRef<HTMLElement>;
  handler: () => void;
}) => {
  useEffect(() => {
    const onClickHandler = (event: MouseEvent) => {
      if (
        typeof modal_ref !== "function" &&
        typeof cta_ref !== "function" &&
        (modal_ref?.current?.contains(event.target as Element) ||
          cta_ref?.current?.contains(event.target as Element))
      ) {
        return;
      }
      handler();
    };
    document.addEventListener("click", onClickHandler);
    return () => {
      document.removeEventListener("click", onClickHandler);
    };
  }, []);
};
export { useIsMobile, useIsMounted, useOutsideClickHandler, useClientHeight };
