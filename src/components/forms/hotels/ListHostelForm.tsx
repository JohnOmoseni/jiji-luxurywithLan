import { SelectItem } from "@/components/ui/select";
import { FormikHelpers, useFormik } from "formik";
import { toast } from "sonner";
import { useState } from "react";
import { useGetAllLGAsQuery, useGetAllStatesQuery } from "@/server/actions/utils";
import { OptionType } from "@/types";
import { useListHotelMutation, useUpdateHotelMutation } from "@/server/actions/hotel";
import { ListHostelSchema } from "@/schema/validation";
import { InferType } from "yup";
import { useNavigate } from "react-router-dom";

import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormFileUpload from "../FormFileUpload";
import FormWrapper from "../FormWrapper";

type ListHotelProps = {
  data?: any;
  type: "post" | "edit";
};

const ListHostelForm = ({ data, type }: ListHotelProps) => {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [hasImageUploaded, setHasImageUploaded] = useState(false);

  const navigate = useNavigate();

  const { data: states } = useGetAllStatesQuery<{ data: OptionType[] }>({});
  const { data: lgas } = useGetAllLGAsQuery<{ data: OptionType[] }>(
    selectedState ? { state_id: selectedState } : undefined,
    { skip: !selectedState }
  );

  const [listHotelMutation, { isLoading: isListHotelLoading }] = useListHotelMutation();
  const [updateHotelMutation, { isLoading: isUpdateHotelLoading }] = useUpdateHotelMutation();

  const onSubmit = async (
    values: InferType<typeof ListHostelSchema>,
    actions: FormikHelpers<any>
  ) => {
    if (!hasImageUploaded || files.length < 2) {
      toast.info("Please upload at least 2 images for the ad");
      return;
    }

    const payload = {
      name: values.name,
      area: values.area,
      state_id: values.state,
      lga_id: values.lga,
      address: values.address,
      office_front: files[0],
    };

    try {
      let res;
      if (type === "post") {
        res = await listHotelMutation({
          ...payload,
          media: files.slice(1),
          is_hotel: 1,
          is_main: 1,
        }).unwrap();
      } else if (type === "edit") {
        res = await updateHotelMutation({ hotel_id: data?.id, ...payload }).unwrap();
      }

      const message = res?.data?.message || `${type === "post" ? "Added" : "Updated"} Hotel!`;
      toast.success(message);
      actions.resetForm();

      navigate("/my-hotels", { state: { type: "hotels" } });
    } catch (error: any) {
      const message =
        error?.response?.data?.message || `Error ${type === "post" ? "listing" : "updating"} hotel`;

      toast.error(message);
    }
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: data?.name || "",
        address: data?.address || "",
        area: data?.area || "",
        state: data?.state_id ? String(data?.state_id) : "",
        lga: data?.lga_id ? String(data?.lga_id) : "",
      },
      validationSchema: ListHostelSchema,
      enableReinitialize: true,
      onSubmit,
    });

  return (
    <FormWrapper
      onSubmit={handleSubmit}
      containerStyles="max-w-full"
      buttonLabel={type === "post" ? "Add Hotel" : "Update Hotel"}
      isSubmitting={isListHotelLoading || isUpdateHotelLoading}
    >
      <div className="relative flex-column gap-6">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Name"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.name,
            placeholder: "",
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="address"
          label="Address"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.address,
            placeholder: "Type Address",
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="area"
          label="Area"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.area,
            placeholder: "e.g. Ikorodu",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="state"
            label="State"
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            field={{
              value: values.state,
              placeholder: "",
            }}
            selectContainerStyles="max-h-72"
            onChange={(value: any) => {
              setFieldValue("state", value);
              setSelectedState(value);
            }}
            selectList={states}
          >
            {states?.map((item, index) => (
              <SelectItem key={index} value={item?.value} className="shad-select-item">
                {item?.label}
              </SelectItem>
            ))}
          </CustomFormField>

          {selectedState && (
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              name="lga"
              label="LGA"
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              field={{
                value: values.lga,
                placeholder: "",
              }}
              onChange={(value: string) => {
                setFieldValue("lga", value);
              }}
              selectList={lgas}
            >
              {lgas?.map((item, index) => (
                <SelectItem key={index} value={item?.value} className="shad-select-item">
                  {item?.label}
                </SelectItem>
              ))}
            </CustomFormField>
          )}
        </div>

        <div className="mt-2">
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            name="mediaImage"
            errors={errors}
            onBlur={handleBlur}
            touched={touched}
            renderSkeleton={() => (
              <FormFileUpload
                title="Upload Images (At least 2 images)"
                name="mediaImage"
                setHasImageUploaded={setHasImageUploaded}
                images={
                  Array.isArray(data?.media)
                    ? [...data?.media?.map((file: any) => file?.file_url), data?.office_front]
                    : []
                }
                onFileChange={(files) => setFiles(files)}
              />
            )}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default ListHostelForm;
