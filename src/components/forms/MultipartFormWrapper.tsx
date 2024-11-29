import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Button from "../reuseables/CustomButton";

type FormProps = {
  step?: number;
  nextStep?: () => void;
  prevStep?: () => void;
};

interface FormWrapperProps extends FormProps {
  children: ReactNode;
  isSubmitting?: boolean;
  containerStyles?: string;
  btnStyles?: string;
  onSubmit?: () => void;
}

function MultipartFormWrapper({
  children,
  containerStyles,
  btnStyles,
  onSubmit,
  step,
}: FormWrapperProps) {
  return (
    <div className={cn("mt-6 h-full w-full max-w-lg", containerStyles)}>
      <form onSubmit={onSubmit} className="flex-column flex-1 gap-10">
        <div className="flex-column gap-2 space-y-3">{children}</div>

        {step !== 3 && (
          <Button
            type="button"
            title="Next"
            className={cn("!mt-auto mx-auto !py-3.5 sm:!py-6 !w-[80%]", btnStyles)}
            onClick={() => onSubmit && onSubmit()}
          />
        )}
      </form>
    </div>
  );
}

export default MultipartFormWrapper;
