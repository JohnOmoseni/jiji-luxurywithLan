import { faqs } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionWrapper from "@/layouts/SectionWrapper";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/constants/icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/reuseables/CustomButton";

const FAQS = () => {
  const [value, setValue] = useState("");

  return (
    <SectionWrapper>
      <div className="flex-column !items-center gap-4 sm:gap-7">
        <h2 className="text-center">Frequently Asked Questions</h2>

        <div
          className={cn(
            "row-flex-start gap-1.5 sm:w-full max-w-md bg-background rounded-full border border-border-100 py-2 pl-3.5 pr-2.5 hover:shadow transition"
          )}
        >
          <SearchIcon className="size-5 text-grey" />
          <Input
            value={value}
            placeholder={"Search frequently asked questions..."}
            className="i-reset flex-1 !py-0 !px-1"
            onChange={(e) => setValue(e.target.value)}
          />

          <Button title="Search" className="rounded-full" />
        </div>
      </div>

      <div className="mt-14 card !p-6 mx-auto w-full max-w-[1000px] self-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {faqs.map((item, idx) => (
            <Accordion type="single" collapsible className="w-full" key={idx}>
              <AccordionItem value={`item-${idx}`} className="shadow py-4 pb-5 px-6 rounded-lg">
                <AccordionTrigger className="break-words text-left max-sm:max-w-[60ch]">
                  {item?.label}
                </AccordionTrigger>
                <AccordionContent className="">
                  <p className="text-sm leading-5">{item.value}</p>
                  <p className="mt-3 text-sm leading-5">{item.value}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FAQS;
