import dynamic from "next/dynamic";
// types
import type { FC } from "react";

// mui
import { Box } from "@mui/material";
// emoji library
const Picker = dynamic(()=>import("@emoji-mart/react"),{
  ssr:false
});
// redux
import { useAppSelector } from "@/hooks/redux";
import { showEmoji } from "@/store/slice/common.slice";

interface Props {
  className?: string;
  callback: (data: any) => void;
}
const EmojiPicker: FC<Props> = ({ className, callback }) => {
  const _showEmoji = useAppSelector(showEmoji);
  return (
    <>
      {_showEmoji && (
        <Box className={className}>
          <Picker
            onClickOutside={() => console.log("clicked outside")}
            data={()=>{
              import("@emoji-mart/data").then(({default:data})=>{
                return data;
              })
            }}
            onEmojiSelect={(data: any) => callback(data)}
            theme="light"
            autoFocus={true}
          />
        </Box>
      )}
    </>
  );
};

export default EmojiPicker;
