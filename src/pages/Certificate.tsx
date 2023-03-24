import NFTViewer from "@cubed/nftviewer";
import { useEffect, useMemo, useState, memo } from "react";
import { getDetail, type DetailType } from "../utils/request";
import NFTViewerContainer from "../components/NFTViewerContainer";
import { formatAddress } from "../utils";
import { NETWORK } from "../utils/const";
import { useParams } from "react-router-dom";

export default memo((): JSX.Element => {
  const { contract, tokenId } = useParams();
  const [data, setData] = useState({} as DetailType);

  useEffect(() => {
    async function main() {
      if (contract && tokenId !== undefined) {
        const data: DetailType = await getDetail(contract, tokenId);
        setData(data);
      }
    }

    main().catch(console.log);
  }, []);

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
        key: "owner",
        name: "凭证归属",
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
        name: "合约地址",
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
        <div className="title">关于凭证</div>
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

  return (
    <>
      {NFT_CARD}
      {NAME_CARD}
      {ABOUT_CARD}
      {DESCRIPTION_CARD}
    </>
  );
});
