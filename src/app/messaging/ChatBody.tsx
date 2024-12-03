import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/types";
import { ChatProps } from "@/types/api.types";

import { setChatLog } from "@/redux/features/chatSlice";
import { useAuth } from "@/context/AuthContext";

import Chat from "./Chat";

function ChatBody({ chats }: { chats: any }) {
  const { chatLog, selectedChat } = useAppSelector((state) => state.chat);
  const { user } = useAuth();

  const dispatch = useAppDispatch();
  const elemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chats && chats.length > 0) {
      const chatArray = chats
        ?.map((chat: any) => ({
          type: "msg",
          chat_id: chat?.chat_id,
          message: chat?.message,
          images: chat?.attachments ? chat?.attachments?.map((i: any) => i?.url) : null,
          incoming: chat?.user_id !== user?.userId,
          outgoing: chat?.user_id === user?.userId,
          timestamp: chat?.updated_at,
        }))
        .sort(
          (a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

      dispatch(setChatLog(chatArray));
    }
  }, [chats, user?.userId]);

  useEffect(() => {
    elemRef?.current && elemRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatLog]);

  return (
    <div className="relative flex size-full flex-1 flex-col overflow-hidden bg-background shadow-inner">
      <div className="size-full overflow-y-auto px-3 pb-2 pt-4">
        {selectedChat &&
          chatLog?.length > 0 &&
          chatLog?.map((chat: any, idx: number) => {
            if ("timestamp" in chat) {
              return <Chat key={chat.timestamp} chat={chat} />;
            } else if (!("loading" in chat) || !chat.loading) {
              // Handle other cases or return null if necessary
              return <Chat key={idx} chat={chat as ChatProps} />;
            }
          })}

        <div ref={elemRef} className="size-1" />
      </div>
    </div>
  );
}
export default ChatBody;
