import { useCallback, useEffect, useMemo, useState } from "react";
import { getProfile, type ProfileType } from "../utils/request";
import { formatAddress } from "../utils";
import Tab from "../components/Tabs";
import NFTs from "../components/NFTs";
import Certificates from "../components/Certificates";
import { useParams } from "react-router-dom";

export default () => {
  const { account } = useParams();
  const [data, setData] = useState({} as ProfileType);
  const [key, setKey] = useState<string>("certificates");

  useEffect(() => {
    async function main() {
      if (account) {
        const data: ProfileType = await getProfile(account);
        setData(data);
      }
    }

    main().catch(console.log);
  }, [account]);

  const ITEMS = useMemo(
    () => [
      {
        key: "about",
        label: "数字藏品",
        children: <NFTs account={account}></NFTs>,
      },
      {
        key: "certificates",
        label: "其他凭证",
        children: <Certificates account={account}></Certificates>,
      },
    ],
    [account]
  );

  const handleTabsChange = useCallback((key: string) => {
    setKey(key);
  }, []);

  return (
    <>
      <div className="mb-5 flex">
        <img
          src="/avatar-default.svg"
          className="mr-3 h-[3.75rem] w-[3.75rem] rounded-md"
        ></img>
        <div className="flex grow flex-col justify-around">
          <div className="font-18">
            {data.name || formatAddress(data.address)}
          </div>
          <div className="flex">
            <img src="/logo-conflux.svg" className="mr-1 w-[1.125rem]"></img>
            <span className="font-14 leading-5 text-[#666666]">
              Conflux 树图区块链
            </span>
          </div>
        </div>
        {/* <div className="mt-1 flex h-6 w-12 items-center justify-center rounded-[1.25rem] bg-cBlack">
          <img
            src="/plus.svg"
            className="mr-0.5 h-[0.625rem] w-[0.625rem]"
          ></img>
          <span className="font-12 font-medium text-white">关注</span>
        </div> */}
      </div>
      <Tab
        items={ITEMS}
        activeKey={key}
        onChange={handleTabsChange}
        type="left"
      ></Tab>
    </>
  );
};
