import { Google } from "@/constants/icons";
import { useAuth } from "@/context/AuthContext";

function GoogleAuth() {
  const { handleGoogleLogin } = useAuth();

  const handleClick = async () => {
    handleGoogleLogin();
  };

  return (
    <div className="w-11/12 mx-auto mt-6">
      <div className="row-flex gap-3">
        <hr className="w-[50%] border border-border-200 " />
        <span className="text-base ">Or</span>
        <hr className="w-[50%] border border-border-200" />
      </div>

      <div
        onClick={handleClick}
        className="mt-6 py-3 px-3 text-base cursor-pointer row-flex gap-3 border border-border rounded-lg shadow-sm leading-4"
      >
        <Google className="size-4" />
        Continue with Google
      </div>
    </div>
  );
}

export default GoogleAuth;
