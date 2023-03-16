import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const MAX_WIDTH = 768; // support for max viewport width
const REM_RATIO = 23.4375;

function App() {
  useEffect(() => {
    let init = () => {
      let width = document.documentElement.clientWidth;
      width = width > MAX_WIDTH ? MAX_WIDTH : width;
      document.documentElement.style.fontSize = width / REM_RATIO + "px"; // 1rem = 16px
    };

    // for first loaded
    init();

    // for resize window and orientation
    window.addEventListener("resize", init);
    window.addEventListener("orientationchange", init);

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("orientationchange", init);
    };
  }, []);
  return <Outlet />;
}

export default App;
