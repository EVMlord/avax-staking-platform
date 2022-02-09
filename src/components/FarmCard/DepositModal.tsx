import { BigNumber } from "bignumber.js";
import Button from "components/Button/Button";
import ModalActions from "components/widgets/Modal/ModalActions";
import ModalInput from "components/widgets/Modal/ModalInput";
import useToast from "hooks/useToast";
import React, { useCallback, useMemo, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { getInterestBreakdown } from "utils/compoundApyHealpers";
import { formatNumber, getFullDisplayBalance } from "utils/formatBalance";

interface DepositModalProps {
  max: BigNumber;
  stakedBalance: BigNumber;
  multiplier?: string;
  lpPrice: BigNumber;
  lpLabel?: string;
  onConfirm: (amount: string) => void;
  onDismiss?: () => void;
  tokenName?: string;
  apr: number;
  displayApr?: string;
  addLiquidityUrl?: string;
  cakePrice: BigNumber;
}

export const DepositModal = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = "",
  addLiquidityUrl,
  lpPrice,
  apr,
  cakePrice
}: DepositModalProps) => {
  const [val, setVal] = useState("");
  const { toastSuccess, toastError } = useToast();
  const [pendingTx, setPendingTx] = useState(false);
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, undefined, 4);
  }, [max]);

  const lpTokensToStake = new BigNumber(val);
  const fullBalanceNumber = new BigNumber(fullBalance);

  const usdToStake = lpTokensToStake.times(lpPrice);

  const interestBreakdown = getInterestBreakdown({
    principalInUSD: !lpTokensToStake.isNaN() ? usdToStake.toNumber() : 0,
    apr,
    earningTokenPrice: cakePrice.toNumber(),
    compoundFrequency: 1,
    performanceFee: 1
  });

  // 0 here refers to days 90 days see compoundApyHelpers
  const annualRoi = cakePrice.times(interestBreakdown[0]);
  const formattedAnnualRoi = formatNumber(
    annualRoi.toNumber(),
    annualRoi.gt(10000) ? 0 : 2,
    annualRoi.gt(10000) ? 0 : 2
  );

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, "."));
      }
    },
    [setVal]
  );

  const handleSelectMax = useCallback(() => {
    setVal(getFullDisplayBalance(max, undefined, 18));
  }, [max, setVal]);

  return (
    <div
      className="w-[90%] p-4 outline-none max-w-xs mx-auto absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-gray-900 rounded-xl ring ring-primary-50/40 font-sans transition duration-300"
      title="Stake LP tokens"
    >
      <div className="relative text-xl font-medium text-center mt-2 mb-4 p-4">
        <div className="text-left">Stake{" "}{tokenName}</div>
        <span
          onClick={onDismiss}
          className="absolute top-4 right-4 p-1 bg-primary-50/40 inline-block rounded-full hover:bg-primary-50/70 cursor-pointer"
        >
          <RiCloseLine className="h-8 w-8" />
        </span>
      </div>
      <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        addLiquidityUrl={addLiquidityUrl}
        inputTitle="Stake"
      />
      <div className="mt-6 flex items-center justify-between">
        <p className="mr-2 text-gray-400">Annual ROI at current rates: ${formattedAnnualRoi}</p>
      </div>
      <ModalActions>
        <Button
          className="w-full bg-red-600 text-white"
          variant="secondary"
          onClick={onDismiss}
          disabled={pendingTx}
        >
          Cancel
        </Button>
        <Button
          className="w-full"
          disabled={
            pendingTx ||
            !lpTokensToStake.isFinite() ||
            lpTokensToStake.eq(0) ||
            lpTokensToStake.gt(fullBalanceNumber)
          }
          onClick={async () => {
            setPendingTx(true);
            try {
              await onConfirm(val);
              toastSuccess(
                "Staked!",
                "Your funds have been staked in the farm"
              );
              onDismiss && onDismiss();
            } catch (e) {
              toastError(
                "Error",
                "Please try again. Confirm the transaction and make sure you are paying enough gas!"
              );
            } finally {
              setPendingTx(false);
            }
          }}
        >
          {pendingTx ? "Confirming" : "Confirm"}
        </Button>
      </ModalActions>
      <a
        rel="nofollow noreferrer"
        href={addLiquidityUrl}
        style={{ alignSelf: "center" }}
        className="text-xs font-medium text-blue-400 underline"
      >
        Get {tokenName}
      </a>
    </div>
  );
};
