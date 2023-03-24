import { useCallback, useEffect, useState, memo, useMemo } from "react";
import { getNFTs, type DetailType } from "../../utils/request";
import NFTViewerContainer from "../NFTViewerContainer";
import NFTViewer from "@cubed/nftviewer";
import { Link } from "react-router-dom";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import Common from "./Common";
import Detail, { type HeaderType } from "./Detail";

const Header: React.FC<{ className?: string }> = memo(({ className = "" }) => {
  const { pathname } = useLocation();

  const content = useMemo(() => {
    if (pathname.startsWith("/detail") || pathname.startsWith("/certificate")) {
      return (
        <Detail type={/\/([^\/]*)/.exec(pathname)?.[1] as HeaderType}></Detail>
      );
    } else {
      return <Common></Common>;
    }
  }, [pathname]);

  return <div className={`pb-3 ${className}`}>{content}</div>;
});

export default Header;
