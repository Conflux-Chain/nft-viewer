const NFTViewerContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative w-full pt-[100%]">
      <div className="nft-view-card absolute top-0 h-full w-full bg-gray-300">
        {children}
      </div>
    </div>
  );
};

export default NFTViewerContainer;
