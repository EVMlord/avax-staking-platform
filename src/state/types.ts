import {
  DeserializedFarmConfig,
  SerializedFarmConfig,
} from "config/constants/types";
import BigNumber from "bignumber.js";

// Block

export interface BlockState {
  currentBlock: number;
  initialBlock: number;
}

export type SerializedBigNumber = string;

export interface SerializedFarmsState {
  data: SerializedFarm[];
  userDataLoaded: boolean;
}
interface SerializedFarmUserData {
  allowance: string;
  tokenBalance: string;
  stakedBalance: string;
  earnings: string;
}

export interface DeserializedFarmUserData {
  allowance: BigNumber;
  tokenBalance: BigNumber;
  stakedBalance: BigNumber;
  earnings: BigNumber;
}

export interface DeserializedFarm extends DeserializedFarmConfig {
  tokenPriceBusd?: string;
  quoteTokenPriceBusd?: string;
  tokenAmountTotal?: BigNumber;
  lpTotalInQuoteToken?: BigNumber;
  lpTotalSupply?: BigNumber;
  tokenPriceVsQuote?: BigNumber;
  extras: {
    /** Balance of LP tokens in the krl smart contract */
    lpTokenBalanceMC: BigNumber;
    rewardPerToken: BigNumber;
    rewardForDuration: BigNumber;
    rewardsDuration: BigNumber;
  };
  userData?: DeserializedFarmUserData;
}

export interface SerializedFarm extends SerializedFarmConfig {
  tokenPriceBusd?: string;
  quoteTokenPriceBusd?: string;
  tokenAmountTotal?: SerializedBigNumber;
  lpTotalInQuoteToken?: SerializedBigNumber;
  lpTotalSupply?: SerializedBigNumber;
  tokenPriceVsQuote?: SerializedBigNumber;
  extras?: {
    lpTokenBalanceMC: SerializedBigNumber;
    rewardPerToken: SerializedBigNumber;
    rewardForDuration: SerializedBigNumber;
    rewardsDuration: SerializedBigNumber;
  };
  userData?: SerializedFarmUserData;
}

export interface DeserializedFarmsState {
  data: DeserializedFarm[]
  userDataLoaded: boolean
}

// Global state

export interface State {
  block: BlockState;
  farms: SerializedFarmsState;
}
