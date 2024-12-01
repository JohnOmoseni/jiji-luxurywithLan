import * as yup from "yup";
import { useFormik } from "formik";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { ReviewStar } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAddReviewMutation } from "@/server/actions/reviews";
import { useParams } from "react-router-dom";

import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";

export default function ReviewForm() {
  const { id } = useParams();
  const [ratings, setRatings] = useState(1);
  const [addReviewMutation, { isLoading }] = useAddReviewMutation();

  const onSubmit = async (values: any, actions: any) => {
    try {
      const data = {
        property_id: id,
        comment: values.comment,
        rating: ratings,
      };

      await addReviewMutation(data).unwrap();
      setRatings(1);

      toast.success("Added Review!");
      actions.resetForm();
    } catch (error: any) {
      const message = error?.response?.data?.message;

      toast.error(message || "Error procesing request");
    }
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        comment: "",
        rating: "",
      },
      validationSchema: yup.object().shape({
        comment: yup.string().required("Review is required"),
        rating: yup
          .number()
          .integer()
          .min(1, "Rating must be at least 1")
          .max(5, "Rating must be at most 5"),
      }),
      onSubmit,
    });

  return (
    <FormWrapper
      onSubmit={handleSubmit}
      containerStyles="max-w-full"
      buttonLabel="Post Review"
      isSubmitting={isLoading}
    >
      <div className="relative ">
        <div className="flex-column gap-5">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            name="comment"
            label="Review"
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            field={{
              value: values.comment,
              placeholder: "",
            }}
          />

          <div className="flex-column gap-y-2 mt-2">
            <Label className="inline-flex">Rating</Label>

            <div className="row-flex-start gap-3 w-full px-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <ReviewStar
                  key={idx}
                  onClick={() => {
                    setRatings(idx + 1);
                    setFieldValue("rating", idx + 1);
                  }}
                  className={cn(
                    "size-8 text-grey-100 transition cursor-pointer",
                    ratings > idx && "fill-yellow-500"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
