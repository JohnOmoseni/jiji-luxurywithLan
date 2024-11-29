import { profile } from "@/constants/icons";

function ChatHeading() {
  return (
    <div className="relative z-30 w-full px-3 py-2 border-b border-border-100">
      <div className="row-flex-start gap-3">
        <div className="relative size-12 rounded-full overflow-hidden border border-border-100 p-0.5 shadow-sm drop-shadow-md">
          <img src={profile} alt="" className="size-full object-cover" />
        </div>

        <h3 className="flex-column flex-1 text-lg leading-4 font-semibold">
          Henry Dholi
          <span className="mt-1 text-sm font-medium text-grey">Reply to message</span>
        </h3>
      </div>
    </div>
  );
}
export default ChatHeading;
