import { useCallback, useEffect, useState } from "react";
import {
  getNFTs,
  type DetailType,
  getOwnedNFTSet,
  type NFTSetType,
} from "../../utils/request";
import NFTViewerContainer from "../NFTViewerContainer";
import NFTViewer from "@cubed/nftviewer";
import { Link } from "react-router-dom";
import Search from "../Search";
import Filter from "../Filter";

const NFTs: React.FC<{ account: string | undefined }> = ({ account }) => {
  const [NFTs, setNFTs] = useState<Partial<DetailType>[]>([]);
  const [NFTSet, setNFTSet] = useState<NFTSetType[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<NFTSetType["contract"][]>(
    []
  );

  const requestNFTs = useCallback(async (account: string, set: string[]) => {
    const NFTs = await getNFTs(account, set);
    setNFTs(NFTs);
  }, []);

  const requestNFTSet = useCallback(async (account: string) => {
    return await getOwnedNFTSet(account);
  }, []);

  useEffect(() => {
    async function main() {
      if (account) {
        const sets = await requestNFTSet(account);
        const selectedKeys = sets.map((s) => s.contract);

        setNFTSet(sets);
        setSelectedKeys(selectedKeys);

        if (selectedKeys.length) {
          await requestNFTs(account, selectedKeys);
        }
      }
    }

    main().catch(console.log);
  }, [account]);

  useEffect(() => {
    async function main() {
      account && (await requestNFTs(account, selectedKeys));
    }

    main().catch(console.log);
  }, [account, selectedKeys]);

  const handleFilterChange = (keys: NFTSetType["contract"][]) => {
    console.log("filter selected keys: ", keys);
    setSelectedKeys(keys);
  };

  return (
    <>
      <div className="mb-4 flex">
        <Search></Search>
        <Filter
          items={NFTSet}
          selectedKeys={selectedKeys}
          onChange={handleFilterChange}
        ></Filter>
      </div>
      <div className="grid grid-cols-2 gap-[0.9375rem]">
        {NFTs.map((d) => (
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
    </>
  );
};

export default NFTs;
