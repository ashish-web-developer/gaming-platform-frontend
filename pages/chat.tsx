// types
import type { NextPage } from "next";
import type Colors from "@/types/data/colors";

// Local components
import ChatContainer from "@/components/chat/chat-container";

// helpers package
import fs from "fs";
import path from "path";

// styled component
import { GlobalStyles } from "@/styles/pages/chat.style";

const Chat: NextPage<{ colors: Colors }> = ({ colors }) => {
  return (
    <>
      <GlobalStyles />
      <ChatContainer colors={colors} />
    </>
  );
};

export const getStaticProps = async () => {
  const dataFolderPath = path.join(process.cwd(), "./data/colors.json");
  let colors = fs.readFileSync(dataFolderPath, "utf-8");
  colors = JSON.parse(colors);
  return {
    props: {
      colors,
    },
  };
};

export default Chat;
