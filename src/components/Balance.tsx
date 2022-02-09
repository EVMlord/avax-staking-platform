import React, { useEffect, useRef } from "react";
import CountUp from "react-countup";

interface BalanceProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  decimals?: number;
  unit?: string;
  isDisabled?: boolean;
  prefix?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Balance = ({
  value,
  decimals = 3,
  isDisabled = false,
  unit,
  prefix,
  onClick,
  ...props
}: BalanceProps) => {
  const previousValue = useRef(0);

  useEffect(() => {
    previousValue.current = value;
  }, [value]);

  const disabledClass = isDisabled ? "text-gray-500 opacity-50" : "";

  return (
    <div className={`text-blue-500 text-base my-1 ${disabledClass}`} onClick={onClick} {...props}>
      <CountUp
        start={previousValue.current}
        end={value}
        prefix={prefix}
        suffix={unit}
        decimals={decimals}
        duration={1}
        separator=","
      />
    </div>
  );
};

export default Balance;
