import React, { useCallback, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import Balance from "components/Balance";
import { useAppDispatch } from "state";
import { fetchFarmUserDataAsync } from "state/farms";
import { useLpTokenPrice } from "state/farms/hooks";
import { getBalanceAmount, getBalanceNumber } from "utils/formatBalance";
import useUnstakeFarms from "hooks/useUnStakeFarms";
import useStakeFarms from "hooks/useStakeFarms";
import useModal from "components/widgets/Modal/useModal";
import Button from "components/Button/Button";
import { FaMinus, FaPlus } from "react-icons/fa";
import { DepositModal } from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import useQuery, { addUserAndReferrer } from "utils/referralHelpers";
import { updateUsername } from "state/user/actions";
import useToast from "hooks/useToast";

interface FarmCardActionsProps {
  stakedBalance?: BigNumber;
  tokenBalance?: BigNumber;
  tokenName: string;
  pid: number;
  multiplier?: string;
  apr?: number;
  displayApr?: string;
  addLiquidityUrl?: string;
  cakePrice?: BigNumber;
  lpLabel: string;
}

const StakeAction = ({
  stakedBalance,
  tokenBalance,
  tokenName,
  pid,
  multiplier,
  apr,
  displayApr,
  addLiquidityUrl,
  cakePrice,
  lpLabel,
}: FarmCardActionsProps) => {
  const ref = useQuery().get("ref");
  const [referrer, setReferrer] = useState(ref || "");
  const { onStake } = useStakeFarms(pid);
  const { onUnstake } = useUnstakeFarms(pid);
  const dispatch = useAppDispatch();
  const { account } = useWeb3React();
  const { toastWarning, toastInfo } = useToast();
  const lpPrice = useLpTokenPrice(tokenName);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value.trim();
    if (value.length < 14) {
      setReferrer(value);
    }
  };

  const handleStake = async (amount: string) => {
    await onStake(amount);
    if (account && pid) {
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }));
      // submit details only once
      if (stakedBalance?.eq(0)) {
        // get ref link
        const refApiResponce = await addUserAndReferrer(account, referrer);
        if (refApiResponce.status) {
          // display ref link
          const refLink = refApiResponce.data.refUrl;
          dispatch(
            updateUsername({ username: refLink.slice(refLink.length - 13) })
          );
          toastInfo("Invite and earn", refApiResponce.message);
        } else {
          toastWarning("Info", refApiResponce.message);
        }
      }
    }
  };

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount);
    if (account && pid)
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }));
  };

  const displayBalance = useCallback(() => {
    const stakedBalanceBigNumber =
      stakedBalance && getBalanceAmount(stakedBalance);
    if (stakedBalanceBigNumber?.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
      return "<0.0000001";
    }
    if (stakedBalanceBigNumber?.gt(0)) {
      return stakedBalanceBigNumber.toFixed(8, BigNumber.ROUND_DOWN);
    }
    return stakedBalanceBigNumber?.toFixed(3, BigNumber.ROUND_DOWN);
  }, [stakedBalance]);

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance || new BigNumber(0)}
      stakedBalance={stakedBalance || new BigNumber(0)}
      onConfirm={handleStake}
      tokenName={tokenName}
      multiplier={multiplier}
      lpPrice={lpPrice}
      lpLabel={lpLabel}
      apr={apr || 0}
      displayApr={displayApr}
      addLiquidityUrl={addLiquidityUrl}
      cakePrice={cakePrice || new BigNumber(0)}
    />
  );
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance || new BigNumber(0)}
      onConfirm={handleUnstake}
      tokenName={tokenName}
    />
  );
  const disabledClass = stakedBalance?.eq(0) ? "text-gray-500 opacity-50" : "";

  const renderStakingButtons = () => {
    return stakedBalance?.eq(0) ? (
      <>
        <div>
          <div className="text-xs mb-2 font-bold text-gray-400">
            ENTER STAKING
          </div>
        </div>
        <Button className="w-full" onClick={onPresentDeposit}>
          Stake LP
        </Button>
        <div className="mt-2 w-full transition duration-300">
          <div className="text-xs mb-2 font-bold text-gray-400">
            Referrer ID
          </div>
          <input
            type="text"
            placeholder="KRL0xxxxxxx"
            className="px-1 py-1.5 block w-full bg-transparent placeholder-slate-300 ring-1 text-lg ring-gray-300 outline-none focus:ring-primary-500"
            value={referrer}
            onChange={handleInputChange}
          />
        </div>
      </>
    ) : (
      <div>
        <div className="text-xs my-2 font-bold text-gray-400">
          {lpLabel} Staked
        </div>
        <div className={`font-medium text-xl ${disabledClass}`}>
          {displayBalance()}
          <div className="inline-block mx-2">
            {stakedBalance?.gt(0) && lpPrice.gt(0) && (
              <Balance
                decimals={3}
                value={getBalanceNumber(lpPrice.times(stakedBalance))}
                unit=" USD"
                prefix="~"
              />
            )}
          </div>
        </div>
        <button onClick={onPresentWithdraw} className="mr-3">
          <FaMinus className="w-6 h-6" />
        </button>
        <button onClick={onPresentDeposit}>
          <FaPlus className="w-6 h-6" />
        </button>
      </div>
    );
  };

  return (
    <div className="justify-center items-center">
      <div className="flex flex-col items-start">{renderStakingButtons()}</div>
    </div>
  );
};

export default StakeAction;
