import { Token } from "config/entities/token";
import JSBI from "jsbi";

export interface Address {
  97?: string;
  56: string;
}

// exports for external consumption
export type BigintIsh = JSBI | bigint | string;

export enum Rounding {
  ROUND_DOWN = 0,
  ROUND_HALF_UP = 1,
  ROUND_UP = 2,
}

export type RecognizedChainId = 1 | 2 | 3 | 4 | 42 | 56 | 97;

export interface SerializedFarmConfig extends FarmConfigBaseProps {
  token: SerializedToken;
  quoteToken: SerializedToken;
}

export interface SerializedToken {
  chainId: number;
  address: string;
  decimals: number;
  symbol?: string;
  name?: string;
  projectLink?: string;
}

interface FarmConfigBaseProps {
  pid: number;
  lpSymbol: string;
  lpAddresses: Address;
  multiplier?: string;
  dual?: {
    rewardPerBlock: number;
    earnLabel: string;
    endBlock: number;
  };
}

export interface DeserializedFarmConfig extends FarmConfigBaseProps {
  token: Token;
  quoteToken: Token;
}

export enum SolidityType {
  uint8 = "uint8",
  uint256 = "uint256",
}

export const FACTORY_ADDRESS = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";

export const INIT_CODE_HASH =
  "0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5";

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000);

// exports for internal consumption
export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);
export const TWO = JSBI.BigInt(2);
export const THREE = JSBI.BigInt(3);
export const FIVE = JSBI.BigInt(5);
export const TEN = JSBI.BigInt(10);
export const _100 = JSBI.BigInt(100);
export const FEES_NUMERATOR = JSBI.BigInt(9975);
export const FEES_DENOMINATOR = JSBI.BigInt(10000);

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt("0xff"),
  [SolidityType.uint256]: JSBI.BigInt(
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  ),
};
