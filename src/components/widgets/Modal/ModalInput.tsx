import React from "react";
import { parseUnits } from "ethers/lib/utils";
import { formatBigNumber } from "utils/formatBalance";
import Button from "components/Button/Button";

interface ModalInputProps {
  max: string;
  symbol: string;
  onSelectMax?: () => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
  addLiquidityUrl?: string;
  inputTitle?: string;
  decimals?: number;
}

const ModalInput = ({
  onChange,
  onSelectMax,
  value,
  inputTitle,
  max,
  decimals = 18,
}: ModalInputProps) => {
  const maxNum = Number.parseFloat(max);
  const isBalanceZero = !isNaN(maxNum) && maxNum === 0;

  const displayBalance = (balance: string) => {
    if (isBalanceZero) {
      return "0";
    }

    const balanceUnits = parseUnits(balance, decimals);
    return formatBigNumber(balanceUnits, decimals, decimals);
  };

  return (
    <div className="relative">
      <div
        className={`flex flex-col rounded-lg shadow-sm py-2 w-full text-sm ${
          isBalanceZero ? "text-red-600" : ""
        }`}
      >
        <div className="flex justify-between mb-1">
          <p>{inputTitle}</p>
          <p>Balance: {displayBalance(max)}</p>
        </div>
        <div className="flex items-center justify-between">
          <input
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode="decimal"
            step="any"
            min="0"
            onChange={onChange}
            placeholder="0"
            value={value}
            className="p-1 text-base text-gray-900 outline-none ring ring-transparent rounded"
          />
          <Button onClick={onSelectMax} variant="outlined" className="!p-2 ring-transparent rounded-full bg-gray-100 text-gray-600">
            Max
          </Button>
        </div>
      </div>
      {isBalanceZero && (
        <p className="text-xs text-red-400">
          There are no tokens to stake.
        </p>
      )}
    </div>
  );
};

export default ModalInput;
