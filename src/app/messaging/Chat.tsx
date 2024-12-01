import { cn } from "@/lib/utils";
import { useRef } from "react";
import dayjs from "dayjs";
import { BeatLoader } from "react-spinners";

function Chat({ chat }: { chat: any }) {
  const you = chat?.outgoing;
  const other = chat?.incoming;
  const isLoading = chat?.loading;
  // @ts-ignore
  const error = chat?.error;

  const elemRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={elemRef}
      className={`group relative mt-4 mb-8 flex w-full items-center first:mt-2 last:mb-7 ${
        you ? "flex-row-reverse" : "flex-row"
      } !justify-start`}
    >
      <div
        className={cn(
          "relative w-max max-w-[50%] bg-opacity-80 px-4",
          you
            ? "rounded-s-md rounded-ee-lg bg-secondary text-foreground-variant"
            : `bg-slate-100 rounded-r-md rounded-es-lg `,
          isLoading ? "py-1.5" : "py-2.5 pl-3"
        )}
      >
        {isLoading ? (
          <BeatLoader size={7} color={"#282828"} />
        ) : (
          <>
            <p
              className={`${
                other ? "text-foreground" : "text-background"
              } break-words text-base leading-5`}
            >
              {chat?.message}
            </p>

            {Array.isArray(chat?.images) &&
              chat?.images?.length > 0 &&
              chat.images.map((img: string, idx: number) => (
                <div key={idx} className="my-2 rounded-sm max-h-[180px] overflow-hidden">
                  <img src={img} alt="" />
                </div>
              ))}
          </>
        )}
      </div>

      <div
        className={`chat-timestamp absolute top-full mt-1.5 text-xs font-light text-grey ${
          you ? "right-2" : "left-2"
        }`}
      >
        {chat?.timestamp && dayjs(chat.timestamp).format("h:mmA").toLowerCase()}
      </div>
    </div>
  );
}
export default Chat;
