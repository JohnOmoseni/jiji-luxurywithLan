import { cn, formatRelativeTime } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useGetAllReviewsQuery } from "@/server/actions/reviews";
import { NoSearch, profile, ReviewStar } from "@/constants/icons";
import SectionWrapper from "@/layouts/SectionWrapper";
import ReviewForm from "@/components/forms/ads/PostReview";
import FallbackLoader from "@/components/fallback/FallbackLoader";

function Reviews() {
  return (
    <SectionWrapper>
      <div className="flex-column sm:row-flex-start !items-start gap-6 md:gap-8">
        <aside className="w-full card !pt-4 !pb-0 overflow-hidden !px-0 sm:w-72">
          <Aside />
        </aside>

        <section className="flex-1 card !py-6 !px-5 flex-column w-full gap-3 max-w-3xl">
          <h3 className="">Post Review</h3>

          <ReviewForm />
        </section>
      </div>
    </SectionWrapper>
  );
}

export default Reviews;

const Aside = ({}: {}) => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetAllReviewsQuery({ property_id: id });
  const reviews: any[] = data?.data?.data;
  const totalRating = data?.data?.totalRating || 1;

  useEffect(() => {
    if (isError) {
      const message = (error as any)?.message;
      toast.error(message || "Error fetching data");
    }
  }, [isError]);

  return (
    <>
      <h3 className="px-3 text-[1.02rem] mb-6">Reviews</h3>

      {isLoading ? (
        <div className="relative h-[300px]">
          <FallbackLoader loading={isLoading} hideLabel />
        </div>
      ) : (
        <>
          <div className="mx-2.5 grid grid-cols-[1fr,_max-content] gap-3 bg-background-100 py-2.5 px-2 rounded-lg">
            <ul className="flex-column gap-2">
              {Array.from({ length: 5 }).map((_, idx) => {
                const reversedIdx = 5 - idx;
                const percent = (reversedIdx / 5) * 100;

                return (
                  <li
                    key={reversedIdx}
                    className="grid grid-cols-[max-content,max-content,1fr] items-center group gap-2.5"
                  >
                    <p className="px-2">{reversedIdx}</p>

                    <ReviewStar key={reversedIdx} className="size-3 fill-yellow-500" />

                    <div
                      className={cn("h-1.5 rounded-full bg-secondary")}
                      style={{ width: `${percent - 10}%` }}
                    />
                  </li>
                );
              })}
            </ul>

            <div className="flex-column gap-1 h-full pr-2">
              <h3 className="text-3xl">{`${totalRating}.0`}</h3>

              <Ratings rating={totalRating} />

              <p className="font-semibold mt-auto">
                {reviews?.length > 1 ? `${reviews?.length} Reviews` : `${reviews?.length} Review`}
              </p>
            </div>
          </div>

          {reviews && reviews?.length > 0 ? (
            <ul className="flex-column mt-6 mb-5 mx-3 gap-3">
              {reviews?.map((review, idx) => (
                <li
                  key={idx}
                  className="flex-column group flex-none gap-6 rounded-xl bg-background-100 px-4 pb-4 pt-3.5 shadow hover:shadow-md transition-all md:max-w-md"
                >
                  <div className="w-full grid grid-cols-[max-content_1fr] items-center gap-3 sm:max-h-[80px]">
                    <div className="relative size-10 overflow-hidden rounded-full border border-slate-300 border-opacity-30 p-px shadow-sm clip-circle self-start">
                      <img
                        src={review?.image || profile}
                        alt=""
                        className="object-contain size-full"
                      />
                    </div>

                    <div>
                      <h3 className="capitalize line-clamp-2 cursor-default">
                        {review?.name || "Unknown"}
                      </h3>
                      <div className="row-flex-start !flex-wrap gap-3 mt-2">
                        <div className="row-flex-start gap-3 w-full">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <ReviewStar
                              key={idx}
                              className={cn(
                                "size-3 text-grey-100 transition",
                                (review?.rating || 1) > idx && "fill-yellow-500"
                              )}
                            />
                          ))}
                        </div>

                        <span className="text-xs pr-1 text-grey leading-none ">
                          {formatRelativeTime(review?.updated_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className={cn("relative pr-1 text-sm  max-w-[60ch] tracking-tight")}>
                    {review?.comment || <span className="italic">No review</span>}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyList />
          )}
        </>
      )}
    </>
  );
};

const Ratings = ({ rating }: { rating: number }) => (
  <div className="row-flex-start gap-3 w-full">
    {Array.from({ length: 5 }).map((_, idx) => (
      <ReviewStar
        key={idx}
        className={cn("size-3 text-grey-100 transition", rating > idx && "fill-yellow-500")}
      />
    ))}
  </div>
);

const EmptyList = () => {
  return (
    <div className="flex-column gap-6 !items-center mt-8 mb-6">
      <NoSearch className="w-52 h-fit" />
      <p className=" text-base text-center leading-4 px-1">
        There are no reviews yet. Add a new review!
      </p>
    </div>
  );
};
