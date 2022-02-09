import { RecognizedChainId } from "./types";

export enum ChainId {
  MAINNET = 56,
  TESTNET = 97,
}

export const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: "https://bscscan.com",
  [ChainId.TESTNET]: "https://testnet.bscscan.com",
};

export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.MAINNET];

export const addresses = {
  kryptolite: {
    97: '',
    56: '0x69A3C92cE7d543f6aaC7630E0e4Df265BdBB8c0D',
  },
  multiCall: {
    56: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
    97: '',
  },
};

export const RecognizedChainIdList: RecognizedChainId[] = [
  1, 2, 3, 4, 42, 56, 97,
];

export const networkList = {
  1: {
    url: "https://etherscan.io/",
    name: "Ethereum Mainnet",
  },
  2: {
    url: "https://mordenexplorer.ethernode.io/",
    name: "Morden",
  },
  3: {
    url: "https://ropsten.etherscan.io/",
    name: "Ropsten",
  },
  4: {
    url: "https://rinkeby.etherscan.io/",
    name: "Rinkeby",
  },
  42: {
    url: "https://kovan.etherscan.io/",
    name: "Kovan",
  },
  56: {
    url: "https://bsc-dataseed.binance.org/",
    name: "Binance Smart Chain",
  },
  97: {
    url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    name: "Binance Smart Chain - Testnet",
  },
};

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20
