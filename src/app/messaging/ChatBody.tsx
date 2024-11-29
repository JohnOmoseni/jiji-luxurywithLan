import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/types";
import { ChatProps } from "@/types/api.types";
import { useFetchChatMsgsQuery } from "@/server/actions/messaging";
import { setChatLog } from "@/redux/features/chatSlice";
import { useAuth } from "@/context/AuthContext";
import { BeatLoader } from "react-spinners";
import Chat from "./Chat";
import FallbackLoader from "@/components/fallback/FallbackLoader";

function ChatBody() {
  const { chatLog } = useAppSelector((state) => state.chat);
  const { data, isLoading } = useFetchChatMsgsQuery({});
  const { user } = useAuth();

  console.log("LOGS", chatLog);

  // const isLoading = true;

  const dispatch = useAppDispatch();
  const elemRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const chatArray = data?.map((chat: any) => ({
  //     type: "msg",
  //     chat_id: chat?.chat_id,
  //     message: chat?.message,
  //     image: chat?.attachments,
  //     incoming: chat?.sender === "me" ? false : true,
  //     outgoing: chat?.sender === "me" ? true : false,
  //     timestamp: chat?.updated_at,
  //   }));

  //   dispatch(setChatLog(chatArray || []));
  // }, [data]);

  useEffect(() => {
    elemRef?.current && elemRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatLog]);

  return (
    <div className="relative flex size-full flex-1 flex-col overflow-hidden bg-background shadow-inner">
      {isLoading ? (
        <div className="relative h-full">
          <FallbackLoader
            hideLabel
            spinner={<BeatLoader size={10} color={"#282828"} />}
            loading={isLoading}
          />
        </div>
      ) : (
        <div className="size-full overflow-y-auto px-3 pb-2 pt-4">
          {chatLog?.length > 0 &&
            chatLog?.map((chat, idx) => {
              if ("timestamp" in chat) {
                return <Chat key={chat.timestamp} chat={chat} />;
              } else if (!("loading" in chat) || !chat.loading) {
                // Handle other cases or return null if necessary
                return <Chat key={idx} chat={chat as ChatProps} />;
              }
            })}

          <div ref={elemRef} className="size-1" />
        </div>
      )}
    </div>
  );
}
export default ChatBody;
