import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import Balance from "components/Balance";
import Button from "components/Button/Button";
import useToast from "hooks/useToast";
import { useAppDispatch } from "state";
import { fetchFarmUserDataAsync } from "state/farms";
import { usePriceCakeBusd } from "state/farms/hooks";
import { BIG_ZERO } from "utils/bigNumber";
import { getBalanceAmount } from "utils/formatBalance";
import useHarvestFarm from "../../hooks/useHarvestFarm";

interface FarmCardActionsProps {
  earnings?: BigNumber;
  pid: number;
}

const HarvestAction = ({ earnings, pid }: FarmCardActionsProps) => {
  const { account } = useWeb3React();
  const { toastSuccess, toastError } = useToast();
  const [pendingTx, setPendingTx] = useState(false);
  const { onReward } = useHarvestFarm(pid);
  const cakePrice = usePriceCakeBusd();
  const dispatch = useAppDispatch();
  const rawEarningsBalance =
    account && earnings ? getBalanceAmount(earnings) : BIG_ZERO;
  const earningsBusd =
    rawEarningsBalance && cakePrice
      ? rawEarningsBalance.multipliedBy(cakePrice).toNumber()
      : 0;

  const disabledClass = rawEarningsBalance.eq(0)
    ? "text-gray-500 opacity-50"
    : "";

  return (
    <div className="flex justify-between mb-5 md:mb-0 items-center ring-1 ring-gray-800 p-5 rounded-lg w-full max-w-xs">
      <div>
        <div className="text-xs mb-2 font-bold text-gray-400">KRL EARNED</div>
        <div className={`font-medium text-lg ${disabledClass}`}>
          {rawEarningsBalance.eq(0) ? rawEarningsBalance.toFixed(3) : rawEarningsBalance.toFixed(8)}
          {earningsBusd > 0 && (
            <Balance decimals={3} value={earningsBusd} unit=" USD" prefix="~" />
          )}
        </div>
      </div>
      <Button
        disabled={rawEarningsBalance.eq(0) || pendingTx}
        onClick={async () => {
          setPendingTx(true);
          try {
            await onReward();
            toastSuccess(
              "Harvested",
              "Your CAKE earnings have been sent to your wallet!"
            );
          } catch (e) {
            console.log(e);
            toastError(
              "Error",
              "Please try again. Confirm the transaction and make sure you are paying enough gas!"
            );
          } finally {
            setPendingTx(false);
          }
          account && dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }));
        }}
        variant="secondary"
      >
        {pendingTx ? "Harvesting" : "Harvest"}
      </Button>
    </div>
  );
};

export default HarvestAction;
