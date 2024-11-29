import { mainTabs } from "@/constants";
import { KeyboardArrowDown, KeyboardArrowRight, property_image } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAppDispatch } from "@/types";
import { setSelectedCategory } from "@/redux/features/appSlice";
import Collection from "../_sections/Collection";

function Main({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useAppDispatch();

  const changeTab = (id: number) => {
    setActiveTab(id);

    dispatch(setSelectedCategory(mainTabs[id]?.value));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[minmax(auto,_200px),_1fr] gap-x-8 gap-y-6">
      <Aside activeTab={activeTab} changeTab={changeTab} />

      <div className="flex-column gap-8 max-sm:mt-12">
        <div className="bg-secondary rounded-xl shadow">
          <div className="grid grid-cols-1 sm:grid-cols-[minmax(160px,_320px),_1fr] gap-3">
            <div className="h-[60vh] max-h-[330px] relative">
              <img
                src={property_image}
                alt=""
                className="absolute w-full max-w-[500px] h-[380px] right-0 bottom-0"
              />
            </div>

            <div className="flex-column gap-5 text-secondary-foreground self-center p-4 md:p-6">
              <h2 className="text-white">Lorem Ipssum</h2>
              <p className="text-base font-light leading-6 max-w-[50ch] pr-1 line-clamp-6">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos dolores quas quo
                itaque? Placeat vero totam dolorum eius a laboriosam dolore mollitia! Eligendi cum
                temporibus veniam atque voluptas sint doloribus! Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Eos dolores quas quo itaque? Placeat vero totam
              </p>
            </div>
          </div>
        </div>

        <div className="flex-column gap-4 mt-4">
          <h2>Trending Posts</h2>

          <Collection
            data={data}
            containerStyles="sm:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]"
          />
        </div>
      </div>
    </div>
  );
}

export default Main;

const Aside = ({
  activeTab,
  changeTab,
}: {
  activeTab: number;
  changeTab: (id: number) => void;
}) => {
  return (
    <aside className="flex-column gap-4 capitalize py-1">
      {mainTabs?.map((tab, idx) => {
        return (
          <div
            className={cn(
              "row-flex-start bg-background py-1.5 px-3 rounded-lg gap-2 transition cursor-pointer",
              activeTab === idx && "text-foreground-variant shadow-sm"
            )}
            key={idx}
            onClick={() => changeTab(idx)}
          >
            {tab?.icon && (
              <tab.icon
                className={cn(
                  "size-5 fill-foreground-100",
                  activeTab === idx && "fill-secondary font-semibold",
                  (tab?.label === "Houses" || tab?.label === "Hotels") && "size-4"
                )}
              />
            )}

            <p
              className={cn(
                "min-[360px]:whitespace-nowrap flex-1 leading-3 mt-0.5",
                activeTab === idx && "text-foreground-variant font-semibold"
              )}
            >
              {tab?.label}
            </p>

            {activeTab === idx ? (
              <KeyboardArrowDown className="size-6 text-secondary" />
            ) : (
              <KeyboardArrowRight className="size-5 fill-foreground-100" />
            )}
          </div>
        );
      })}
    </aside>
  );
};
