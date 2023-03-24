import { memo } from "react";

const Common: React.FC<{ className?: string }> = memo(({ className }) => {
  return (
    <div className={`text-xl font-black leading-5 text-cBlack`}>NFT Viewer</div>
  );
});

export default Common;
