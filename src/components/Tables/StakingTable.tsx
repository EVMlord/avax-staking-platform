import React from "react";
import { ProgressBar } from "react-step-progress-bar";

import "react-step-progress-bar/styles.css";

const headings = [
  "Start",
  "End",
  "Progress",
  "Amount Staked",
  "Shares",
  "Dividends",
  "BonusDay rewads + Stake interest",
  "Paid Amount",
];

export default function StakingTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">action</div>
            </th>
            {headings.map((h) => (
              <TableHead key={h} title={h} />
            ))}
            <th scope="col" className="p-4">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
      </table>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr className="hover:bg-gray-100">
          <td className="p-4 w-4">
            <div className="flex items-center">act</div>
          </td>
          <TableCell data="2" name="start" />
          <TableCell data="32" name="end"/>
          <TableCell data={<ProgressBar percent={74} width={70} />} name="progress"/>
          <TableCell data="32" name="amount staked"/>
          <TableCell data="32" name="shares"/>
          <TableCell data="32" name="dividends"/>
          <TableCell data="32" name="bonus"/>
          <TableCell data="32" name="paid amount"/>
          <TableCell data="Edit" name="edit"/>
          
        </tr>
      </tbody>
    </div>
  );
}

const TableHead = ({ title }: { title: string }) => (
  <th
    scope="col"
    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
  >
    {title}
  </th>
);

const TableCell = ({ data }: { data: React.ReactNode; name: string }) => (
  <td className="py-4 px-6 text-sm font-medium tracking-wider text-gray-900 whitespace-nowrap">
    {data}
  </td>
);
