import { BIG_TEN } from "utils/bigNumber"

export const BASE_URL = 'https://pancakeswap.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`


export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 200000

// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 20 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 9 CAKE per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in src/views/Home/components/CakeDataRow.tsx = 15 (40 - Amount sent to burn pool)

export const CAKE_PER_BLOCK = 40

export const BSC_BLOCK_TIME = 3

export const BLOCKS_PER_YEAR = (60 / BSC_BLOCK_TIME) * 60 * 24 * 365 // 10512000

export const CAKE_PER_YEAR = CAKE_PER_BLOCK * BLOCKS_PER_YEAR