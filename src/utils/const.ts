const NETWORK_ID = 1;

const NETWORKS = {
  1: {
    rpc: "",
    confluxscan: "https://www.confluxscan.net",
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

export { NETWORK_ID, NETWORKS, NETWORK, FORMAT_ADDRESS_CONFIG };
