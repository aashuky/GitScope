import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const InitialRedirect = () => {
  const navigate = useNavigate();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    const savedUser = localStorage.getItem("gf-user");

    if (!savedUser) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return null;
};

export default InitialRedirect;