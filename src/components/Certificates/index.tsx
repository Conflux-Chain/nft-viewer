import { useCallback, useEffect, useState } from "react";
import {
  getCertificates,
  type DetailType,
  getOwnedNFTSet,
  type NFTSetType,
} from "../../utils/request";
import NFTViewer from "@cubed/nftviewer";
import { Link } from "react-router-dom";
import NFTViewerContainer from "../NFTViewerContainer";
import Search, { type SearchValueType } from "../Search";
import Filter from "../Filter";

const Certificates: React.FC<{ account: string | undefined }> = ({
  account,
}) => {
  const [certificates, setCertificates] = useState<Partial<DetailType>[]>([]);
  const [NFTSet, setNFTSet] = useState<NFTSetType[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<NFTSetType["contract"][]>(
    []
  );
  const [searchValue, setSearchValue] = useState<SearchValueType>([]);

  const requestCertificates = useCallback(
    async (
      account: string,
      set: NFTSetType["contract"][],
      searchValue: SearchValueType
    ) => {
      const certificates = await getCertificates(account, set, searchValue);
      setCertificates(certificates);
    },
    []
  );

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
          await requestCertificates(account, selectedKeys, []);
        }
      }
    }

    main().catch(console.log);
  }, [account]);

  useEffect(() => {
    async function main() {
      account &&
        (await requestCertificates(account, selectedKeys, searchValue));
    }

    main().catch(console.log);
  }, [account, selectedKeys, searchValue]);

  const handleFilterChange = (keys: NFTSetType["contract"][]) => {
    console.log("filter selected keys: ", keys);
    setSelectedKeys(keys);
  };

  const handleSearchChange = (value: string[]) => {
    console.log("search value: ", value);
    setSearchValue(value);
  };

  return (
    <>
      <div className="mb-4 flex">
        <Search
          onChange={handleSearchChange}
          placeholder="请输入凭证 ID 或名称"
        ></Search>
        <Filter
          items={NFTSet}
          selectedKeys={selectedKeys}
          onChange={handleFilterChange}
        ></Filter>
      </div>
      <div className="grid grid-cols-1 gap-[0.9375rem]">
        {certificates.map((d) => (
          <div className="m-0 flex rounded-lg bg-white p-0" key={d.id}>
            <div
              className={`
              relative
              h-[6.5rem]
              w-[6.5rem]
              border-r-[0.125rem]
              border-dashed
              border-[#EEEEEE]
              p-2

              before:absolute
              before:-bottom-2
              before:-right-[0.5625rem]
              before:inline-block
              before:h-4
              before:w-4
              before:rounded-full
              before:bg-[#f9f9f9]
              before:content-['']

              after:absolute
              after:-top-2
              after:-right-[0.5625rem]
              after:inline-block
              after:h-4
              after:w-4
              after:rounded-full
              after:bg-[#f9f9f9]
              after:drop-shadow-two
              after:content-['']
            `}
            >
              <NFTViewer url={d.url}></NFTViewer>
            </div>
            {/* <div
          className="m-0 flex rounded-lg bg-white p-0 drop-shadow-one"
          key={d.id}
        >
          <div
            className={`
              relative 
              h-[6.5rem] 
              w-[6.5rem] 
              border-r-[0.125rem] 
              border-dashed 
              border-[#EEEEEE] 
              p-2 
            `}
          >
            <NFTViewer url={d.url}></NFTViewer>
          </div> */}
            <div className="p-2">
              <Link
                to={`/certificate/${d.contract}/${d.id}`}
                state={{
                  account,
                  from: "profile",
                  type: "certificates", // may be nft or certificate
                }}
              >
                <div className="font-14 color-cBlack mt-2 font-medium leading-[1.125rem]">
                  {d.name}
                </div>
              </Link>
              <div className="font-12 mt-1">#{d.id}</div>
              <div className="mt-3 inline-flex rounded-sm border border-solid border-cBlack">
                <span className="bg-cBlack p-0.5 text-[0.625rem] text-white">
                  数量
                </span>
                <span className="border-cBlack p-0.5 text-[0.625rem]">
                  {d.amount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Certificates;
