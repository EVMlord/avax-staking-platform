import React, { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import Button from "components/Button/Button";
import { useERC20 } from "hooks/useContract";
import useToast from "hooks/useToast";
import { useAppDispatch } from "state";
import { fetchFarmUserDataAsync } from "state/farms";
import { DeserializedFarm } from "state/types";
import { getAddress } from "utils/addressHelpers";
import useApproveFarm from "../../hooks/useApproveFarm";
import HarvestAction from "./HarvestAction";
import StakeAction from "./StakeAction";
import { getBscScanLink } from "utils/getBscScanLink";
import { FaExternalLinkAlt, FaSpinner } from "react-icons/fa";
import { useFarms } from "state/farms/hooks";
import useWallet from "hooks/useWallet";

export interface FarmWithStakedValue extends DeserializedFarm {
  apr?: number;
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue;
  account?: string;
  addLiquidityUrl: string;
  cakePrice?: BigNumber;
  lpLabel: string;
}

const CardActions = ({
  farm,
  account,
  addLiquidityUrl,
  cakePrice,
  lpLabel,
}: FarmCardActionsProps) => {
  const [requestedApproval, setRequestedApproval] = useState(false);
  const { toastError } = useToast();
  const { userDataLoaded } = useFarms();
  const [loading, setLoading] = useState(!userDataLoaded);
  const { pid, lpAddresses } = farm;
  const { allowance, tokenBalance, stakedBalance, earnings } =
    farm.userData || {};
  const lpAddress = getAddress(lpAddresses);
  const isApproved = account && allowance && allowance.isGreaterThan(0);
  const dispatch = useAppDispatch();
  const lpContract = useERC20(lpAddress);
  const { onApprove } = useApproveFarm(lpContract);
  const bsc = getBscScanLink(lpAddress, "address");
  // open connect wallet modal
  const { onPresentConnectModal } = useWallet();

  useEffect(() => {
    if (userDataLoaded) {
      setLoading(false);
    }
  }, [userDataLoaded]);

  const handleApprove = useCallback(async () => {
    if (!account) return;
    try {
      setRequestedApproval(true);
      await onApprove();
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }));
    } catch (e) {
      toastError(
        "Error",
        "Please try again. Confirm the transaction and make sure you are paying enough gas!"
      );
    } finally {
      setRequestedApproval(false);
    }
  }, [onApprove, dispatch, account, pid, toastError]);

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={farm.lpSymbol}
        pid={pid}
        apr={farm.apr}
        lpLabel={lpLabel}
        cakePrice={cakePrice}
        addLiquidityUrl={addLiquidityUrl}
      />
    ) : (
      <>
        {loading && (
          <div className="flex justify-center items-center absolute bg-dark/40 inset-0 backdrop-blur-sm z-10">
            <FaSpinner className="m-4 w-6 h-6 animate-spin" />
          </div>
        )}
        <div className="text-xs mb-2 font-bold text-gray-400">ENABLE FARM</div>
        <Button
          disabled={requestedApproval}
          onClick={handleApprove}
          className="block w-full mt-2"
          variant="outlined"
        >
          {requestedApproval ? "Enabling" : "Enable contract"}
        </Button>
      </>
    );
  };

  return (
    <div className="relative flex flex-col items-center md:flex-row justify-between md:items-stretch p-6">
      <div className="mt-4 order-3 md:order-none text-center md:text-left flex-shrink-0">
        <a
          rel="nofollow noreferrer noopener"
          target="_blank"
          href={addLiquidityUrl}
          style={{ alignSelf: "center" }}
          className="text-lg font-medium text-blue-400 underline"
        >
          Get {farm.lpSymbol}
          {<FaExternalLinkAlt className="inline-block m-1 h-5 w-5" />}
        </a>
        <br />
        <a
          rel="nofollow noreferrer noopener"
          target="_blank"
          href={bsc}
          style={{ alignSelf: "center" }}
          className="text-lg font-medium text-blue-400 underline"
        >
          View contract{" "}
          {<FaExternalLinkAlt className="inline-block m-1 h-5 w-5" />}
        </a>
      </div>
      <HarvestAction earnings={earnings} pid={pid} />
      <div className="flex justify-between items-center ring-1 ring-gray-800 p-5 rounded-lg w-full max-w-xs">
        <div className="w-full">
          {!account ? (
            <>
              <div className="text-xs mb-2 font-bold text-gray-400">
                START FARMING
              </div>
              <Button
                label="Connect"
                className="block w-full"
                onClick={onPresentConnectModal}
              >
                Connect wallet
              </Button>
            </>
          ) : (
            renderApprovalOrStakeButton()
          )}
        </div>
      </div>
    </div>
  );
};

export default CardActions;
