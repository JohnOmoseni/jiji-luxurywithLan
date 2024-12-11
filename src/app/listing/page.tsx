import { Button } from "@/components/ui/button";
import { filterOptions, sortOptions } from "@/constants";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createSearchParamsHelper } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FiltersType, OptionType } from "@/types";
import { DropdownList } from "@/components/ui/components/DropdownList";
import { useGetMarketItemsQuery } from "@/server/actions/market";
import { toast } from "sonner";

import SectionWrapper from "@/layouts/SectionWrapper";
import Collection from "../_sections/Collection";
import TableGlobalSearch from "@/components/reuseables/TableGlobalSearch";
import FallbackLoader from "@/components/fallback/FallbackLoader";

function Listing() {
  const { data, isError, isFetching, error } = useGetMarketItemsQuery({});
  const listings = data?.data?.data;

  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [state]);

  const [sort, setSort] = useState("title-atoz");
  const [filters, setFilters] = useState<FiltersType>({});
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>(listings || []);
  const [_currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (isError) {
      const message = (error as any)?.message;
      toast.error(message || "Error fetching listings");
    }
  }, [isError]);

  useEffect(() => {
    const storedFilters = sessionStorage.getItem("filters");
    setFilters(storedFilters ? JSON.parse(storedFilters) : {});
  }, []);

  useEffect(() => {
    if (listings && listings?.length > 0) {
      let filtered = [...listings];

      if (searchValue.trim()) {
        filtered = filtered.filter((item) =>
          ["title", "type", "location"].some((key) =>
            item[key]?.toString().toLowerCase().includes(searchValue.toLowerCase())
          )
        );
      }

      // Apply filters from state
      Object.keys(filters).forEach((key) => {
        if (filters[key]?.length > 0) {
          filtered = filtered.filter((item) =>
            filters[key].some((filterValue: string) => item[key] === filterValue)
          );
        }
      });

      if (sort === "title-atoz") {
        filtered?.sort((a, b) => a.name?.localeCompare(b.name));
      } else if (sort === "title-ztoa") {
        filtered?.sort((a, b) => b.name?.localeCompare(a.name));
      } else if (sort === "price-lowhigh") {
        filtered.sort((a, b) => parseFloat(a?.actual_amount) - parseFloat(b?.actual_amount));
      } else if (sort === "price-highlow") {
        filtered.sort((a, b) => parseFloat(b?.actual_amount) - parseFloat(a?.actual_amount));
      }

      setFilteredData(filtered);
      setCurrentPage(1); // Reset to the first page
    }
  }, [filters, searchValue, sort, data]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);

  console.log("[MARKET]", listings, filteredData);

  return (
    <SectionWrapper
      customHeaderComponent={
        <div className="flex-1 hidden md:row-flex relative">
          <TableGlobalSearch
            globalValue={searchValue}
            onChange={(value) => setSearchValue(value)}
          />
        </div>
      }
    >
      <div className="flex-column md:row-flex !items-start gap-6 md:gap-8">
        <aside className="w-full md:w-64 space-y-4 md:mt-14">
          <Aside filters={filters} setFilters={setFilters} />
        </aside>

        <section className="flex-1 flex-column w-full gap-3">
          <div className="row-flex-btwn gap-4">
            <h2 className="">{state ? `Listings in ${state}` : "Listings"}</h2>

            <DropdownList
              value={sort}
              list={sortOptions}
              handleChange={(value) => setSort(value)}
              trigger={
                <Button variant="outline" size="sm" className="row-flex gap-1.5 p-3">
                  <ArrowUpDownIcon className="size-3" />
                  <span className="text-base font-medium mt-1">Sort By</span>
                </Button>
              }
            />
          </div>

          {isFetching ? (
            <div className="relative h-[50vh] max-h-[300px]">
              <FallbackLoader loading={isFetching} />
            </div>
          ) : (
            <Collection
              data={filteredData}
              emptyTitle="No Listings found"
              emptySubText={
                searchValue ? `No listings found matching your search criteria.` : "Post an advert"
              }
              emptyContainerStyles="h-[30vh] md:h-[75vh]"
            />
          )}
        </section>
      </div>
    </SectionWrapper>
  );
}

export default Listing;

const Aside = ({
  filters,
  setFilters,
}: {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}) => {
  const [_searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const buildQueryStringForFilters = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [filters]);

  const handleFilterOnChange = (key: string, option: OptionType) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (!updatedFilters[key]) {
        updatedFilters[key] = [];
      }

      const optionIndex = updatedFilters[key].indexOf(option.value);

      if (optionIndex === -1) {
        updatedFilters[key].push(option.value);
      } else {
        updatedFilters[key].splice(optionIndex, 1);
      }

      sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  };

  return (
    <>
      <h3 className="p-2.5 bg-secondary text-white rounded-t-lg font-semibold">Categories</h3>

      <div className="pl-2">
        {Object.keys(filterOptions).map((key) => (
          <div className="pb-8" key={key}>
            <h3 className="uppercase font-semibold mb-3">{key}</h3>

            <div className="flex-column gap-3 mt-2">
              {filterOptions[key]?.map((option) => (
                <Label key={option.value} className="row-flex-start gap-3">
                  <Checkbox
                    checked={filters[key]?.includes(option.value) || false}
                    onCheckedChange={() => handleFilterOnChange(key, option)}
                  />
                  <span className="mt-1">{option.label}</span>
                </Label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
