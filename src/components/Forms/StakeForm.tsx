import React, { useState } from "react";
import Button from "components/Button/Button";

export default function StakeForm({ className }: { className?: string }) {
  const [stakeAmount, setStakeAmount] = useState("");
  const [daysToStake, setDaysToStake] = useState("");

  const handleChange: React.FormEventHandler<HTMLInputElement> = async (e) => {
    const input = e.currentTarget.name;
    const val = e.currentTarget.value;
    if (/[^\d+]/g.test(val)) return;
    if (input === "amount") {
      setStakeAmount(val);
    } else if (input === "days") {
      setDaysToStake(val);
    }
  };
  const handleStake: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  return (
    <div className={`border-b py-5 max-w-sm ${className}`}>
      <div className="flex justify-between items-end">
        Stake
        <span className="text-sm">
          302{" "}
          <span className="text-primary-700 font-semibold text-xl">ASP</span>
        </span>
      </div>
      <form onSubmit={handleStake} autoComplete="off">
        <div className="relative border p-3 rounded-md block my-2">
          <label htmlFor="amount" className="text-sm mb-2">
            Amount to Stake
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="amount"
            id="amount"
            value={stakeAmount}
            className="border-b transition-colors duration-300 border-gray-300 focus:border-primary pt-5 w-full outline-none"
          />
        </div>
        <div className="relative border p-3 rounded-md block my-2">
          <label htmlFor="amount" className="text-sm mb-2">
            Days to Stake
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="days"
            id="days"
            value={daysToStake}
            className="border-b transition-colors duration-300 border-gray-300 focus:border-primary pt-5 w-full outline-none"
          />
        </div>
        <Button
          type="submit"
          variant="secondary"
          className="py-2 px-5 w-full block my-4"
        >
          Stake
        </Button>
      </form>
      <div className="text-center text-sm flex justify-center mt-8">
        <div className="inline-block mx-2">
          Start day <br />
          12
        </div>
        <div className="inline-block mx-2">
          Last full day <br />
          12
        </div>
        <div className="inline-block mx-2">
          End day <br />
          12
        </div>
      </div>
    </div>
  );
}
