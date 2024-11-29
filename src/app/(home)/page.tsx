import { useGetMarketItemsQuery } from "@/server/actions/market";
import { useEffect } from "react";
import { toast } from "sonner";
import Hero from "./Hero";
import Main from "./Main";
import Header from "@/layouts/Header";
import FallbackLoader from "@/components/fallback/FallbackLoader";

function Home() {
  const { data, isError, isLoading, error } = useGetMarketItemsQuery({});
  const markets = data?.data?.data;

  console.log("[MARKET]", markets);

  useEffect(() => {
    if (isError) {
      const message = (error as any)?.message;
      toast.error(message || "Error fetching data");
    }
  }, [isError]);

  return (
    <>
      <Header />
      <Hero />

      <main className="w-full py-4 px-4 sm:pt-16 sm:px-[8%]">
        {isLoading ? (
          <div className="relative h-[50vh] max-h-[300px]">
            <FallbackLoader loading={isLoading} />
          </div>
        ) : (
          <Main data={markets} />
        )}
      </main>
    </>
  );
}

export default Home;
