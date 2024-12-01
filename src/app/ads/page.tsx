import { toast } from "sonner";
import { NoSearch, Plus } from "@/constants/icons";
import { useEffect, useState } from "react";
import { useGetAllListingsQuery } from "@/server/actions/listing";
import { useNavigate } from "react-router-dom";
import Button from "@/components/reuseables/CustomButton";
import SectionWrapper from "@/layouts/SectionWrapper";
import Collection from "../_sections/Collection";
import TableGlobalSearch from "@/components/reuseables/TableGlobalSearch";
import FallbackLoader from "@/components/fallback/FallbackLoader";

function Ads() {
  const { data, isError, isLoading, error } = useGetAllListingsQuery({});
  const [searchValue, setSearchValue] = useState("");
  const listings = data?.data?.data;

  console.log("[MY ADS]", listings);

  useEffect(() => {
    if (isError) {
      const message = (error as any)?.message;
      toast.error(message || "Error fetching data");
    }
  }, [isError]);

  return (
    <SectionWrapper
      customHeaderComponentStyles={
        <div className="flex-1 row-flex relative md:left-[10%]">
          <TableGlobalSearch
            globalValue={searchValue}
            onChange={(value) => setSearchValue(value)}
          />
        </div>
      }
    >
      <div className="card !p-6 max-w-6xl mx-auto">
        {isLoading ? (
          <div className="relative h-[50vh] max-h-[300px]">
            <FallbackLoader loading={isLoading} />
          </div>
        ) : (
          <div className="flex-column gap-4">
            {listings && listings?.length > 0 && <h2 className="text-xl">Postings</h2>}

            <Collection
              data={listings}
              collectionType="My_Listing"
              emptyListElement={<EmptyList />}
            />
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

export default Ads;

const EmptyList = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-column gap-5 !items-center">
      <NoSearch className="w-fit h-fit" />
      <h2 className="text-xl text-center">There are no posts yet. Create new one below!</h2>
      <Button
        icon={Plus}
        title="Post Ad"
        className="group-hover:scale-95 mt-4"
        onClick={() => navigate("/ads/post")}
      />
    </div>
  );
};
