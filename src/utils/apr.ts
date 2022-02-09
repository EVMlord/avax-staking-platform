import BigNumber from "bignumber.js";
import { CAKE_PER_YEAR } from "config";
import lpAprs from "config/constants/lpAprs";
import { BIG_ONE, BIG_TEN } from "./bigNumber";

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param cakePriceUsd Cake price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @param farmAddress Farm Address
 * @returns Farm Apr
 */
export const getFarmApr = (
  poolWeight: BigNumber,
  cakePriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
  farmAddress: keyof typeof lpAprs
): { cakeRewardsApr: number; lpRewardsApr: number } => {
  const yearlyCakeRewardAllocation = poolWeight
    ? poolWeight.times(CAKE_PER_YEAR)
    : new BigNumber(NaN);
  const cakeRewardsApr = yearlyCakeRewardAllocation
    .times(cakePriceUsd)
    .div(poolLiquidityUsd)
    .times(100);
  let cakeRewardsAprAsNumber = 0;
  if (!cakeRewardsApr.isNaN() && cakeRewardsApr.isFinite()) {
    cakeRewardsAprAsNumber = cakeRewardsApr.toNumber();
  }
  const lpRewardsApr = lpAprs[farmAddress] ?? 0;
  return { cakeRewardsApr: cakeRewardsAprAsNumber, lpRewardsApr };
};

// rewarsd per token from sm... #done
// usd value of every lp #cakeprice done
// and krl per lp

/**
 * Get farm APR value in %
 * @param rewardPerToken The reward per lp token stored
 * @param tokenPriceBusd USD value of token
 * @param lpPriceUsd Cake price in USD
 */
export const getFarmAprV2 = (
  rewardPerToken: BigNumber,
  tokenPriceBusd: BigNumber,
  lpPriceUsd: BigNumber,
): { cakeRewardsApr: number; } => {

  const fees = BIG_ONE; // A constant to cover the transaction fees
  const duration = new BigNumber(90); // number of days
  const daysInAYear = new BigNumber(365); // number of days in a year

  const lhs = fees.plus(rewardPerToken.times(tokenPriceBusd)).div(lpPriceUsd);
  const rhs = daysInAYear.div(duration).times(BIG_TEN.pow(2)); // BIG_TEN.pow(2) = 10^2 = 100.

  let cakeRewardsAprAsNumber = 0;
  const cakeRewardsApr = lhs.times(rhs);

  if (cakeRewardsApr.isFinite()) {
    cakeRewardsAprAsNumber = cakeRewardsApr.toNumber();
  }
  return {cakeRewardsApr: cakeRewardsAprAsNumber};
};

/**
 * Get farm APR value in %
 * @param rewardPerToken The reward per lp token stored
 * @param tokenPriceBusd USD value of token
 * @param lpPriceUsd Cake price in USD
 * @param totalLiquidity
 */
 export const getFarmAprV3 = (
  tokenPriceBusd: BigNumber,
  totalLiquidity: BigNumber,
  rewardsForDuration: BigNumber, // formatted
  rewardsDuration: BigNumber
): { cakeRewardsApr: number; } => {

  const TVL = totalLiquidity;
  // Annual reward in quantity of $krl
  const AR = rewardsForDuration.div(rewardsDuration).times(31536000);
  // Value of annual rewards in usd
  const VAR = AR.times(tokenPriceBusd);

  let cakeRewardsAprAsNumber = 0;
  const cakeRewardsApr = VAR.div(TVL).times(100);

  if (cakeRewardsApr.isFinite()) {
    cakeRewardsAprAsNumber = cakeRewardsApr.toNumber();
  }
  return {cakeRewardsApr: cakeRewardsAprAsNumber};
};
