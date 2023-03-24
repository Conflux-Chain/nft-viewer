import { useEffect, memo } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.getElementById("root")?.scrollTo(0, 0);
  }, [pathname]);

  return null;
});

export default ScrollToTop;
