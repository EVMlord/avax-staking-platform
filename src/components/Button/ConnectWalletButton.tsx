import React from "react";
import { useAppContext } from "hooks/useAppContext";
import Button, { ButtonProps } from "./Button";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { RiWallet3Line } from "react-icons/ri";
import truncateHash from "utils/truncateHash";
import useWallet from "hooks/useWallet";

const ConnectWalletButton = ({action}: ButtonProps & { action?: (...args: any[]) => void }) => {
  const {
    krlWallet: { active, error, retry },
  } = useAppContext();
  const { account } = useActiveWeb3React();
  const { onPresentConnectModal } = useWallet();

  const openModal = () => {
    if(action) action();
    onPresentConnectModal();
  };

  return (
    <>
      {active && account && (
        <button
          aria-label="Open connect modal"
          onClick={openModal}
          className="block w-full lg:inline-block text-sm bg-primary-700/10 py-1 px-2 lg:rounded-full
            cursor-pointer hover:bg-primary-700/20 transition-colors duration-300"
        >
          <RiWallet3Line className="h-9 w-9 inline-block text-primary-700 mx-2" />
          {truncateHash(account)}
        </button>
      )}
      {!active && !error && (
        <Button onClick={openModal} variant="outlined" className="py-2 px-4 w-full md:w-auto">
          Connect wallet
        </Button>
      )}
      {!active && error && (
        <Button
          variant="outlined"
          className="border-red-500 ring-red-600 hover:ring-red-400 focus:ring-red-400 text-red-600 !px-3 !py-1 text-sm hover:text-red-400 focus:text-red-400 focus-within:!text-red-400"
          onClick={() => {
            if(action) action();
            retry();
          }}
        >
          Retry
        </Button>
      )}
    </>
  );
};

export default ConnectWalletButton;
