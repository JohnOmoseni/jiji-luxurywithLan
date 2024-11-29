import SectionWrapper from "@/layouts/SectionWrapper";
import ChatBody from "./ChatBody";
import ChatHeading from "./ChatHeading";
import ChatInput from "./ChatInput";
import Conversations from "./Conversations";

export default function Messaging() {
  return (
    <SectionWrapper mainContainerStyles="!px-2 !py-3">
      <div className="flex-column sm:flex-row h-dvh w-full max-w-4xl mx-auto border border-border-100 rounded-md">
        <aside className="w-full sm:w-64 md:w-[400px]  sm:border-r border-border-100">
          <Conversations />
        </aside>

        <div className="flex-column min-w-[320px] size-full overflow-hidden">
          <ChatHeading />
          <ChatBody />
          <ChatInput />
        </div>
      </div>
    </SectionWrapper>
  );
}
