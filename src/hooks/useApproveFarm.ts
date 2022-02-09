import { useCallback } from "react";
import { ethers, Contract } from "ethers";
import { useKrlContract } from "hooks/useContract";
import { useCallWithGasPrice } from "hooks/useCallWithGasPrice";

const useApproveFarm = (lpContract: Contract) => {
  const masterChefContract = useKrlContract();
  const { callWithGasPrice } = useCallWithGasPrice();
  const handleApprove = useCallback(async () => {
    // console.log(masterChefContract);
    // debugger;
    const tx = await callWithGasPrice(lpContract, "approve", [
      masterChefContract.address,
      ethers.constants.MaxUint256,
    ]);
    const receipt = await tx.wait();
    return receipt.status;
  }, [lpContract, masterChefContract, callWithGasPrice]);

  return { onApprove: handleApprove };
};

export default useApproveFarm;
