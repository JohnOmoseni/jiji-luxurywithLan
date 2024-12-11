import SectionWrapper from "@/layouts/SectionWrapper";
import { NoSearch } from "@/constants/icons";

function PostSuccess({ title = "Success!" }: { title?: string }) {
  return (
    <SectionWrapper>
      <div className="card !p-6 max-w-5xl mx-auto">
        <div className="flex-column gap-5 !items-center">
          <NoSearch className="w-fit h-fit" />
          <h2 className="text-xl">{title}</h2>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default PostSuccess;
