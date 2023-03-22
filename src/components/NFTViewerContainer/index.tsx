const NFTViewerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={`relative w-full pt-[100%] ${className}`}>
      <div className="nft-view-card absolute top-0 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default NFTViewerContainer;
