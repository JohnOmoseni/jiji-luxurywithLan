import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import GoogleAuth from "../_sections/GoogleAuth";
import Button from "@/components/reuseables/CustomButton";
import { Envelope, Lock } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { SignUpSchema } from "@/schema/validation";
import { useFormik } from "formik";
import { InferType } from "yup";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

function SignUp() {
  const { handleRegister, isLoadingAuth } = useAuth();

  const onSubmit = async (values: InferType<typeof SignUpSchema>) => {
    console.log("Form submitted:", values);

    const data = {
      name: values.username,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirm_password,
    };

    await handleRegister(data);
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      validationSchema: SignUpSchema,
      onSubmit,
    });

  return (
    <>
      <div className="flex-column gap-0.5">
        <h2 className="text-2xl md:text-3xl">Sign Up</h2>
        <p className="whitespace-normal mt-1.5 tracking-wide text-foreground-100 min-[500px]:w-max">
          Already have an account?{" "}
          <Link to="/signin" className="text-secondary font-semibold">
            Login
          </Link>
        </p>
      </div>

      <div className="pt-4">
        <form onSubmit={handleSubmit} className="flex-column flex-1 gap-9">
          <div className="flex-column gap-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="username"
              label="Username"
              field={{
                value: values.username,
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              tag="auth"
              inputStyles="h-11"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email address"
              field={{
                value: values.email,
                type: "email",
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              iconSrc={Envelope}
              touched={touched}
              tag="auth"
              inputStyles="h-11"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="password"
              label="Password"
              field={{
                value: values.password,
                type: "password",
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              iconSrc={Lock}
              touched={touched}
              tag="auth"
              inputStyles="h-11"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="confirm_password"
              label="Confirm Password"
              field={{
                value: values.confirm_password,
                type: "password",
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              iconSrc={Lock}
              touched={touched}
              tag="auth"
              inputStyles="h-11"
            />
          </div>

          <Button
            type="submit"
            title={isSubmitting ? "Signing up..." : "Sign up"}
            className={cn("!mt-auto !w-full !py-5")}
            disabled={isLoadingAuth}
            isLoading={isLoadingAuth}
          />
        </form>

        <GoogleAuth />

        <p className="leading-4 text-xs text-center mt-3 tracking-wide text-foreground-100">
          By continuing you agree to the{" "}
          <Link to="/policy" className="text-secondary font-semibold">
            Policy and Rules
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
