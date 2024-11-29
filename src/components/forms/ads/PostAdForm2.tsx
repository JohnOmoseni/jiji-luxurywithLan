import { Fragment } from "react";

import { SelectItem } from "@/components/ui/select";
import { DynamicFieldType } from "@/types";
import { CheckedState } from "@radix-ui/react-checkbox";

import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";

export interface FormValues {
  name: string;
  listingType: string;
  description: string;
  address: string;
  state: string;
  lga: string;
  district: string;
  amount: string;
  actual_amount: string;
  category: string;
  mediaImage: string;
  is_negotiable: boolean;
  [key: string]: any;
}

type PostForm2Props = {
  step: number;
  prevStep?: () => void;
  isLoading: boolean;
  values: any;
  errors: any;
  touched: any;
  setFieldValue: any;
  handleBlur: any;
  handleChange: any;
  handleSubmit: any;
  dynamicFields: DynamicFieldType[];
};

const PostAdForm2 = ({
  isLoading,
  values,
  errors,
  touched,
  setFieldValue,
  handleBlur,
  handleChange,
  handleSubmit,
  dynamicFields,
}: PostForm2Props) => {
  return (
    <FormWrapper
      btnStyles="w-max"
      containerStyles="max-w-full"
      buttonLabel="Submit"
      onSubmit={handleSubmit}
      isSubmitting={isLoading}
    >
      {dynamicFields?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
          {dynamicFields.map((field, index) => (
            <Fragment key={index}>
              {field.type === FormFieldType.SELECT ? (
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  key={index}
                  name={field.name}
                  label={field.label}
                  onBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  field={{
                    value: (values as Record<string, any>)[field.name],
                    placeholder: field.placeholder,
                  }}
                  onChange={(value: any) => {
                    setFieldValue(field.name, value);
                  }}
                  selectList={field?.options}
                >
                  {field?.options?.map((item, index) => (
                    <SelectItem key={index} value={item?.value} className="shad-select-item">
                      {item?.label}
                    </SelectItem>
                  ))}
                </CustomFormField>
              ) : field.type === FormFieldType.CHECKBOX ? (
                <CustomFormField
                  key={index}
                  fieldType={field.type}
                  name={field.name}
                  label={field.label}
                  onBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  onChange={(checked: CheckedState) => {
                    setFieldValue(field.name, checked);
                  }}
                  field={{
                    value: (values as Record<string, any>)[field.name],
                    placeholder: field.placeholder,
                  }}
                />
              ) : (
                <CustomFormField
                  key={index}
                  fieldType={field.type}
                  name={field.name}
                  label={field.label}
                  onBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  onChange={handleChange}
                  field={{
                    value: (values as Record<string, any>)[field.name],
                    placeholder: field.placeholder,
                    type: field.inputType,
                  }}
                />
              )}
            </Fragment>
          ))}
        </div>
      )}
    </FormWrapper>
  );
};

export default PostAdForm2;
