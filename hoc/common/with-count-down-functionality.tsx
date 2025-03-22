import { useEffect, useState, useRef } from "react";
// type
import type { ComponentType } from "react";

interface IComponentProps {
  count: number;
  is_finished: boolean;
}

type IExtendedComponentProps<ExtraProps> = ExtraProps & IComponentProps;

const withCountDownFunctionality = <
  ExtraProps extends { [key: string]: any } & { initial_count: number }
>(
  BaseComponent: ComponentType<
    IExtendedComponentProps<Omit<ExtraProps, "initial_count">>
  >
) => {
  const EnhancedComponent = ({ initial_count, ...props }: ExtraProps) => {
    const [{ count_down, count_down_finished }, setCountDownObj] = useState({
      count_down: initial_count,
      count_down_finished: false,
    });
    const timer_ref = useRef<ReturnType<typeof setInterval>>();

    useEffect(() => {
      timer_ref.current = setInterval(() => {
        setCountDownObj((prev) => {
          if (prev.count_down <= 0) {
            return {
              ...prev,
              count_down_finished: true,
            };
          }
          return {
            ...prev,
            count_down: prev.count_down - 1,
          };
        });
      }, 1000);
      return () => {
        clearInterval(timer_ref.current);
      };
    }, []);

    useEffect(() => {
      count_down_finished && clearInterval(timer_ref.current);
    }, [count_down_finished]);
    return (
      <BaseComponent
        count={count_down}
        is_finished={count_down_finished}
        {...props}
      />
    );
  };
  return EnhancedComponent;
};
export default withCountDownFunctionality;
