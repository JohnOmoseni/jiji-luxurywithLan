import SectionWrapper from "@/layouts/SectionWrapper";
import ChatBody from "./ChatBody";
import ChatHeading from "./ChatHeading";
import ChatInput from "./ChatInput";
import Conversations from "./Conversations";
import { useFetchChatMsgsQuery, useGetAllChatsQuery } from "@/server/actions/messaging";
import { useEffect } from "react";
import { toast } from "sonner";
import { ChatSkeletonLoader } from "@/components/fallback/SkeletonLoader";
import { useAppSelector } from "@/types";
import { cn } from "@/lib/utils";

export default function Messaging() {
  const { selectedChat } = useAppSelector((state) => state.chat);

  const {
    data: chatListData,
    isLoading: fetchingConversations,
    isError,
    error,
  } = useGetAllChatsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: chatMsgs, isLoading: isFetchingChatMsgs } = useFetchChatMsgsQuery(
    { chat_id: selectedChat?.id },
    {
      skip: !selectedChat,
    }
  );

  const chatList = chatListData?.data?.data || [];
  const chats = chatMsgs?.data?.data || [];

  useEffect(() => {
    if (isError) {
      const errorMessage = error instanceof Error ? error.message : "Error fetching conversations";
      toast.error(errorMessage);
    }
  }, [isError, error]);

  if (process.env.NODE_ENV === "development") {
    console.log("[USER CHATS]", chatList, chats);
  }

  if (isError) {
    return (
      <SectionWrapper mainContainerStyles="!px-2 !py-3">
        <div className="flex items-center justify-center h-[80vh]">
          <p>Failed to load messages. Please try again later.</p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper mainContainerStyles="!px-2 !py-3">
      <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] h-[83dvh] sm:h-full w-full max-w-5xl mx-auto border border-border-100 rounded-md overflow-x-hidden overflow-y-auto remove-scrollbar">
        <aside
          className={cn(
            "w-full h-full sm:w-64 md:w-[360px] sm:border-r border-border-100 bg-background",
            selectedChat ? "hidden sm:block" : "block"
          )}
        >
          <Conversations userChats={chatList} isLoading={fetchingConversations} />
        </aside>

        <div
          className={cn("w-full h-full bg-background", selectedChat ? "block" : "hidden sm:block")}
        >
          {isFetchingChatMsgs ? (
            <ChatSkeletonLoader />
          ) : (
            <>
              <ChatHeading />
              <ChatBody chats={chats} />
              <ChatInput />
            </>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
