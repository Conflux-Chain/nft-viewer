import { useCallback, useEffect, useState } from "react";
import { getCertificates, type DetailType } from "../../utils/request";
import NFTViewer from "@cubed/nftviewer";
import { Link } from "react-router-dom";

const Certificates: React.FC<{ account: string | undefined }> = ({
  account,
}) => {
  const [data, setData] = useState<Partial<DetailType>[]>([]);

  const request = useCallback(async (account: string) => {
    return await getCertificates(account);
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
    <div className="grid grid-cols-1 gap-[0.9375rem]">
      {data.map((d) => (
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
              to={`/detail/${d.contract}/${d.id}`}
              state={{
                account,
                from: "profile",
                type: "NFT", // may be NFT or certificate
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
  );
};

export default Certificates;
