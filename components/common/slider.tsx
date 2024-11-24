// types
import { FC } from "react";

// styled components
import {
  StyledLabel,
  StyledSliderInput,
} from "@/styles/components/common/slider.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { mode, updateMode } from "@/store/slice/common.slice";

const Slider: FC = () => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  return (
    <>
      <StyledSliderInput
        onChange={(event) => {
          const is_checked = event.target.checked;
          dispatch(updateMode(is_checked ? "light" : "dark"));
        }}
        checked={_mode == "light" ? true : false}
        id="slider-input"
        type="checkbox"
      />
      <StyledLabel
        className="animation"
        $mode={_mode}
        htmlFor="slider-input"
      ></StyledLabel>
    </>
  );
};

export default Slider;
