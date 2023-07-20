import BigNumber from "bignumber.js";
import Button from "components/Button/Button";
import { DepositModal } from "components/Modals/DepositeModal";
import useModal from "components/widgets/Modal/useModal";
import React, { useState } from "react";
import { ProgressBar } from "react-step-progress-bar";

import "react-step-progress-bar/styles.css"; 

const headings = [
  "Start",
  "End",
  "Progress",
  <>
    Amount <br /> Staked
  </>,
  "Shares",
  "Dividends",
  <>
    Bonus Day Rewads + <br /> Stake Interest
  </>,
  "Paid Amount",
  "Action",
];
/* 
interface StakePoolDeserialized {
  startDay: BigNumber;
  endDay: BigNumber;
  progress: number;
  stakedAmount: BigNumber;
  shares: BigNumber;
  dividends: BigNumber;
  bonus: BigNumber;
  paidAmount: BigNumber;
}
 */
interface StakePoolSerialized {
  startDay: SerializedBigNumber;
  endDay: SerializedBigNumber;
  progress: number;
  stakedAmount: SerializedBigNumber;
  shares: SerializedBigNumber;
  dividends: SerializedBigNumber;
  bonus: SerializedBigNumber;
  paidAmount: SerializedBigNumber;
}

const fakePool: StakePoolSerialized = {
  startDay: new BigNumber(3).toJSON(),
  endDay: new BigNumber(32).toJSON(),
  progress: 20,
  stakedAmount: new BigNumber(977).toJSON(),
  shares: new BigNumber(23).toJSON(),
  dividends: new BigNumber(78).toJSON(),
  bonus: new BigNumber(23).toJSON(),
  paidAmount: new BigNumber(45).toJSON(),
};

export default function StakingTable() {
  const [activePool, setActivePool] = useState<StakePoolSerialized | null>();
  const [staked, setStaked] = useState(false);

  const handleStake = (amount: string) => {
    // in serialized form
    setActivePool(fakePool);
    setStaked(true);
  };

  const [onPresentDeposit] = useModal(
    <DepositModal
      stakedBalance={new BigNumber(6897362899737990202883)}
      onConfirm={handleStake}
      tokenName="ASP"
    />
  );

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-100">
          <tr>
            {headings.map((h, i) => (
              <TableHead key={i} title={h} />
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 w-full">
          <tr className="hover:bg-gray-100 cursor-pointer">
            <TableCell data={activePool?.startDay} name="start" />
            <TableCell data={activePool?.endDay} name="end" />
            <TableCell
              data={<ProgressBar percent={activePool?.progress} width={70} />}
              name="progress"
            />
            <TableCell data={activePool?.stakedAmount} name="amount staked" />
            <TableCell data={activePool?.shares} name="shares" />
            <TableCell data={activePool?.dividends} name="dividends" />
            <TableCell data={activePool?.bonus} name="bonus" />
            <TableCell data={activePool?.paidAmount} name="paid amount" />
            <TableCell
              data={
                <Button disabled={!staked} variant="secondary" onClick={onPresentDeposit}>
                  Edit
                </Button>
              }
              name="action"
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const TableHead = ({ title }: { title: React.ReactNode }) => (
  <th
    scope="col"
    className="py-3 px-2 text-xs min-w-min whitespace-nowrap font-medium tracking-wider text-left text-gray-700 uppercase"
  >
    {title}
  </th>
);

const TableCell = ({ data }: { data: React.ReactNode; name: string }) => (
  <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
    {data ? data : "-"}
  </td>
);
