import Button from "@/components/reuseables/CustomButton";
import Filters from "@/components/reuseables/filters";
import TableGlobalSearch from "@/components/reuseables/TableGlobalSearch";
import { categoryFields, locationCategories, vehicleCategories } from "@/constants";
import { SearchIcon } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/types";
import { useState } from "react";

type Props = {
  containerStyles?: string;
};

function Hero({ containerStyles }: Props) {
  return (
    <div
      className={cn(
        "bg-gradient-hero grid place-items-center max-h-[400px] px-6 py-6 sm:py-4 text-secondary-foreground min-h-[55vh]",
        containerStyles
      )}
    >
      <div className="flex-column !items-center gap-5">
        <h1 className="text-white text-center">What are you looking for?</h1>

        <FilterSection />
      </div>
    </div>
  );
}

export default Hero;

const listingTypes = [
  { label: "For Rent", value: "rent" },
  { label: "For Sale", value: "sale" },
  { label: "For Hire", value: "sale" },
  { label: "For Lease", value: "lease" },
  { label: "Shortlet", value: "shortlet" },
];

const FilterSection = () => {
  const [value, setValue] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const { selectedCategory } = useAppSelector((state) => state.appState);

  const selectedTypeDropdown =
    categoryFields[selectedCategory]?.find((field) => field.name.includes("type"))?.options || [];

  return (
    <div className="row-flex !flex-wrap gap-x-3 gap-y-4 card !p-2">
      <TableGlobalSearch
        hideIcon
        globalValue={globalFilter || ""}
        containerStyles="max-[480px]:w-full"
        onChange={(value: string) => setGlobalFilter(value)}
      />

      <div className="row-flex !flex-wrap gap-3">
        <Filters
          placeholder="For rent"
          options={listingTypes}
          value={value}
          setValue={setValue}
          containerStyles="flex-1"
        />
        <Filters
          placeholder="Location"
          options={locationCategories}
          value={value}
          setValue={setValue}
          containerStyles="flex-1"
        />
        <Filters
          placeholder={`${selectedCategory} type`}
          options={selectedTypeDropdown}
          value={value}
          setValue={setValue}
          containerStyles="flex-1"
        />
      </div>

      <Button dir="right" icon={SearchIcon} title="Search" onClick={() => null} />
    </div>
  );
};
