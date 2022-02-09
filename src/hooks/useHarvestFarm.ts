import { useCallback } from "react";
import { harvestFarm } from "utils/calls";
import { useKrlContract } from "hooks/useContract";

const useHarvestFarm = (farmPid: number) => {
  const krlContract = useKrlContract();

  const handleHarvest = useCallback(async () => {
    await harvestFarm(krlContract, farmPid);
  }, [farmPid, krlContract]);

  return { onReward: handleHarvest };
};

export default useHarvestFarm;
