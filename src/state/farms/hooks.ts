import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import BigNumber from "bignumber.js";
import { BIG_ZERO } from "utils/bigNumber";
import { getBalanceAmount } from "utils/formatBalance";
import { deserializeToken } from "state/user/hooks/helpers";
import {
  State,
  SerializedFarm,
  DeserializedFarmUserData,
  DeserializedFarm,
  DeserializedFarmsState,
} from "../types";
import { useAppDispatch } from "state";
import useRefresh from "hooks/useRefresh";
import { useWeb3React } from "@web3-react/core";
import farms from "config/constants/farms";
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync } from ".";

const deserializeFarmUserData = (
  farm: SerializedFarm
): DeserializedFarmUserData => {
  return {
    allowance: farm.userData
      ? new BigNumber(farm.userData.allowance)
      : BIG_ZERO,
    tokenBalance: farm.userData
      ? new BigNumber(farm.userData.tokenBalance)
      : BIG_ZERO,
    stakedBalance: farm.userData
      ? new BigNumber(farm.userData.stakedBalance)
      : BIG_ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
  };
};

const deserializeFarm = (farm: SerializedFarm): DeserializedFarm => {
  const {
    lpAddresses,
    lpSymbol,
    pid,
    dual,
    multiplier,
    quoteTokenPriceBusd,
    tokenPriceBusd,
  } = farm;

  return {
    lpAddresses,
    lpSymbol,
    pid,
    dual,
    multiplier,
    quoteTokenPriceBusd,
    tokenPriceBusd,
    token: deserializeToken(farm.token),
    quoteToken: deserializeToken(farm.quoteToken),
    userData: deserializeFarmUserData(farm),
    tokenAmountTotal: farm.tokenAmountTotal
      ? new BigNumber(farm.tokenAmountTotal)
      : BIG_ZERO,
    lpTotalInQuoteToken: farm.lpTotalInQuoteToken
      ? new BigNumber(farm.lpTotalInQuoteToken)
      : BIG_ZERO,
    lpTotalSupply: farm.lpTotalSupply
      ? new BigNumber(farm.lpTotalSupply)
      : BIG_ZERO,
    tokenPriceVsQuote: farm.tokenPriceVsQuote
      ? new BigNumber(farm.tokenPriceVsQuote)
      : BIG_ZERO,
    extras: {
      lpTokenBalanceMC: farm.extras
        ? new BigNumber(farm.extras.lpTokenBalanceMC)
        : BIG_ZERO,
      rewardPerToken: farm.extras
        ? new BigNumber(farm.extras.rewardPerToken)
        : BIG_ZERO,
      rewardsDuration: farm.extras
        ? new BigNumber(farm.extras.rewardsDuration)
        : BIG_ZERO,
      rewardForDuration: farm.extras
        ? new BigNumber(farm.extras.rewardForDuration)
        : BIG_ZERO,
    }
  };
};

export const useFarms = (): DeserializedFarmsState => {
  const farms = useSelector((state: State) => state.farms);
  const deserializedFarmsData = farms.data.map(deserializeFarm);
  const { userDataLoaded } = farms;
  return {
    userDataLoaded,
    data: deserializedFarmsData,
  };
};

export const useFarmFromPid = (pid: number): DeserializedFarm => {
  const farm = useSelector((state: State) =>
    state.farms.data.find((f) => f.pid === pid)
  );
  return deserializeFarm(farm!);
};

export const useFarmFromLpSymbol = (lpSymbol: string): DeserializedFarm => {
  const farm = useSelector((state: State) =>
    state.farms.data.find((f) => f.lpSymbol === lpSymbol)
  );
  return deserializeFarm(farm!);
};

export const useFarmUser = (pid: number): DeserializedFarmUserData => {
  const { userData } = useFarmFromPid(pid);
  const { allowance, tokenBalance, stakedBalance, earnings } = userData!;
  return {
    allowance,
    tokenBalance,
    stakedBalance,
    earnings,
  };
};

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPid = (pid: number): BigNumber => {
  const farm = useFarmFromPid(pid);
  return farm && new BigNumber(farm.tokenPriceBusd!);
};

export const useLpTokenPrice = (symbol: string) => {
  const farm = useFarmFromLpSymbol(symbol);
  const farmTokenPriceInUsd = useBusdPriceFromPid(farm.pid);
  let lpTokenPrice = BIG_ZERO;

  if (farm.lpTotalSupply?.gt(0) && farm.lpTotalInQuoteToken?.gt(0)) {
    // Total value of base token in LP
    const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(
      farm.tokenAmountTotal!
    );
    // Double it to get overall value in LP
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2);
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokens = getBalanceAmount(farm.lpTotalSupply);
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens);
  }

  return lpTokenPrice;
};

// /!\ Deprecated , use the BUSD hook in /hooks

export const usePriceCakeBusd = (): BigNumber => {
  const cakeBusdFarm = useFarmFromPid(1);

  const cakePriceBusdAsString = cakeBusdFarm.tokenPriceBusd;

  const cakePriceBusd = useMemo(() => {
    return new BigNumber(cakePriceBusdAsString || "0");
  }, [cakePriceBusdAsString]);

  return cakePriceBusd;
};

export const usePollFarmsWithUserData = (includeArchive = false) => {
  const dispatch = useAppDispatch();
  const { slowRefresh } = useRefresh();
  const { account } = useWeb3React();

  useEffect(() => {
    const farmsToFetch = farms;
    const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid);

    dispatch(fetchFarmsPublicDataAsync(pids));
    
    if (account) {
      dispatch(fetchFarmUserDataAsync({ account, pids }));
    }
  }, [includeArchive, dispatch, slowRefresh, account]);
};
