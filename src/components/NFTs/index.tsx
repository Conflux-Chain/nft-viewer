import { memo, useCallback, useEffect, useState } from "react";
import {
  getNFTs,
  type GetNFTsType,
  getOwnedNFTSet,
  type NFTSetType,
  getDetail,
  type DetailType,
} from "../../utils/request";
import NFTViewerContainer from "../NFTViewerContainer";
import NFTViewer from "@cubed/nftviewer";
import { Link } from "react-router-dom";
import Search, { type SearchValueType } from "../Search";
import Filter from "../Filter";

const NFT = memo(
  ({ data, account }: { data: any; account: string | undefined }) => {
    return (
      <div className="m-0 p-0">
        <NFTViewerContainer>
          <NFTViewer url={data.image}></NFTViewer>
        </NFTViewerContainer>
        <Link
          to={`/detail/${data.contract}/${data.tokenId}`}
          state={{
            account,
            from: "profile",
            type: "nfts", // may be nft or certificate
          }}
        >
          <div className="font-14 color-cBlack mt-3 font-medium leading-[1.125rem]">
            {data.name}
          </div>
        </Link>
        <div className="font-12 mt-1">#{data.tokenId}</div>
      </div>
    );
  }
);

const NFTsComponent: React.FC<{ account: string | undefined }> = ({
  account,
}) => {
  const [NFTs, setNFTs] = useState<GetNFTsType>({
    list: [],
    next: 0,
    total: 0,
  });
  const [NFTSet, setNFTSet] = useState<NFTSetType[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<NFTSetType["contract"][]>(
    []
  );
  const [searchValue, setSearchValue] = useState<SearchValueType>([]);

  const requestNFTs = useCallback(
    async (
      account: string | undefined,
      set: NFTSetType["contract"][],
      searchValue: SearchValueType
    ) => {
      if (account) {
        const NFTs = await getNFTs(account, set, searchValue);
        setNFTs(NFTs);
      }
    },
    []
  );

  useEffect(() => {
    async function main() {
      if (account) {
        const sets = await getOwnedNFTSet(account);
        const selectedKeys = sets.map((s) => s.contract);

        setNFTSet(sets);
        setSelectedKeys(selectedKeys);

        requestNFTs(account, selectedKeys, []);
      }
    }

    main().catch(console.log);
  }, [account]);

  const handleFilterChange = (keys: NFTSetType["contract"][]) => {
    setSelectedKeys(keys);
    requestNFTs(account, keys, searchValue);
  };

  const handleSearchChange = (value: string[]) => {
    setSearchValue(value);
    requestNFTs(account, selectedKeys, value);
  };

  return (
    <>
      <div className="mb-4 flex">
        <Search
          onChange={handleSearchChange}
          placeholder="请输入藏品 ID 或名称"
        ></Search>
        <Filter
          items={NFTSet}
          selectedKeys={selectedKeys}
          onChange={handleFilterChange}
        ></Filter>
      </div>
      <div className="grid grid-cols-2 gap-[0.9375rem]">
        {NFTs.list.map((d) => (
          <NFT data={d} account={account} key={`${d.contract}-${d.tokenId}`} />
        ))}
      </div>
    </>
  );
};

export default memo(NFTsComponent);
