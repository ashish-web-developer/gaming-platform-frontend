import dynamic from "next/dynamic";
import { useRef ,useEffect} from "react";
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
  const ref = useRef<HTMLDivElement>();
  const _showEmoji = useAppSelector(showEmoji);
  const handleClickOutSide = (event)=>{
    if(!ref.current?.contains(event.target)){
      console.log("clicked outside");
    }
  }

  useEffect(()=>{
    document.addEventListener("mousedown",handleClickOutSide);
    return ()=>{
      document.removeEventListener("mousedown",handleClickOutSide);
    }
  },[])
  return (
    <>
      {_showEmoji && (
        <Box
         ref = {ref}
         className={className}
         >
          <Picker
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
