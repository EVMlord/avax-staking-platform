import React, { useMemo } from "react";
import BigNumber from "bignumber.js";
import { DeserializedFarm } from "state/types";
import getLiquidityUrlPathParts from "utils/getLiquidityUrlPathParts";
import { BASE_ADD_LIQUIDITY_URL } from "config";
import CardHeading from "./CardHeading";
import CardActionsContainer from "./CardActionsContainer";

export interface FarmWithStakedValue extends DeserializedFarm {
  apr?: number;
  lpRewardsApr?: number;
  liquidity?: BigNumber;
}

interface FarmCardProps {
  farm: FarmWithStakedValue;
  displayApr: string | null;
  removed: boolean;
  cakePrice?: BigNumber;
  account?: string;
}

export default function FarmCard({
  farm,
  cakePrice,
  account,
  displayApr,
}: FarmCardProps) {
  const totalValueFormatted =
    farm.liquidity && farm.liquidity.gt(0)
      ? `$${farm.liquidity
          .toNumber()
          .toLocaleString(undefined, { maximumFractionDigits: 3 })}`
      : "";

  const lpLabel =
    farm.lpSymbol && farm.lpSymbol.toUpperCase().replace("PANCAKE", "");

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  });
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`;

  const earnings = useMemo(
    () =>
      account
        ? farm.userData?.earnings || new BigNumber(0)
        : new BigNumber(0),

    [account, farm.userData?.earnings]
  );

  return (
    <div className="block font-sans bg-dark max-w-6xl mx-auto ring-1 ring-gray-800 rounded-t-3xl shadow-dark shadow-md">
      <CardHeading
        lpLabel={lpLabel}
        token={farm.token}
        quoteToken={farm.quoteToken}
        apr={displayApr}
        earnings={earnings}
        liquidity={totalValueFormatted}
      />
      <CardActionsContainer
        farm={farm}
        lpLabel={lpLabel}
        account={account}
        cakePrice={cakePrice}
        addLiquidityUrl={addLiquidityUrl}
      />
    </div>
  );
}
