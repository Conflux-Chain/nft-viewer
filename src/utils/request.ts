interface GetDetailType {
  id: string;
  url: string;
  name: string;
  description: string;
  series: string;
  owner: string;
  contract: string;
  attributes: {
    value: string;
    trait_type: string;
  }[];
}

const getDetail = async (): Promise<GetDetailType> => {
  return await {
    id: "4230780345",
    url: "https://www.nftrainbow.cn/resources/images/game.png",
    name: "NFTRainbow 吉祥物",
    description: "龙马祥瑞，口吐成桥🌈，将 NFT 带给每一个人",
    series: "NFTRainbow 纪念 POAP",
    owner: "cfx:aasc52gtsvn18my8sxc344ewt8fcnz43vevfcy29av",
    contract: "cfx:aasc52gtsvn18my8sxc344ewt8fcnz43vevfcy29av",
    attributes: [
      {
        value: "雨后彩虹",
        trait_type: "背景",
      },
      {
        value: "独角兽",
        trait_type: "形象",
      },
      {
        value: "彩虹",
        trait_type: "元素-1",
      },
      {
        value: "白云",
        trait_type: "元素-2",
      },
      {
        value: "NFTRainbow",
        trait_type: "Logo",
      },
    ],
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

export { getDetail, type GetDetailType };
