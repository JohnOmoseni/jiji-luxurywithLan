import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useCallback, useEffect, useState } from "react";
import Button from "@/components/reuseables/CustomButton";

function VerifyOTP() {
  const { handleVerifyOtp, handleResendOtp, isLoadingAuth, user } = useAuth();
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [otpState, setOtpState] = useState({
    countdown: 180,
    isResending: false,
    isCountdownActive: false,
  });

  useEffect(() => {
    const sendInitialOtp = async () => {
      try {
        await handleResendOtp(user?.email || "");
        setOtpState((prev) => ({
          ...prev,
          countdown: 180,
          isCountdownActive: true,
        }));
      } catch (e) {
        setError("Failed to send verification code. Please try again.");
      }
    };

    sendInitialOtp();
  }, [handleResendOtp, user?.email]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (otpState.isCountdownActive && otpState.countdown > 0) {
      interval = setInterval(() => {
        setOtpState((prev) => ({
          ...prev,
          countdown: prev.countdown - 1,
          isCountdownActive: prev.countdown > 1,
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [otpState.isCountdownActive, otpState.countdown]);

  const handleVerifySubmit = useCallback(async () => {
    if (!user?.email) return;
    setError(null);

    try {
      await handleVerifyOtp(Number(otpValue), user.email);
    } catch (e) {
      setError("Invalid verification code. Please try again.");
    }
  }, [handleVerifyOtp, otpValue, user?.email]);

  const handleResend = useCallback(async () => {
    if (otpState.isResending || !user?.email) return;
    setError(null);

    setOtpState((prev) => ({ ...prev, isResending: true }));
    try {
      await handleResendOtp(user.email);
      setOtpState({
        countdown: 180,
        isResending: false,
        isCountdownActive: true,
      });
    } catch (e) {
      setError("Failed to resend verification code. Please try again.");
      setOtpState((prev) => ({ ...prev, isResending: false }));
    }
  }, [handleResendOtp, otpState.isResending, user?.email]);

  return (
    <>
      <div className="flex-column gap-2">
        <h3 className="text-2xl">Verification Code</h3>
        <p className="leading-5 tracking-wide text-foreground-100">
          Enter the 4-digit code sent to{" "}
          <span className="text-secondary inline-block font-medium">
            {user?.email || <span className="font-medium tracking-wide">---</span>}
          </span>{" "}
          to verify your account and continue
        </p>
      </div>

      <div className="pt-3 pb-6">
        <div className="flex-column gap-3">
          <InputOTP maxLength={4} value={otpValue} onChange={(value) => setOtpValue(value)}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className={cn(error && "border-red-400 border-2 ring-0")} index={0} />
              <InputOTPSlot className={cn(error && "border-red-400 border-2 ring-0")} index={1} />
              <InputOTPSlot className={cn(error && "border-red-400 border-2 ring-0")} index={2} />
              <InputOTPSlot className={cn(error && "border-red-400 border-2 ring-0")} index={3} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="font-semibold tracking-wide text-base text-red-500">Incorrect OTP code</p>
          )}

          <div className="">
            {!otpState.isCountdownActive ? (
              <span className="font-semibold text-secondary cursor-pointer" onClick={handleResend}>
                {otpState.isResending ? "Resending..." : "Resend OTP"}
              </span>
            ) : (
              <p className="mt-0.5 leading-5 text-foreground-100 tracking-wide">
                Resend code in:{" "}
                <span className="text-secondary inline-flex font-normal">
                  {Math.floor(otpState.countdown / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(otpState.countdown % 60).toString().padStart(2, "0")}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        title={isLoadingAuth ? "Verifing..." : "Verify"}
        className={cn("!mt-auto !w-full !py-5")}
        disabled={isLoadingAuth || otpValue.length !== 4}
        onClick={handleVerifySubmit}
        isLoading={isLoadingAuth}
      />
    </>
  );
}

export default VerifyOTP;
