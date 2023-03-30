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
    console.log("data: ", data);

    const [detail, setDetail] = useState<DetailType>({} as DetailType);

    useEffect(() => {
      async function main() {
        const detail = await getDetail(data.contract, data.tokenId);
        setDetail(detail);
      }

      main().catch(console.log);
    }, [data]);

    return (
      <div className="m-0 p-0" key={`${detail.contract}-${detail.tokenId}`}>
        <NFTViewerContainer>
          <NFTViewer url={detail.url}></NFTViewer>
        </NFTViewerContainer>
        <Link
          to={`/detail/${detail.contract}/${detail.id}`}
          state={{
            account,
            from: "profile",
            type: "nfts", // may be nft or certificate
          }}
        >
          <div className="font-14 color-cBlack mt-3 font-medium leading-[1.125rem]">
            {detail.name}
          </div>
        </Link>
        <div className="font-12 mt-1">#{detail.id}</div>
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
          <NFT data={d} account={account} />
        ))}
      </div>
    </>
  );
};

export default memo(NFTsComponent);
