import { ArrowBack, profile } from "@/constants/icons";
import { setSelectedChat } from "@/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/types";

function ChatHeading() {
  const { selectedChat } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  if (!selectedChat) {
    return (
      <div className="border-b border-border-100 px-4 py-3">
        <p className="text-grey">Select a conversation to start messaging</p>
      </div>
    );
  }

  return (
    <div className="border-b border-border-100 px-4 py-3">
      <div className="row-flex gap-1">
        <ArrowBack className="icon size-4" onClick={() => dispatch(setSelectedChat(null))} />

        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src={selectedChat?.property_owner?.profile_picture || profile}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-column flex-1 ml-1.5">
          <h3 className="font-semibold leading-4">{selectedChat?.property_owner?.name}</h3>
          <p className="text-sm text-grey">{selectedChat?.property_owner?.phone} </p>
        </div>
      </div>
    </div>
  );
}
export default ChatHeading;
