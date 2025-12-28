import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthSuccessPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      // ✅ persist token immediately
      localStorage.setItem("token", token);

      // ✅ replace history so user can’t go back
      window.location.replace("/generate");
    } else {
      navigate("/auth", { replace: true });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600 text-sm">Signing you in…</p>
    </div>
  );
};

export default OAuthSuccessPage;
