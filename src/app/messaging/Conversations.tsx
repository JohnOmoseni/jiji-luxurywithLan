import dayjs from "dayjs";
import { profile } from "@/constants/icons";
import { ConversationsSkeleton } from "@/components/fallback/SkeletonLoader";
import { useAppDispatch } from "@/types";
import { setSelectedChat } from "@/redux/features/chatSlice";

function Conversations({
  userChats,
  listing,
  isLoading = false,
}: {
  userChats: any;
  isLoading?: boolean;
  listing?: any;
}) {
  return (
    <div className="size-full relative">
      {isLoading ? (
        <ConversationsSkeleton />
      ) : (
        <>
          <div className="row-flex-btwn gap-4 py-3 px-3 border-b border-border-100 min-h-[66px]">
            <h3 className="flex-column flex-1 leading-4 font-semibold">Messages</h3>
          </div>

          {Array.isArray(userChats) && userChats.length === 0 ? (
            <div className="grid place-items-center h-[70%]">
              <p className="text-shadow text-center text-neutral-500">No Conversations</p>
            </div>
          ) : (
            <ul className="flex-column gap-6 bg-background-100 w-full py-4 px-3 overflow-y-auto relative remove-scrollbar">
              {userChats
                ?.sort(
                  (a: any, b: any) => dayjs(b.updated_at).valueOf() - dayjs(a.updated_at).valueOf()
                )
                .map((chat: any, idx: number) => (
                  <ChatRow key={idx} chat={chat} listing={listing} />
                ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
export default Conversations;

const ChatRow = ({ chat, listing }: { chat: any; listing?: any }) => {
  const dispatch = useAppDispatch();

  const handleChatSelect = () => {
    dispatch(setSelectedChat(chat));
  };

  const user = {
    id: chat?.property_owner?.id,
    listingTitle: listing?.name,
    name: chat?.property_owner?.name || "Unknown",
    avatar: chat?.property_owner?.profile_picture || profile,
    lastMessage: chat?.last_message?.message,
    date: dayjs(chat?.last_message?.updated_at).format("DD MMM"),
  };

  return (
    <li
      className="group w-full py-2 px-2 rounded-md grid grid-cols-[max-content,1fr] gap-2 items-center bg-background hover:bg-background-200 transition-colors shadow-sm border border-border-100 cursor-pointer"
      onClick={handleChatSelect}
    >
      <div className="relative w-10 rounded-full clip-circle">
        <img src={user?.avatar} alt="" className="size-full object-cover" />
      </div>

      <div className="flex-column gap-0.5 w-full">
        <div className="row-flex-btwn gap-3">
          <p className="font-semibold leading-5 truncate text-xs">{user?.name}</p>
          <span className="text-grey text-[0.6rem] leading-3 text-center w-max">{user?.date}</span>
        </div>

        <h3 className="line-clamp-1 font-semibold">{user?.listingTitle} </h3>

        {user?.lastMessage && <p className="text-xs truncate mt-1">{user?.lastMessage}</p>}
      </div>
    </li>
  );
};
