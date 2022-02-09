import React from "react";
import { Token } from "config/entities/token";
import TokenPairImage from "components/TokenImage";
import BigNumber from "bignumber.js";
import { getFullDisplayBalance } from "utils/formatBalance";

export interface ExpandableSectionProps {
  lpLabel?: string;
  multiplier?: string;
  //   isCommunityFarm?: boolean;
  token: Token;
  quoteToken: Token;
  earnings: BigNumber;
  apr: string | null;
  liquidity: string;
}

interface LabelProps {
    title: string;
    value: React.ReactNode;
    disabled?: boolean;
}

const Label = ({title, value, disabled = false}: LabelProps) => (
  <div className="inline-block text-sm">
    {title}
    <div className={`text-lg font-bold ${disabled ? "text-gray-500" : ""}`}>{value}</div>
  </div>
);

export default function CardHeading({
  lpLabel,
  token,
  quoteToken,
  earnings,
  apr,
  liquidity
}: ExpandableSectionProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center p-4 bg-dark-light rounded-t-3xl">
      <div className="flex items-center mb-4 md:mb-0">
        <TokenPairImage primaryToken={token} secondaryToken={quoteToken} />
        <div className="inline text-xl font-bold">
          {lpLabel?.split(" ")[0]}
        </div>
      </div>
      <div className="flex-1 w-full flex justify-between md:justify-evenly items-center">
        <Label title="Earned" disabled={earnings.isLessThanOrEqualTo(0)} value={getFullDisplayBalance(earnings,undefined,3)} />
        <Label title="APR" value={apr || "-"} />
        <Label title="Liquidity" value={liquidity || "-"} />
      </div>
    </div>
  );
}
