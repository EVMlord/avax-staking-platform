import { BigNumber } from "bignumber.js";
import Button from "components/Button/Button";
import ModalActions from "components/widgets/Modal/ModalActions";
import ModalInput from "components/widgets/Modal/ModalInput";
import useToast from "hooks/useToast";
import React, { useCallback, useMemo, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { getFullDisplayBalance } from "utils/formatBalance";

interface DepositModalProps {
  stakedBalance: BigNumber;
  tokenName: string;
  onConfirm: (amount: string) => void;
  onDismiss?: () => void;
}

export const DepositModal = ({
  stakedBalance,
  tokenName,
  onConfirm,
  onDismiss
}: DepositModalProps) => {
  const [val, setVal] = useState("");
  const { toastSuccess, toastError } = useToast();
  const [pendingTx, setPendingTx] = useState(false);

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(stakedBalance, undefined, 4);
  }, [stakedBalance]);

  const amountToStake = new BigNumber(val);
  const fullBalanceNumber = new BigNumber(fullBalance);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, "."));
      }
    },
    [setVal]
  );

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance]);

  return (
    <div
      className="w-[90%] p-4 outline-none max-w-xs mx-auto rounded-md absolute left-1/2 -translate-x-1/2
      top-1/2 -translate-y-1/2 bg-white font-sans transition duration-300 shadow-md"
      title="Stake LP tokens"
    >
      <div className="relative text-xl font-medium text-center mt-2 mb-4 p-4">
        <div className="text-left text-lg">Stake {tokenName}</div>
        <span
          onClick={onDismiss}
          className="absolute hover:bg-gray-100 top-4 right-4 p-1 inline-block rounded-full cursor-pointer"
        >
          <RiCloseLine className="h-8 w-8" />
        </span>
      </div>
      <ModalInput
        max={fullBalance}
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        symbol={tokenName}
        inputTitle="Stake"
        decimals={18}
      />
      <ModalActions>
        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white mx-0"
          variant="secondary"
          onClick={onDismiss}
          disabled={pendingTx}
        >
          Cancel
        </Button>
        <Button
          className="w-full mx-0"
          disabled={
            pendingTx ||
            !amountToStake.isFinite() ||
            amountToStake.eq(0) ||
            amountToStake.gt(fullBalanceNumber)
          }
          onClick={async () => {
            setPendingTx(true);
            try {
              await onConfirm(val);
              toastSuccess(
                "Staked!",
                "Your funds have been staked in the pool."
              );
              onDismiss && onDismiss();
            } catch (e) {
              console.error(e)
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
    </div>
  );
};
