const NETWORK_ID = 1029;

const NETWORKS = {
  1: {
    rpc: "",
    confluxscan: "https://testnet.confluxscan.net",
    api: "https://api-testnet-stage.confluxscan.net", // TODO should be replace with https://api-testnet.confluxscan.net
  },
  1029: {
    rpc: "",
    confluxscan: "https://www.confluxscan.net",
    api: "https://api-stage.confluxscan.net",
  },
};

const NETWORK = NETWORKS[NETWORK_ID];

const FORMAT_ADDRESS_CONFIG = {
  1: {
    front: 7,
    end: 8,
  },
  1029: {
    front: 6,
    end: 4,
  },
}[NETWORK_ID];

const PROFILE_ITEMS = ["nfts", "certificates"];

export { NETWORK_ID, NETWORKS, NETWORK, FORMAT_ADDRESS_CONFIG, PROFILE_ITEMS };
