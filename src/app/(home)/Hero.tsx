import Button from "@/components/reuseables/CustomButton";
import Filters from "@/components/reuseables/filters";
import TableGlobalSearch from "@/components/reuseables/TableGlobalSearch";
import { categoryFields } from "@/constants";
import { SearchIcon } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/types";
import { useState, useCallback } from "react";
import { setFilters } from "@/redux/features/appSlice";
import { useGetAllStatesQuery } from "@/server/actions/utils";

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
  const dispatch = useAppDispatch();
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedCategory } = useAppSelector((state) => state.appState);
  const { data: states } = useGetAllStatesQuery({});

  const selectedTypeDropdown =
    categoryFields[selectedCategory]?.find((field) => field.name.includes("type"))?.options || [];

  const handleSearch = useCallback(() => {
    const filters = {
      type: selectedType,
      location: selectedLocation,
      propertyType: selectedPropertyType,
      searchQuery,
      category: selectedCategory,
    };

    dispatch(setFilters(filters));
  }, [
    selectedType,
    selectedLocation,
    selectedPropertyType,
    searchQuery,
    selectedCategory,
    dispatch,
  ]);

  return (
    <div className="row-flex !flex-wrap gap-x-3 gap-y-4 card !p-2">
      <TableGlobalSearch
        hideIcon
        globalValue={searchQuery}
        containerStyles="max-[480px]:w-full"
        onChange={(value: string) => setSearchQuery(value)}
      />

      <div className="row-flex !flex-wrap gap-3">
        <Filters
          placeholder="For rent"
          options={listingTypes}
          value={selectedType}
          setValue={setSelectedType}
          containerStyles="flex-1"
        />
        <Filters
          placeholder="Location"
          options={states}
          value={selectedLocation}
          setValue={setSelectedLocation}
          containerStyles="flex-1"
        />
        <Filters
          placeholder={`${selectedCategory} type`}
          options={selectedTypeDropdown}
          value={selectedPropertyType}
          setValue={setSelectedPropertyType}
          containerStyles="flex-1"
        />
      </div>

      <Button dir="right" icon={SearchIcon} title="Search" onClick={handleSearch} />
    </div>
  );
};
