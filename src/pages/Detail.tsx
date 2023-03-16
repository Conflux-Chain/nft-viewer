import { Link } from "react-router-dom";
import NFTViewer from "@cubed/nftviewer";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getDetail, type GetDetailType } from "../utils/request";
import NFTViewerContainer from "../components/NFTViewerContainer";
import { formatAddress } from "../utils";
import { NETWORK } from "../utils/const";
import Tab from "../components/Tabs";

export default () => {
  const [data, setData] = useState({} as GetDetailType);
  const [key, setKey] = useState<string>("about");

  useEffect(() => {
    async function main() {
      const data: GetDetailType = await getDetail();
      setData(data);
    }

    main().catch(console.log);
  }, []);

  console.log("data: ", data);

  const NFT_CARD = useMemo(
    () => (
      <NFTViewerContainer>
        <NFTViewer url={data.url}></NFTViewer>
      </NFTViewerContainer>
    ),
    [data]
  );

  const NAME_CARD = useMemo(
    () => (
      <div className="card">
        <div className="title mb-2">{data.name}</div>
        <div>
          <span className="tag mr-2">#{data.id}</span>
          <span className="tag badge">树图标准数字藏品</span>
        </div>
      </div>
    ),
    [data]
  );

  const ABOUT_CARD = useMemo(() => {
    const aboutItems = [
      {
        key: "series",
        name: "系列名",
        value: (
          <div className="font-14 color-[#1A191B] text-right">
            {data.series}
          </div>
        ),
      },
      {
        key: "owner",
        name: "持有者",
        value: (
          <a
            href={`${NETWORK.confluxscan}/address/${data.owner}`}
            target="_blank"
            className="link float-right"
          >
            {formatAddress(data.owner, 7, 8)}
          </a>
        ),
      },
      {
        key: "contract",
        name: "树图区块链合约地址",
        value: (
          <a
            href={`${NETWORK.confluxscan}/address/${data.contract}`}
            target="_blank"
            className="link float-right"
          >
            {formatAddress(data.contract, 7, 8)}
          </a>
        ),
      },
    ];

    return (
      <div className="card">
        <div className="title">关于藏品</div>
        <ul>
          {aboutItems.map((t) => (
            <li key={t.key} className="mt-4 flex flex-row">
              <span className="subtitle basis-5/12">{t.name}</span>
              <span className="basis-7/12">{t.value}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }, [data]);

  const DESCRIPTION_CARD = useMemo(
    () => (
      <div className="card">
        <div className="title">描述</div>
        <div className="subtitle mt-4">{data.description}</div>
      </div>
    ),
    [data]
  );

  const ATTRIBUTES_CARD = useMemo(
    () => (
      <div className="grid grid-cols-2 gap-3">
        {data.attributes?.map((a) => (
          <div className="card small m-0">
            <div className="font-12">{a.trait_type}</div>
            <div className="font-14 color-[#1A191B] mt-1">{a.value}</div>
          </div>
        ))}
      </div>
    ),
    [data]
  );

  const ITEMS = [
    {
      key: "about",
      label: "关于藏品",
      children: (
        <>
          {NFT_CARD}
          {NAME_CARD}
          {ABOUT_CARD}
          {DESCRIPTION_CARD}
        </>
      ),
    },
    {
      key: "attributes",
      label: "藏品属性",
      children: (
        <>
          {NFT_CARD}
          {NAME_CARD}
          {ATTRIBUTES_CARD}
        </>
      ),
    },
  ];

  const handleTabsChange = useCallback((key: string) => {
    setKey(key);
  }, []);

  return (
    <>
      <Tab items={ITEMS} activeKey={key} onChange={handleTabsChange}></Tab>

      {/* <NFTViewerContainer>
        <NFTViewer url={data.url}></NFTViewer>
      </NFTViewerContainer> */}

      {/* <div className="card">
        <div className="title mb-2">{data.name}</div>
        <div>
          <span className="tag mr-2">#{data.id}</span>
          <span className="tag badge">树图标准数字藏品</span>
        </div>
      </div>
      <div className="card">
        <div className="title">关于藏品</div>
        <ul>
          {aboutItems.map((t) => (
            <li key={t.key} className="mt-4 flex flex-row">
              <span className="subtitle basis-5/12">{t.name}</span>
              <span className="basis-7/12">{t.value}</span>
            </li>
          ))}
        </ul>
      </div> */}

      {/* <div className="card">
        <div className="title">描述</div>
        <div className="subtitle mt-4">{data.description}</div>
      </div> */}

      {/* <div className="grid grid-cols-2 gap-3">
        {data.attributes?.map((a) => (
          <div className="card small m-0">
            <div className="font-12">{a.trait_type}</div>
            <div className="font-14 color-[#1A191B] mt-1">{a.value}</div>
          </div>
        ))}
      </div> */}

      {/* <br></br>
      <div>
        Link to <Link to={`/profile`}>Profile Page</Link>
      </div> */}
    </>
  );
};
