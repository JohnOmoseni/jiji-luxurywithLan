import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Header from "./Header";

type Props = {
  children: ReactNode;
  mainContainerStyles?: string;
  customHeaderComponent?: any;
  customActionHeaderButton?: any;
};

const SectionWrapper = ({
  children,
  mainContainerStyles,
  customHeaderComponent,
  customActionHeaderButton,
}: Props) => {
  return (
    <>
      <Header
        customHeaderComponent={customHeaderComponent}
        customActionHeaderButton={customActionHeaderButton}
      />

      <main
        className={cn("w-full py-6 px-3.5 min-h-[60vh] sm:pt-[4%] sm:px-[4%]", mainContainerStyles)}
      >
        {children}
      </main>
    </>
  );
};

export default SectionWrapper;
