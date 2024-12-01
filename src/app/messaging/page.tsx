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
      <div className="flex-column sm:flex-row h-dvh w-full max-w-4xl mx-auto border border-border-100 rounded-md relative overflow-hidden">
        <aside
          className={cn(
            "w-full sm:w-64 md:w-[400px] sm:border-r border-border-100",
            "absolute sm:relative inset-0",
            "transition-transform duration-300 ease-in-out",
            selectedChat ? "-translate-x-full sm:translate-x-0" : "translate-x-0"
          )}
        >
          <Conversations userChats={chatList} isLoading={fetchingConversations} />
        </aside>

        <div
          className={cn(
            "flex-column min-w-[320px] size-full overflow-hidden",
            "absolute sm:relative inset-0",
            "transition-transform duration-300 ease-in-out",
            selectedChat ? "translate-x-0" : "translate-x-full sm:translate-x-0"
          )}
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
