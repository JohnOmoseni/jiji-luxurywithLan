import { profile } from "@/constants/icons";
import { useState } from "react";

function Conversations() {
  const [usersChat, setUsersChat] = useState<any>([]);

  return (
    <div className="w-full relative">
      <div className="row-flex-btwn gap-4 py-3 px-3 border-b border-border-100 min-h-[66px]">
        <h3 className="flex-column flex-1 leading-4 font-semibold">Messages</h3>
      </div>

      {/* {Object.entries(usersChat).length > 0 ? (
        <ul className="flex-column gap-6">
          {Object.entries(usersChat)
            ?.sort((a, b) => b?.date - a?.date)
            ?.map((chat, idx) => {
              return (
                <ChatRow key={idx} chat={chat}
                />
              );
            })}
        </ul>
      ) : (
        <p className="text-shadow text-center text-neutral-500">No Conversations</p>
      )} */}

      <ul
        className={`${
          Object.entries(usersChat).length === 4 ? "grid place-items-center" : "flex-column gap-3"
        } w-full py-4 px-3 overflow-y-auto relative remove-scrollbar`}
      >
        {Array.from({ length: 5 }).map((chat, idx) => {
          return <ChatRow key={idx} chat={chat} />;
        })}
      </ul>
    </div>
  );
}
export default Conversations;

const ChatRow = ({ chat }: { chat: any }) => {
  const lastMessage = "Yes";

  return (
    <li
      className="group w-full py-2 px-2 rounded-md grid grid-cols-[max-content,1fr] gap-3 items-center bg-background hover:bg-background-200 transition-colors shadow-sm border border-border-100 cursor-pointer"
      onClick={() => null}
    >
      <div className="relative w-10 rounded-full ">
        <img src={profile} alt="" className="size-full" />
      </div>

      <div className="flex-column gap-0.5 w-full">
        <div className="row-flex-btwn gap-3">
          <p className="font-semibold leading-5 truncate text-xs">Natty Shedrack</p>
          <span className="text-grey text-[0.6rem] leading-3 text-center w-max">21 Nov</span>
        </div>

        <h3 className="line-clamp-1 text-base font-semibold">Lexus GS 2002 Silver </h3>

        {lastMessage && <p className="text-xs truncate mt-0.5">{lastMessage}</p>}
      </div>
    </li>
  );
};
