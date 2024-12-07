import Button from "@/components/reuseables/CustomButton";
import Filters from "@/components/reuseables/filters";
import TableGlobalSearch from "@/components/reuseables/TableGlobalSearch";
import { categoryFields, mainTabs } from "@/constants";
import { SearchIcon } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/types";
import { useState, useCallback } from "react";
import { setFilters, setSelectedCategory } from "@/redux/features/appSlice";
import { useGetAllStatesQuery } from "@/server/actions/utils";
import { useLocation } from "react-router-dom";

type Props = {
  containerStyles?: string;
  headerTitle?: string;
};

function Hero({ containerStyles, headerTitle }: Props) {
  const location = useLocation();
  const isPolicyPage = location.pathname === "/policy";

  return (
    <div
      className={cn(
        "bg-gradient-hero grid place-items-center max-h-[400px] px-6 py-6 sm:py-4 text-secondary-foreground min-h-[55vh]",
        isPolicyPage && "min-h-[35vh] max-h-[300px]",
        containerStyles
      )}
    >
      <div className="flex-column !items-center gap-5">
        <h1 className="text-white text-center max-w-[20ch]">
          {headerTitle || "Let's help you find what you are looking for"}
        </h1>

        {!isPolicyPage && <FilterSection />}
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
    <div className="row-flex !flex-wrap max-w-xl gap-x-3 gap-y-4 card !p-2">
      <TableGlobalSearch
        hideIcon
        globalValue={searchQuery}
        containerStyles="w-full"
        onChange={(value: string) => setSearchQuery(value)}
      />

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
        placeholder="Select Category"
        options={mainTabs}
        value={selectedCategory}
        setValue={(filter: any) => {
          dispatch(setSelectedCategory(filter));
        }}
        containerStyles="flex-1"
      />

      {selectedCategory && selectedCategory !== "all" && (
        <Filters
          placeholder={`${selectedCategory} type`}
          options={selectedTypeDropdown}
          value={selectedPropertyType}
          setValue={setSelectedPropertyType}
          containerStyles="flex-1"
        />
      )}

      <Button dir="right" icon={SearchIcon} title="Search" onClick={handleSearch} />
    </div>
  );
};
