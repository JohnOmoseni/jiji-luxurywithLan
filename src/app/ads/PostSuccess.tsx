import SectionWrapper from "@/layouts/SectionWrapper";
import { NoSearch } from "@/constants/icons";

function PostSuccess() {
  return (
    <SectionWrapper>
      <div className="card !p-6 max-w-5xl mx-auto">
        <div className="flex-column gap-5 !items-center">
          <NoSearch className="w-fit h-fit" />
          <h2 className="text-xl">Success!</h2>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default PostSuccess;
