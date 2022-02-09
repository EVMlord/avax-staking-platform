import { useCallback } from "react";
import { unstakeFarm } from "utils/calls";
import { useKrlContract } from "hooks/useContract";

const useUnstakeFarms = (pid: number) => {
  const masterChefContract = useKrlContract();

  const handleUnstake = useCallback(
    async (amount: string) => {
      await unstakeFarm(masterChefContract, pid, amount);
    },
    [masterChefContract, pid]
  );

  return { onUnstake: handleUnstake };
};

export default useUnstakeFarms;
