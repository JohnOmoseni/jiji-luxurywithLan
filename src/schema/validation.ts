import * as yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

export const SignUpSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your new password"),
});

export const SignInSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const PasswordSchema = yup.object().shape({
  otpValue: yup
    .string()
    .matches(/^\d{4}$/, "OTP must be a 4-digit number")
    .required("OTP is required"),
  new_password: yup
    .string()
    .min(8, "New password must be at least 8 characters")
    .matches(
      passwordRegex,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
    )
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password"), undefined], "Passwords must match")
    .required("Please confirm your new password"),
});

export const ProfileSchema = yup.object().shape({
  name: yup.string().required("Title is required"),
  email: yup.string().email("Invalid email address").required("Email Address is required"),
  phone_number: yup
    .string()
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      (value) => isValidPhoneNumber(value!, "NG") // Validate if it's a valid Nigerian phone number
    )
    .required("Phone Number is required"),
  location: yup.string().required("Location is required"),
  old_password: yup.string().required("Password is required"),
  new_password: yup
    .string()
    .min(8, "New password must be at least 8 characters")
    .matches(
      passwordRegex,
      "New password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your new password"),
});

export const ProfilePasswordSchema = yup.object().shape({
  old_password: yup.string().required("Password is required"),
  new_password: yup
    .string()
    .min(8, "New password must be at least 8 characters")
    .matches(
      passwordRegex,
      "New password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
    )
    .required("New password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password"), undefined], "Passwords must match")
    .required("Please confirm your new password"),
});

export const PostSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Title is required")
      .min(5, "Listing Title must be at least 5 characters"),
    listingType: yup.string().required("Listing type is required"),
    description: yup
      .string()
      .required("Description is required")
      .min(5, "Description must be at least 5 characters"),
    address: yup.string().required("Address is required"),
    state: yup.string().required("State is required"),
    lga: yup.string(),
    district: yup.string().required("District is required"),
    amount: yup.string().required("Discount price is required"),
    actual_amount: yup
      .string()
      .required("Actual price is required")
      .test("max-amount", "Actual price must be less than discount price", function (value) {
        const amount = parseFloat(this.parent.amount);
        return parseFloat(value || "0") < amount;
      }),
    category: yup.string().required("Category is required"),
    is_negotiable: yup.boolean().required("Negotiability status is required"),

    // Dynamic fields (optional and flexible)
  })
  .test("dynamic-fields", "Optional dynamic fields validation", function (value) {
    const keys = Object.keys(value || {});

    for (let key of keys) {
      if (!(key in this.schema.fields)) {
        this.schema.fields[key] = yup.mixed(); // Allows any type for unknown dynamic fields
      }
    }

    return true;
  });

export const ListHostelSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  area: yup.string().required("Area is required"),
  state: yup.string().required("State is required"),
  lga: yup.string().required("LGA is required"),
});

export const BookHotelSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  phone_number: yup
    .string()
    .test("is-valid-phone", "Please enter a valid phone number", (value) =>
      isValidPhoneNumber(value!, "NG")
    )
    .required("Phone number is required"),
  fromDate: yup.date().required("From date is required"),
  toDate: yup.date().required("To date is required"),
  arrival_time: yup.string().required("Arrival time is required"),
  payment_type: yup
    .string()
    .oneOf(["pay_on_reach"], "Payment type is required")
    .default("pay_on_reach"),
  number_of_persons: yup.string().required("Number of persons is required").default("1"),
  message: yup.string().required("Message is required"),
});
