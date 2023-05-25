import fetch from "./fetch";

interface DetailType {
  id: string;
  url: string;
  name: string;
  description: string;
  series: string;
  owner: string;
  contract: string;
  attributes?: {
    value: string;
    trait_type: string;
  }[];
  amount?: number;
  tokenId?: string;
}

interface ProfileType {
  avatar?: string;
  address: string;
  name?: string;
}

type NFTSetType = Pick<DetailType, "name" | "contract" | "id">;

const getOwnedNFTSet = async (account: string): Promise<NFTSetType[]> => {
  return await fetch(`/nft/balances?owner=${account}&skip=0&limit=100`).then(
    (res) => res.list
  );
};

const getCertificates = async (
  account: string,
  set: string[],
  searchValue: string[]
): Promise<Partial<DetailType>[]> => {
  console.log("getCertificates args: ", account, set, searchValue);

  return [
    "4230780341",
    "4230780342",
    "4230780343",
    "4230780344",
    "4230780345",
    "4230780346",
  ].map((id) => ({
    id,
    url: "https://www.nftrainbow.cn/resources/images/game.png",
    name: "NFTRainbow 吉祥物",
    description: "龙马祥瑞，口吐成桥🌈，将 NFT 带给每一个人",
    series: "NFTRainbow 纪念 POAP",
    owner: "cfx:aasc52gtsvn18my8sxc344ewt8fcnz43vevfcy29av",
    contract: "cfx:aasc52gtsvn18my8sxc344ewt8fcnz43vevfcy29av",
    amount: 200,
  }));
};

interface GetNFTsType {
  list: Partial<{
    amount: string;
    contract: string;
    owner: string;
    tokenId: string;
    type: string;
  }>[];
  next: number;
  total: number;
}

const getNFTs = async (
  account: string,
  set: string[] = [],
  searchValue: string[] = [],
  skip: number = 0,
  limit: number = 10,
  withBrief: boolean = true
): Promise<GetNFTsType> => {
  console.log("getNFTs args: ", account, set, searchValue);

  if (set.length) {
    const sParams = new URLSearchParams(
      `?owner=${account}&skip=${skip}&limit=${limit}&withBrief=${withBrief}`
    );

    set.length &&
      set.forEach((s) => {
        sParams.append("contract", s);
      });

    return await fetch(`/nft/tokens?${sParams.toString()}`);
  } else {
    // if call /nft/tokens with no contract params, will throw error from backend
    return {
      list: [],
      next: 0,
      total: 0,
    };
  }
};

const getProfile = async (address: string): Promise<ProfileType> => {
  // TODO get cns name
  return await {
    address: address,
    name: "NFTRainbow.web3",
    avatar: "",
  };
};

// get NFT detail info
const getDetail = async (
  contract: string,
  tokenId: string
): Promise<DetailType> => {
  const detailReq = fetch(
    `/nft/preview?contract=${contract}&tokenId=${tokenId}`
  );
  const tokenInfoReq = fetch(`/token/tokeninfo?contract=${contract}`);

  const [detail, tokenInfo] = await Promise.all([detailReq, tokenInfoReq]);

  return {
    ...detail,
    id: tokenId,
    url: detail.image,
    series: tokenInfo.tokenName,
  };

  // // https://www.confluxscan.net/stat/nft/checker/detail?contractAddress=cfx%3Aachew68x34cwu04aezbunyaz67gppakvmyn79tau56&tokenId=401657
  // return await {
  //   code: 0,
  //   message: "",
  //   data: {
  //     imageMinHeight: 200,
  //     imageUri: "https://d1motvw702gmc2.cloudfront.net/image/f9eb1b956cb5.png",
  //     imageName: { en: "TJTW Story Ticket", zh: "TJTW Story Ticket" },
  //     imageDesc:
  //       "The jounery to the west story ticket. Can summon one story card in game.",
  //     detail: {
  //       funcCall: "uri(2)",
  //       tokenUri: {
  //         raw: "https://d1motvw702gmc2.cloudfront.net/public00/2.json",
  //         gateway: "",
  //       },
  //       metadata: {
  //         image: "https://d1motvw702gmc2.cloudfront.net/image/f9eb1b956cb5.png",
  //         name: "TJTW Story Ticket",
  //         description:
  //           "The jounery to the west story ticket. Can summon one story card in game.",
  //       },
  //     },
  //     externalMs: 1,
  //     creator: "cfx:aasc52gtsvn18my8sxc344ewt8fcnz43vevfcy29av",
  //     mintTime: "2021-10-26T08:39:10.000Z",
  //     type: "ERC1155",
  //     imageGateway: "",
  //   },
  // }.data;
};

export {
  getDetail,
  type DetailType,
  getProfile,
  type ProfileType,
  getNFTs,
  type GetNFTsType,
  getCertificates,
  getOwnedNFTSet,
  type NFTSetType,
};
