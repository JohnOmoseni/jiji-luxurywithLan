import { cn } from "@/lib/utils";
import { BeatLoader } from "react-spinners";

export function ChatLoader() {
  return (
    <div
      className={cn(
        "relative row-flex mt-4 w-[100px] max-w-[30%] rounded-r-md rounded-es-lg bg-opacity-80 px-3.5 py-2 shadow-sm last:mb-2"
      )}
    >
      <BeatLoader size={10} color={"#282828"} />
    </div>
  );
}
export default ChatLoader;
