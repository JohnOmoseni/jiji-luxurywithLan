import { SelectItem } from "@/components/ui/select";
import { useFormik } from "formik";
import { toast } from "sonner";
import { DatePicker } from "@/components/ui/components/Calendar";
import { Label } from "@/components/ui/label";
import { Value } from "react-phone-number-input";
import { useCreateBookingMutation, useUpdateBookingMutation } from "@/server/actions/bookings";
import { useNavigate } from "react-router-dom";
import { BookHotelSchema } from "@/schema/validation";

import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormWrapper from "../FormWrapper";
import { InferType } from "yup";

type BookHotelProps = {
  data?: any;
  type?: "post" | "edit";
};

const BookHotelForm = ({ data, type = "post" }: BookHotelProps) => {
  const paymentTypes = [{ value: "pay_on_reach", label: "Pay on Arrival" }];

  const navigate = useNavigate();

  const [createBookingMutation, { isLoading: isCreateBookingLoading }] = useCreateBookingMutation();
  const [updateBookingMutation, { isLoading: isUpdateBookingLoading }] = useUpdateBookingMutation();

  const onSubmit = async (values: InferType<typeof BookHotelSchema>) => {
    const payload = {
      customer_name: values.name,
      email: values.email,
      phone: values.phone_number,
      from_date: values.fromDate,
      to_date: values.toDate,
      payment_type: values.payment_type,
      pickup_or_arrival_time: values.arrival_time,
      persons: values.number_of_persons,
      customer_message: values.message,
      count: 1,
    };

    try {
      let res;
      if (type === "post") {
        res = await createBookingMutation({ ...payload }).unwrap();
      } else if (type === "edit") {
        res = await updateBookingMutation({ booking_id: data?.id, ...payload }).unwrap();
      }

      const message =
        res?.data?.message ||
        ` ${type === "post" ? "Booked Hotel" : "Updated booking"} successfully!`;
      toast.success(message);
      navigate("/my-hotels", { state: { type: "bookings" } });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        `Error ${type === "post" ? "booking hotel" : "updating booking"}`;

      toast.error(message);
    }
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: data?.customer_name || "",
        email: data?.email || "",
        phone_number: data?.phone || "",
        fromDate: data?.from_date || "",
        toDate: data?.to_date || "",
        arrival_time: data?.pickup_or_arrival_time || "",
        payment_type: data?.payment_type || "",
        number_of_persons: data?.persons || "",
        message: data?.customer_message || "",
      },
      validationSchema: BookHotelSchema,
      enableReinitialize: true,
      onSubmit,
    });

  return (
    <FormWrapper
      onSubmit={handleSubmit}
      containerStyles="max-w-full"
      buttonLabel={"Book Hotel"}
      isSubmitting={isCreateBookingLoading || isUpdateBookingLoading}
    >
      <div className="relative flex-column gap-6">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Customer Name"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.name,
            placeholder: "",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="email"
            label="Email"
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            field={{
              value: values.email,
              placeholder: "",
            }}
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            name={"phone_number"}
            label="Phone Number"
            field={{ value: values.phone_number }}
            onChange={(value: Value) => {
              setFieldValue("phone_number", value);
            }}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 mb-2">
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            name="fromDate"
            field={{
              value: values.fromDate,
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            renderSkeleton={() => {
              return (
                <div className="flex-column gap-3 sm:mt-1">
                  <Label className="ml-1 inline-flex opacity-70">From Date</Label>
                  <DatePicker
                    onChange={(date: Date) => {
                      setFieldValue("fromDate", date);
                    }}
                  />
                </div>
              );
            }}
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            name="toDate"
            field={{
              value: values.toDate,
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            renderSkeleton={() => {
              return (
                <div className="flex-column gap-3 sm:mt-1">
                  <Label className="ml-1 inline-flex opacity-70">To Date</Label>
                  <DatePicker
                    onChange={(date: Date) => {
                      setFieldValue("toDate", date);
                    }}
                  />
                </div>
              );
            }}
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="arrival_time"
          label="Pickup OR Arrival Time"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          inputStyles="block"
          field={{
            value: values.arrival_time,
            type: "time",
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          name="payment_type"
          label="Payment Type"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          field={{
            value: values.payment_type,
            placeholder: "Select Payment Type",
          }}
          onChange={(value: any) => {
            setFieldValue("payment_type", value);
          }}
          selectList={paymentTypes}
        >
          {paymentTypes?.map((item, index) => (
            <SelectItem key={index} value={item?.value} className="shad-select-item">
              {item?.label}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="number_of_persons"
          label="Number of Persons"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.number_of_persons,
            type: "number",
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          name="message"
          label="Customer Message"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.message,
            placeholder: "Type Customer Message",
          }}
        />
      </div>
    </FormWrapper>
  );
};

export default BookHotelForm;
