import BigNumber from "bignumber.js";
import krlAbi from "config/abi/krlReward.json";
import erc20ABI from "config/abi/erc20.json";
import multicall from "utils/multicall";
import { getAddress, getKrlAddress } from "utils/addressHelpers";
import { SerializedFarmConfig } from "config/constants/types";
import { BIG_TEN } from "utils/bigNumber";

export const fetchFarmUserAllowances = async (
  account: string,
  farmsToFetch: SerializedFarmConfig[]
) => {
  const krlAddress = getKrlAddress();
  // const erc20Contract = getBep20Contract(krlAddress);

  // const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses);
    return {
      address: lpContractAddress,
      name: "allowance",
      params: [account, krlAddress],
    };
  });

  const rawLpAllowances = await multicall(erc20ABI, calls);
  const parsedLpAllowances = rawLpAllowances.map(
    (lpBalance: BigNumber.Value) => {
      return new BigNumber(lpBalance).toJSON();
    }
  );
  return parsedLpAllowances;
};

export const fetchFarmUserTokenBalances = async (
  account: string,
  farmsToFetch: SerializedFarmConfig[]
) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses);
    return {
      address: lpContractAddress,
      name: "balanceOf",
      params: [account],
    };
  });

  // mine

  const rawTokenBalances = await multicall(erc20ABI, calls);
  const parsedTokenBalances = rawTokenBalances.map(
    (tokenBalance: BigNumber.Value) => {
      return new BigNumber(tokenBalance).toJSON();
    }
  );
  return parsedTokenBalances;
};

export const fetchFarmUserStakedBalances = async (
  account: string,
  farmsToFetch: SerializedFarmConfig[]
) => {
  const krlAddress = getKrlAddress();

  const calls = farmsToFetch.map((farm) => {
    return {
      address: krlAddress,
      name: "balanceOf",
      params: [account],
    };
  });

  const rawStakedBalances = await multicall(krlAbi, calls);
  const parsedStakedBalances = rawStakedBalances.map(
    (stakedBalance: { _hex: BigNumber.Value }[]) => {
      return new BigNumber(stakedBalance[0]._hex).toJSON();
    }
  );
  return parsedStakedBalances;
};

export const fetchFarmUserEarnings = async (
  account: string,
  farmsToFetch: SerializedFarmConfig[]
) => {
  const krlAddress = getKrlAddress();

  const calls = farmsToFetch.map((farm) => {
    const rewardTokenAddress = farm.token.address;
    return {
      address: krlAddress,
      name: "earned",
      params: [account, rewardTokenAddress],
    };
  });

  const rawEarnings = await multicall(krlAbi, calls);
  const parsedEarnings = rawEarnings.map((earnings: BigNumber.Value) => {
    return new BigNumber(earnings).toJSON();
  });
  return parsedEarnings;
};

export const fetchFarmUserRewardPerToken = async (
  farmsToFetch: SerializedFarmConfig[]
) => {
  const krlAddress = getKrlAddress();

  const calls = farmsToFetch.map(farm => {
    const rewardTokenAddress = farm.token.address;
    return {
      address: krlAddress,
      name: "rewardPerToken",
      params: [rewardTokenAddress]
    }
  });

  const rewardPerTokens = await multicall(krlAbi, calls);
  const parsedRPT = rewardPerTokens.map((rpt: BigNumber.Value) => {
    return new BigNumber(rpt).div(BIG_TEN.pow(18)).toJSON();
  });
  return parsedRPT;
}
