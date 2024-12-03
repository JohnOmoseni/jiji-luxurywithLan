import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Header from "./Header";

type Props = {
  children: ReactNode;
  mainContainerStyles?: string;
  customHeaderComponentStyles?: any;
};

const SectionWrapper = ({ children, mainContainerStyles, customHeaderComponentStyles }: Props) => {
  return (
    <>
      <Header customHeaderComponentStyles={customHeaderComponentStyles} />

      <main
        className={cn("w-full py-6 px-3.5 min-h-[50vh] sm:pt-[4%] sm:px-[4%]", mainContainerStyles)}
      >
        {children}
      </main>
    </>
  );
};

export default SectionWrapper;
