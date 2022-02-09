import React from "react";
import { ProgressBar } from "react-step-progress-bar";

import "react-step-progress-bar/styles.css";

const headings = [
  "Start",
  "End",
  "Progress",
  <>Amount <br /> Staked</>,
  "Shares",
  "Dividends",
  <>Bonus Day Rewads + <br /> Stake Interest</>,
  "Paid Amount",
];

export default function StakingTable() {
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
            <TableCell data="2" name="start" />
            <TableCell data="32" name="end" />
            <TableCell
              data={<ProgressBar percent={74} width={70} />}
              name="progress"
            />
            <TableCell data="32" name="amount staked" />
            <TableCell data="32" name="shares" />
            <TableCell data="32" name="dividends" />
            <TableCell data="32" name="bonus" />
            <TableCell data="32" name="paid amount" />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const TableHead = ({ title }: { title: React.ReactNode; }) => (
  <th
    scope="col"
    className="py-3 px-6 text-xs min-w-min whitespace-nowrap font-medium tracking-wider text-left text-gray-700 uppercase"
  >
    {title}
  </th>
);

const TableCell = ({ data }: { data: React.ReactNode; name: string }) => (
  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
    {data}
  </td>
);
