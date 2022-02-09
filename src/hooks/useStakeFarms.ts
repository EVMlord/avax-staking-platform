import { useCallback } from "react";
import { stakeFarm } from "utils/calls";
import { useKrlContract } from "hooks/useContract";

const useStakeFarms = (pid: number) => {
  const krlContract = useKrlContract();

  const handleStake = useCallback(
    async (amount: string) => {
      await stakeFarm(krlContract, pid, amount);
    },
    [krlContract, pid]
  );

  return { onStake: handleStake };
};

export default useStakeFarms;
