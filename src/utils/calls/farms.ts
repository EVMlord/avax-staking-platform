import BigNumber from "bignumber.js";
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from "config";
import { Contract } from "@ethersproject/contracts";
import getGasPrice from "utils/getGasPrice";

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
};

export const stakeFarm = async (
  krlContract: Contract,
  pid: number,
  amount: string
) => {
  const gasPrice = getGasPrice();
  const value = new BigNumber(amount)
    .times(DEFAULT_TOKEN_DECIMAL)
    .toFixed()
    .toString();

  if (pid === 0) {
    const tx = await krlContract.stake(value, { ...options, gasPrice });
    const receipt = await tx.wait();
    return receipt.status;
  }

  const tx = await krlContract.stake(value, { ...options, gasPrice });
  const receipt = await tx.wait();
  return receipt.status;
};

export const unstakeFarm = async (
  krlContract: Contract,
  pid: number,
  amount: string
) => {
  const gasPrice = getGasPrice();

  const value = new BigNumber(amount)
    .times(DEFAULT_TOKEN_DECIMAL)
    .toFixed()
    .toString();
  if (pid === 0) {
    const tx = await krlContract.leaveStaking(value, { ...options, gasPrice });
    const receipt = await tx.wait();
    return receipt.status;
  }

  const tx = await krlContract.withdraw(value, { ...options, gasPrice });
  const receipt = await tx.wait();
  return receipt.status;
};

export const harvestFarm = async (krlContract: Contract, pid: number) => {
  const gasPrice = getGasPrice();
  if (pid === 0) {
    const tx = await krlContract.leaveStaking("0", { ...options, gasPrice });
    const receipt = await tx.wait();
    return receipt.status;
  }

  const tx = await krlContract.getReward();
  const receipt = await tx.wait();
  return receipt.status;
};
