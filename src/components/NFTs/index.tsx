import { useCallback, useEffect, useState } from "react";
import { getNFTs, type DetailType } from "../../utils/request";
import NFTViewerContainer from "../NFTViewerContainer";
import NFTViewer from "@cubed/nftviewer";
import { Link } from "react-router-dom";

const NFTs: React.FC<{ account: string | undefined }> = ({ account }) => {
  const [data, setData] = useState<Partial<DetailType>[]>([]);

  const request = useCallback(async (account: string) => {
    return await getNFTs(account);
  }, []);

  useEffect(() => {
    async function main() {
      if (account) {
        const data = await request(account);
        setData(data);
      }
    }

    main().catch(console.log);
  }, [account]);

  return (
    <div className="grid grid-cols-2 gap-[0.9375rem] pt-1">
      {data.map((d) => (
        <div className="m-0 p-0" key={d.id}>
          <NFTViewerContainer>
            <NFTViewer url={d.url}></NFTViewer>
          </NFTViewerContainer>
          <Link
            to={`/detail/${d.contract}/${d.id}`}
            state={{
              account,
              from: "profile",
              type: "nfts", // may be nft or certificate
            }}
          >
            <div className="font-14 color-cBlack mt-3 font-medium leading-[1.125rem]">
              {d.name}
            </div>
          </Link>
          <div className="font-12 mt-1">#{d.id}</div>
        </div>
      ))}
    </div>
  );
};

export default NFTs;
