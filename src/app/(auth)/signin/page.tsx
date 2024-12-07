import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Envelope, Lock } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { SignInSchema } from "@/schema/validation";
import { useFormik } from "formik";
import { InferType } from "yup";
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Button from "@/components/reuseables/CustomButton";
import GoogleAuth from "../_sections/GoogleAuth";
import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";

function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleLogin, isLoadingAuth, fetchGoogleAuthUser } = useAuth();
  const [searchParams] = useSearchParams();
  const [hasLoggedInWithGoogle, setHasLoggedInWithGoogle] = useState(false);

  const onSubmit = async (values: InferType<typeof SignInSchema>) => {
    const returnTo = location.state?.returnTo || "/";
    await handleLogin(values?.email, values?.password, returnTo);
  };

  useEffect(() => {
    const ssoStatus = searchParams.get("sso-signin-status");
    const ssoToken = searchParams.get("token");
    console.log("STATUS", ssoStatus, ssoToken);

    const handleSSOAuth = async () => {
      if (ssoStatus === "success" && ssoToken) {
        try {
          sessionStorage.setItem("skymeasures-token", JSON.stringify(ssoToken));
          await fetchGoogleAuthUser(ssoToken);
          setHasLoggedInWithGoogle(true);

          // Clear the URL parameters after successful authentication
          // const returnTo = searchParams.get("returnTo") || "/";
          const returnTo = location.state?.returnTo || "/";
          navigate(returnTo, { replace: true });
          toast.success("SSO login successful!");
        } catch (error) {
          toast.error("Authentication failed! Please try again.");
          sessionStorage.removeItem("skymeasures-token");
        }
      } else if (ssoStatus === "failed") {
        toast.error("SSO login failed! Please try again.");
        setHasLoggedInWithGoogle(false);
      }
    };

    if (ssoStatus) {
      handleSSOAuth();
    }
  }, [searchParams]);

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: SignInSchema,
      onSubmit,
    });

  return (
    <>
      <div className="flex-column gap-0.5">
        <h2 className="text-2xl md:text-3xl">Welcome back!</h2>
        <p className="sm:whitespace-nowrap leading-5 tracking-wide mt-0.5 text-foreground-100">
          Don't have an account?{" "}
          <Link to="/signup" className="text-secondary font-semibold hover:underline transition">
            Sign up
          </Link>
        </p>
      </div>

      <div className="pt-4">
        <form onSubmit={handleSubmit} className="flex-column flex-1 gap-9">
          <div className="flex-column gap-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email address"
              field={{
                value: values.email,
                placeholder: "",
                type: "email",
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              iconSrc={Envelope}
              touched={touched}
              tag="auth"
              inputStyles="h-10"
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
              inputStyles="h-10"
            />
          </div>

          <Button
            type="submit"
            title={isSubmitting ? "Signing in..." : "Login"}
            className={cn("!mt-auto !w-full !py-5")}
            disabled={isLoadingAuth || hasLoggedInWithGoogle}
            isLoading={isLoadingAuth}
          />
        </form>

        <p className="leading-5 text-center mt-4 tracking-wide text-foreground-100 min-[500px]:whitespace-nowrap">
          Forgot Password?{" "}
          <Link to="/recover-password" className="text-secondary font-semibold">
            Recover
          </Link>
        </p>

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

export default SignIn;
