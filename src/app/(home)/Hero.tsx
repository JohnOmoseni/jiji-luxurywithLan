import Button from "@/components/reuseables/CustomButton";
import Filters from "@/components/reuseables/filters";
import TableGlobalSearch from "@/components/reuseables/TableGlobalSearch";
import { categoryFields, mainTabs } from "@/constants";
import { SearchIcon } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/types";
import { useState, useCallback, useEffect } from "react";
import { setFilters, setSelectedCategory } from "@/redux/features/appSlice";
import { useGetAllStatesQuery } from "@/server/actions/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
  containerStyles?: string;
  refetch?: () => void;
};

function Hero({ containerStyles, refetch }: Props) {
  const location = useLocation();
  const isPolicyPage = location.pathname === "/policy";
  const words = ["Vehicles", "Houses", "Lands", "Hotels"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 500); // Half a second for the transition
    }, 3000); // Total duration for each word

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={cn(
        "bg-gradient-hero grid place-items-center max-h-[400px] px-6 py-6 sm:py-4 text-secondary-foreground min-h-[55vh]",
        isPolicyPage && "min-h-[35vh] max-h-[300px]",
        containerStyles
      )}
    >
      <div className="flex-column !items-center gap-8">
        <div className="text-white text-center">
          <h1 className="">Let's help you find</h1>
          <div className="h-[40px] overflow-hidden">
            <h1
              className={cn(
                "block transition-transform duration-500",
                isAnimating && "transform translate-y-full"
              )}
            >
              {words[currentWordIndex]}
            </h1>
          </div>
        </div>

        {!isPolicyPage && <FilterSection refetch={refetch} />}
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

const FilterSection = ({ refetch }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
      category: selectedCategory !== "all" ? selectedCategory : "",
    };

    // Check if at least one filter has a value
    const hasActiveFilters = Object.values(filters).some(
      (value) => value !== "" && value !== undefined && value !== null
    );

    if (!hasActiveFilters) {
      toast.warning("Please select at least one filter");
      return;
    }

    // Create query string from filters, only including non-empty values
    const queryParams = new URLSearchParams();

    if (searchQuery) queryParams.set("q", searchQuery);
    if (selectedLocation) queryParams.set("location", selectedLocation);
    if (selectedType) queryParams.set("type", selectedType);
    if (selectedCategory && selectedCategory !== "all") {
      queryParams.set("main_category", selectedCategory);
    }
    if (selectedPropertyType) queryParams.set("sub_category", selectedPropertyType);

    // Only proceed if we have any query parameters
    if (queryParams.toString()) {
      navigate(`${window.location.pathname}?${queryParams.toString()}`);
      refetch?.();
      dispatch(setFilters(filters));
    }
  }, [
    selectedType,
    selectedLocation,
    selectedPropertyType,
    searchQuery,
    selectedCategory,
    navigate,
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
