import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteMemory = () => {
  const location = useLocation();

  useEffect(() => {
  const blocked = [
    "/settings",
    "/compare",
    "/quick-actions",
  ];

  if (!blocked.includes(location.pathname)) {
    localStorage.setItem("gf-last-path", location.pathname);
  }
}, [location.pathname]);
};

export default RouteMemory;