import { memo, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type HeaderType = "detail" | "certificate" | undefined;

const Detail: React.FC<{
  className?: string;
  type: HeaderType;
}> = memo(({ className, type }) => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const text = useMemo(() => {
    if (type === "detail") {
      return "藏品详情";
    } else if (type === "certificate") {
      return "凭证详情";
    }
  }, [pathname]);

  const handleGoBack = useCallback(() => {
    const query = new URLSearchParams();
    query.set("key", state.type);

    navigate(`/${state.from}/${state.account}?${query.toString()}`);
  }, [state]);

  const handleShare = useCallback(() => {
    alert("share");
  }, []);

  return (
    <div className={`flex justify-between ${className}`}>
      {state ? (
        <img
          className="h-5 w-5"
          src="/arrow-left.svg"
          onClick={handleGoBack}
        ></img>
      ) : (
        <div></div>
      )}
      <div className={`font-18`}>{text}</div>
      {/* <img
        className="h-5 w-5"
        src="/share.svg"
        onClick={handleShare}
      ></img> */}
      <div></div>
    </div>
  );
});

export default Detail;
export { type HeaderType };
