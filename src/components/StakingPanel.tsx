import React, { useCallback, useMemo, useRef } from "react";
import {
  useFarms,
  usePollFarmsWithUserData,
  usePriceCakeBusd,
} from "state/farms/hooks";
import BigNumber from "bignumber.js";
import { DeserializedFarm } from "state/types";
import { getFarmAprV3 } from "utils/apr";
import { useWeb3React } from "@web3-react/core";
import { getFullDisplayBalance } from "utils/formatBalance";
import FarmCard, { FarmWithStakedValue } from "./FarmCard/FarmCard";
import { usePollReferralUserData } from "state/user/hooks";
import { useAppContext } from "hooks/useAppContext";

const getDisplayApr = (cakeRewardsApr?: number) => {
  if (cakeRewardsApr) {
    return `${cakeRewardsApr.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })}%`;
  }
  return null;
};

export default function StakingPanel() {
  const chosenFarmsLength = useRef(0);

  const { account } = useWeb3React();
  const {
    krlWallet: { balance },
  } = useAppContext();
  const { data: farmsLP } = useFarms();
  const cakePrice = usePriceCakeBusd();

  usePollFarmsWithUserData();
  usePollReferralUserData();

  const activeFarms = farmsLP.filter(
    (farm) => farm.pid !== 0 && farm.multiplier !== "0X"
  );

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedFarm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map(
        (farm) => {
          if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd) {
            return farm;
          }
          const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(
            farm.quoteTokenPriceBusd
          );
          const rfd = farm.extras.rewardForDuration;
          const rd = farm.extras.rewardsDuration;
          // const lpPriceBusd = totalLiquidity.div(farm.extras.lpTokenBalanceMC);

          const { cakeRewardsApr } = getFarmAprV3(
            cakePrice,
            totalLiquidity,
            rfd,
            rd
          );

          return {
            ...farm,
            apr: cakeRewardsApr,
            liquidity: totalLiquidity,
          };
        }
      );

      return farmsToDisplayWithAPR;
    },
    [cakePrice]
  );

  const chosenFarmsMemoized = useMemo(() => {
    return farmsList(activeFarms);
  }, [activeFarms, farmsList]);

  chosenFarmsLength.current = chosenFarmsMemoized.length;

  const krlBalance = useMemo(
    () =>
      getFullDisplayBalance(
        account
          ? farmsLP[0].userData?.tokenBalance || new BigNumber(0)
          : new BigNumber(0)
      , undefined, 3),
    [account, farmsLP]
  );

  return (
    <div>
      <div className="p-4 flex justify-between max-w-screen-2xl mx-auto items-center md:p-8 bg-dark-light bg-gradient-to-b from-dark-light to-dark-medium shadow-lg">
        <div className="text-2xl font-bold inline-block md:mx-4 bg-dark-light font-sans py-2">
          {krlBalance}{" "}
          <span className="text-lg font-black font-comfortaa text-primary">
            KRL-BUSD LP
          </span>
        </div>
        <div className="text-2xl font-bold inline-block mx-4 px-4 font-sans py-1 rounded-full">
          {balance}{" "}
          <span className="text-lg font-black font-comfortaa text-primary">
            BNB
          </span>
        </div>
      </div>
      <div className="py-8">
        {chosenFarmsMemoized.map((farm) => (
          <FarmCard
            key={farm.pid}
            farm={farm}
            displayApr={getDisplayApr(farm.apr)}
            cakePrice={cakePrice}
            account={account as any}
            removed={false}
          />
        ))}
      </div>
    </div>
  );
}
