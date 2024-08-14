import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
// types
import type { ComponentType } from "react";

type IBaseProps = {
  count_down: number;
};

const withCountDown = (BaseComponent: ComponentType<IBaseProps>) => {
  const EnhancedComponent = () => {
    const router = useRouter();
    const [count, setCount] = useState(20);
    const timerRef = useRef<NodeJS.Timer | null>(null);

    useEffect(() => {
      timerRef.current = setInterval(() => {
        setCount((prev) => {
          return prev - 1;
        });
      }, 1000);
      return () => {
        timerRef.current && clearInterval(timerRef.current);
      };
    }, []);
    if (count <= 0) {
      router.push("/chat");
      return null;
    }
    return <BaseComponent count_down={count} />;
  };
  return EnhancedComponent;
};

export default withCountDown;
