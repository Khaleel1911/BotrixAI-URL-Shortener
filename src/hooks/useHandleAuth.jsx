import { useNavigate } from "react-router-dom";

export function useHandleAuth() {
  const navigate = useNavigate();

  const handleAuth = () => {
    navigate("/auth");
  };

  return { handleAuth };
}
